import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RevealService } from '../../../../shared/directives/reveal/reveal.service';
import { LanguageService } from '../../../../shared/i18n/language.service';
import { CertificationsCarouselComponent } from './certifications-carousel.component';

describe('CertificationsCarouselComponent', () => {
  let fixture: ComponentFixture<CertificationsCarouselComponent>;
  let host: HTMLElement;
  let reducedMotion: boolean;
  let preferenceChanged: () => void;
  let removeListener: jasmine.Spy;

  beforeEach(async () => {
    reducedMotion = false;
    removeListener = jasmine.createSpy('removeEventListener');
    spyOn(window, 'matchMedia').and.returnValue({
      get matches() { return reducedMotion; },
      addEventListener: (_type: string, listener: () => void) => { preferenceChanged = listener; },
      removeEventListener: removeListener,
    } as unknown as MediaQueryList);
    await TestBed.configureTestingModule({
      imports: [CertificationsCarouselComponent],
      providers: [{ provide: RevealService, useValue: { watch: () => undefined } }],
    }).compileComponents();
    TestBed.inject(LanguageService).setLanguage('es');
  });

  afterEach(() => fixture?.destroy());

  function render(): void {
    fixture = TestBed.createComponent(CertificationsCarouselComponent);
    fixture.detectChanges();
    host = fixture.nativeElement;
  }

  function position(): string {
    fixture.detectChanges();
    return host.querySelector('.carousel-position')!.textContent!.trim();
  }

  function click(selector: string): void {
    host.querySelector<HTMLButtonElement>(selector)!.click();
    fixture.detectChanges();
  }

  it('advances automatically and loops without duplicating accessible certificate content', fakeAsync(() => {
    render();
    const originals = host.querySelectorAll('article:not([aria-hidden])');
    expect(originals.length).toBe(6);
    expect(host.querySelectorAll('article[aria-hidden="true"]').length).toBe(6);
    expect(originals[0].querySelector('img')!.getAttribute('src')).toContain('/home/certifications/oracle.png');
    for (let index = 1; index <= 6; index++) {
      tick(index === 1 ? 4000 : 3300);
      expect(position()).toContain(`${index % 6 + 1} / 6`);
      tick(700);
    }
    fixture.detectChanges();
    expect(host.querySelector('.certification-track')!.getAttribute('data-position')).toBe('0');
    fixture.destroy();
    tick(8000); // Destroying the component must cancel its interval and transition fallback.
  }));

  it('pauses while hovered or focused and resumes when interaction leaves the section', fakeAsync(() => {
    render();
    const section = host.querySelector('section')!;
    section.dispatchEvent(new MouseEvent('mouseenter'));
    tick(4000);
    expect(position()).toContain('1 / 6');
    section.dispatchEvent(new MouseEvent('mouseleave'));
    section.dispatchEvent(new FocusEvent('focusin'));
    section.dispatchEvent(new FocusEvent('focusout', { relatedTarget: host.querySelector('.next') }));
    tick(4000);
    expect(position()).toContain('1 / 6');
    section.dispatchEvent(new FocusEvent('focusout', { relatedTarget: null }));
    tick(4000);
    expect(position()).toContain('2 / 6');
  }));

  it('allows manual navigation backwards and forwards across the loop boundary', fakeAsync(() => {
    render();
    host.querySelector('section')!.dispatchEvent(new MouseEvent('mouseenter'));
    click('.previous');
    tick(750);
    expect(position()).toContain('6 / 6');
    click('.next');
    tick(700);
    expect(position()).toContain('1 / 6');
  }));

  it('respects reduced motion and keeps manual controls and language switching available', fakeAsync(() => {
    reducedMotion = true;
    render();
    tick(8000);
    expect(position()).toContain('1 / 6');
    expect(host.querySelector('.rotation-toggle')).toBeNull();
    expect(host.querySelector('.carousel-position')!.classList).toContain('sr-only');
    click('.previous');
    expect(position()).toContain('6 / 6');
    click('.next');
    expect(position()).toContain('1 / 6');
    TestBed.inject(LanguageService).setLanguage('en');
    fixture.detectChanges();
    expect(host.querySelector('.next')!.getAttribute('aria-label')).toBe('Next certification');
    expect(host.querySelector('h2')!.textContent).toBe('Our Certifications');
  }));

  it('stops rotation if reduced motion is enabled later and removes its listener on destroy', fakeAsync(() => {
    render();
    tick(4000);
    expect(position()).toContain('2 / 6');
    reducedMotion = true;
    preferenceChanged();
    tick(8000);
    expect(position()).toContain('2 / 6');
    fixture.destroy();
    expect(removeListener).toHaveBeenCalledWith('change', preferenceChanged);
  }));
});
