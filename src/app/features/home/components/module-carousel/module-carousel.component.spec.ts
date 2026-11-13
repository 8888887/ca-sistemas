import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ModuleCarouselComponent } from './module-carousel.component';

describe('ModuleCarouselComponent', () => {
  it('cycles in both directions and keeps the details link in sync', async () => {
    await TestBed.configureTestingModule({ imports: [ModuleCarouselComponent], providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(ModuleCarouselComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('h3')!.textContent).toContain('Gestión del Talento Humano');
    host.querySelector<HTMLButtonElement>('.previous')!.click();
    fixture.detectChanges();
    expect(host.querySelector('h3')!.textContent).toBe('E-Learning');
    expect(host.querySelector('.more-link')!.getAttribute('href')).toBe('/soluciones/e-learning');
    host.querySelector<HTMLButtonElement>('.next')!.click();
    fixture.detectChanges();
    expect(host.querySelector('h3')!.textContent).toContain('Gestión del Talento Humano');
    expect(host.querySelectorAll('[aria-current="true"]').length).toBe(1);
  });
});
