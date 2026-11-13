import { TestBed } from '@angular/core/testing';
import { LANGUAGE_STORAGE_KEY, LanguageService } from '../../i18n/language.service';
import { LanguageSwitcherComponent } from './language-switcher.component';

describe('LanguageSwitcherComponent', () => {
  let previous: string | null;

  beforeEach(() => {
    previous = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    localStorage.removeItem(LANGUAGE_STORAGE_KEY);
  });

  afterEach(() => {
    if (previous === null) localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    else localStorage.setItem(LANGUAGE_STORAGE_KEY, previous);
    document.documentElement.lang = 'es-PE';
  });

  it('changes language through the native select and updates its accessible label', () => {
    const fixture = TestBed.createComponent(LanguageSwitcherComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const select = host.querySelector('select')!;
    expect(select.value).toBe('es');
    select.value = 'en';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(TestBed.inject(LanguageService).language()).toBe('en');
    expect(host.querySelector('label')!.textContent).toBe('Language');
    expect(host.querySelector('label')!.htmlFor).toBe(select.id);
    select.value = 'es';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(host.querySelector('label')!.textContent).toBe('Idioma');
  });
});
