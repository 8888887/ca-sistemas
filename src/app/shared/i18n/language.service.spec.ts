import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { LANGUAGE_STORAGE_KEY, LanguageService } from './language.service';

describe('LanguageService', () => {
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

  it('defaults to Spanish and updates the document language and saved preference', () => {
    const service = TestBed.inject(LanguageService);
    expect(service.language()).toBe('es');
    expect(service.translate('Soluciones')).toBe('Soluciones');
    service.setLanguage('en');
    expect(service.translate('Soluciones')).toBe('Solutions');
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('en');
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');
    service.setLanguage('es');
    expect(document.documentElement.lang).toBe('es-PE');
  });

  it('restores English after a reload and ignores unsupported language codes', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
    const service = TestBed.inject(LanguageService);
    expect(service.language()).toBe('en');
    service.setLanguage('fr');
    expect(service.language()).toBe('en');
    expect(service.translate('CA Sistemas')).toBe('CA Sistemas');
  });

  it('works even when browser storage is blocked', () => {
    const getItem = spyOn(Storage.prototype, 'getItem').and.throwError('Storage blocked');
    const setItem = spyOn(Storage.prototype, 'setItem').and.throwError('Storage blocked');
    try {
      const service = TestBed.inject(LanguageService);
      expect(service.language()).toBe('es');
      expect(() => service.setLanguage('en')).not.toThrow();
      expect(service.language()).toBe('en');
    } finally {
      // Allow afterEach to restore any language left by another test suite.
      getItem.and.callThrough();
      setItem.and.callThrough();
    }
  });

  it('interpolates visitor data without translating the visitor’s own text', () => {
    const service = TestBed.inject(LanguageService);
    service.setLanguage('en');
    expect(service.translate('Hola, soy {name} de {company}.', { name: 'Ana', company: 'Empresa Perú' }))
      .toBe('Hello, I am Ana from Empresa Perú.');
  });
});
