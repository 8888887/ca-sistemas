import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { EN_TRANSLATIONS } from './en';

export type Language = 'es' | 'en';
export const LANGUAGE_STORAGE_KEY = 'ca-sistemas.language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly current = signal<Language>(this.readPreference());
  readonly language = this.current.asReadonly();

  constructor() {
    this.updateDocumentLanguage();
  }

  setLanguage(language: string): void {
    if (language !== 'es' && language !== 'en') return;
    this.current.set(language);
    this.updateDocumentLanguage();
    try {
      this.document.defaultView?.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Language switching also works when browser storage is unavailable.
    }
  }

  translate(source: string, parameters: Readonly<Record<string, string | number>> = {}): string {
    const text = this.language() === 'en' ? EN_TRANSLATIONS[source] ?? source : source;
    return text.replace(/\{(\w+)\}/g, (placeholder, key: string) => String(parameters[key] ?? placeholder));
  }

  private readPreference(): Language {
    try {
      return this.document.defaultView?.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'es';
    } catch {
      return 'es';
    }
  }

  private updateDocumentLanguage(): void {
    this.document.documentElement.lang = this.language() === 'es' ? 'es-PE' : 'en';
  }
}
