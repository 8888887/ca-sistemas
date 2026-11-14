import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RevealService {
  private readonly view = inject(DOCUMENT).defaultView;
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly preference = this.browser ? this.view?.matchMedia?.('(prefers-reduced-motion: reduce)') : undefined;
  private readonly targets = new Map<HTMLElement, () => void>();
  private observer?: IntersectionObserver;
  private readonly onPreferenceChange = () => {
    if (this.preference?.matches) {
      for (const element of [...this.targets.keys()]) this.reveal(element);
    }
  };

  constructor() {
    this.preference?.addEventListener('change', this.onPreferenceChange);
    inject(DestroyRef).onDestroy(() => {
      this.observer?.disconnect();
      this.targets.clear();
      this.preference?.removeEventListener('change', this.onPreferenceChange);
    });
  }

  watch(element: HTMLElement, onReveal: () => void): (() => void) | undefined {
    if (!this.browser || !this.view || this.preference?.matches || typeof this.view.IntersectionObserver !== 'function') return;

    this.observer ??= new this.view.IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) this.reveal(entry.target as HTMLElement);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    this.targets.set(element, onReveal);
    this.observer.observe(element);
    return () => {
      if (this.targets.delete(element)) this.observer?.unobserve(element);
    };
  }

  reveal(element: HTMLElement): void {
    const onReveal = this.targets.get(element);
    if (!onReveal) return;
    this.targets.delete(element);
    this.observer?.unobserve(element);
    onReveal();
  }
}
