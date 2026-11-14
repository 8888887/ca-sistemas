import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { BLOG_CATEGORIES } from '../../data/blog.data';
import { BlogArticle } from '../../models/blog-article.model';

@Component({
  selector: 'app-blog-article-card',
  imports: [TranslatePipe],
  templateUrl: './blog-article-card.component.html',
  styleUrl: './blog-article-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.featured]': 'featured()' },
})
export class BlogArticleCardComponent {
  readonly article = input.required<BlogArticle>();
  readonly featured = input(false);
  readonly readArticle = output<BlogArticle>();
  protected readonly categoryLabel = computed(() => BLOG_CATEGORIES.find(category => category.id === this.article().category)!.label);
}
