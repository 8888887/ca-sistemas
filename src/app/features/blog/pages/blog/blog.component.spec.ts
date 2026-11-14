import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RevealService } from '../../../../shared/directives/reveal/reveal.service';
import { LANGUAGE_STORAGE_KEY, LanguageService } from '../../../../shared/i18n/language.service';
import { BLOG_ARTICLES } from '../../data/blog.data';
import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {
  let fixture: ComponentFixture<BlogComponent>;
  let host: HTMLElement;
  let previousLanguage: string | null;

  beforeEach(async () => {
    previousLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    await TestBed.configureTestingModule({
      imports: [BlogComponent],
      providers: [provideRouter([]), { provide: RevealService, useValue: { watch: () => undefined } }],
    }).compileComponents();
    TestBed.inject(LanguageService).setLanguage('es');
    fixture = TestBed.createComponent(BlogComponent);
    fixture.detectChanges();
    host = fixture.nativeElement;
  });

  afterEach(() => {
    fixture.destroy();
    if (previousLanguage === null) localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    else localStorage.setItem(LANGUAGE_STORAGE_KEY, previousLanguage);
    document.documentElement.lang = 'es-PE';
  });

  function select(category: string): void {
    host.querySelector<HTMLButtonElement>(`[data-category="${category}"]`)!.click();
    fixture.detectChanges();
  }

  function search(value: string): void {
    const input = host.querySelector<HTMLInputElement>('#blog-search')!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function titles(): string[] {
    return [...host.querySelectorAll('app-blog-article-card h2')].map(title => title.textContent!.trim());
  }

  it('renders the supplied articles and filters by category, restoring the featured article on reset', () => {
    expect(titles()).toEqual(BLOG_ARTICLES.map(article => article.title));
    expect(host.querySelectorAll('app-blog-article-card.featured').length).toBe(1);
    select('tecnologia-y-seguridad');
    expect(titles()).toEqual(['Cómo optimizar SQL Server', 'Copias de seguridad empresariales', 'Pentesting y vulnerabilidades']);
    expect(host.querySelector('app-blog-article-card.featured')).toBeNull();
    expect(host.querySelectorAll('[aria-pressed="true"]').length).toBe(1);
    select('plataforma');
    expect(titles()).toEqual(['Planillas y control de asistencia']);
    select('all');
    expect(titles().length).toBe(7);
    expect(host.querySelector('app-blog-article-card.featured')).not.toBeNull();
  });

  it('combines categories and search, including accents, case, body text and an empty state', () => {
    search('  EVALUACION  ');
    expect(titles()).toEqual(['Cómo mejorar la evaluación de desempeño']);
    select('tecnologia-y-seguridad');
    expect(titles()).toEqual([]);
    expect(host.querySelector('[role="status"]')!.textContent).toContain('No encontramos artículos');
    search('RESTAURACION');
    expect(titles()).toEqual(['Copias de seguridad empresariales']);
    search('');
    expect(titles().length).toBe(3);
    expect(host.querySelector('[role="status"]')).toBeNull();
  });

  it('preserves the visitor search and category while translating results and controls', () => {
    select('recursos-humanos');
    search('EVALUACION');
    TestBed.inject(LanguageService).setLanguage('en');
    fixture.detectChanges();
    expect(host.querySelector<HTMLInputElement>('#blog-search')!.value).toBe('EVALUACION');
    expect(host.querySelector('[data-category="recursos-humanos"]')!.getAttribute('aria-pressed')).toBe('true');
    expect(titles()).toEqual(['How to improve performance reviews']);
    expect(host.querySelector<HTMLInputElement>('#blog-search')!.placeholder).toBe('E.g. performance reviews');
    search('follow-up');
    expect(titles()).toEqual(['How to improve performance reviews']);
  });

  it('opens the matching supplied summary in a native modal and removes it when closed', async () => {
    select('gestion-empresarial');
    host.querySelector<HTMLButtonElement>('app-blog-article-card h2 button')!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const dialog = host.querySelector<HTMLDialogElement>('dialog')!;
    expect(dialog.open).toBeTrue();
    expect(dialog.querySelector('h2')!.textContent).toBe('Firmas digitales certificadas');
    expect(dialog.querySelector('p')!.textContent).toBe(BLOG_ARTICLES[3].body);
    expect(dialog.getAttribute('aria-labelledby')).toBe('blog-article-title');
    dialog.close();
    await new Promise(resolve => setTimeout(resolve, 0));
    fixture.detectChanges();
    expect(host.querySelector('dialog')).toBeNull();
  });
});
