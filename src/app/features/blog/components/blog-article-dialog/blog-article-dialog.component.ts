import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, computed, input, output, viewChild } from '@angular/core';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { BLOG_CATEGORIES } from '../../data/blog.data';
import { BlogArticle } from '../../models/blog-article.model';

@Component({
  selector: 'app-blog-article-dialog',
  imports: [TranslatePipe],
  templateUrl: './blog-article-dialog.component.html',
  styleUrl: './blog-article-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogArticleDialogComponent {
  readonly article = input.required<BlogArticle>();
  readonly closed = output<void>();
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('articleDialog');
  protected readonly categoryLabel = computed(() => BLOG_CATEGORIES.find(category => category.id === this.article().category)!.label);

  constructor() {
    afterNextRender(() => this.dialog().nativeElement.showModal());
  }
}
