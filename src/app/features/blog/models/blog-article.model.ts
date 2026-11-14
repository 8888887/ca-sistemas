export type BlogCategoryId = 'plataforma' | 'recursos-humanos' | 'gestion-empresarial' | 'tecnologia-y-seguridad';

export interface BlogArticle {
  readonly id: string;
  readonly category: BlogCategoryId;
  readonly title: string;
  readonly excerpt: string;
  readonly body: string;
  readonly image: string;
}
