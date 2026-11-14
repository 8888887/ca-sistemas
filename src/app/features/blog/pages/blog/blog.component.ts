import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../../shared/i18n/language.service';
import { BlogArticleCardComponent } from '../../components/blog-article-card/blog-article-card.component';
import { BlogArticleDialogComponent } from '../../components/blog-article-dialog/blog-article-dialog.component';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '../../data/blog.data';
import { BlogArticle, BlogCategoryId } from '../../models/blog-article.model';

@Component({
  selector: 'app-blog',
  imports: [RevealDirective, TranslatePipe, RouterLink, BlogArticleCardComponent, BlogArticleDialogComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  protected readonly categories = BLOG_CATEGORIES;
  protected readonly selectedCategory = signal<BlogCategoryId | 'all'>('all');
  protected readonly query = signal('');
  protected readonly activeArticle = signal<BlogArticle | null>(null);
  protected readonly isFiltered = computed(() => this.selectedCategory() !== 'all' || !!this.query().trim());
  private readonly language = inject(LanguageService);
  protected readonly articles = computed(() => {
    const query = this.normalize(this.query().trim());
    const category = this.selectedCategory();
    return BLOG_ARTICLES.filter(article => {
      if (category !== 'all' && article.category !== category) return false;
      if (!query) return true;
      const label = BLOG_CATEGORIES.find(item => item.id === article.category)!.label;
      const text = [article.title, article.excerpt, article.body, label];
      // Searching also survives a language change without discarding the visitor's input.
      return this.normalize([...text, ...text.map(value => this.language.translate(value))].join(' ')).includes(query);
    });
  });

  protected updateQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  }
}
