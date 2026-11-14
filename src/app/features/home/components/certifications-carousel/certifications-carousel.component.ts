import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { CERTIFICATIONS } from '../../data/home.data';

@Component({
  selector: 'app-certifications-carousel',
  imports: [RevealDirective, TranslatePipe, IconComponent],
  templateUrl: './certifications-carousel.component.html',
  styleUrl: './certifications-carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationsCarouselComponent {
  protected readonly certificates = CERTIFICATIONS;
  // The second set makes the last-to-first transition seamless. It is hidden from assistive technology.
  protected readonly slides = [CERTIFICATIONS, CERTIFICATIONS];
  protected readonly position = signal(0);
  protected readonly activeIndex = computed(() => this.position() % this.certificates.length);
  protected readonly animated = signal(false);
  private readonly rotationEnabled = signal(true);
  protected readonly hovered = signal(false);
  protected readonly focused = signal(false);
  protected readonly rotating = computed(() => this.rotationEnabled() && !this.hovered() && !this.focused());

  private readonly view = inject(DOCUMENT).defaultView;
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly preference = this.browser ? this.view?.matchMedia?.('(prefers-reduced-motion: reduce)') : undefined;
  private busy = false;
  private completion?: number;
  private frame?: number;
  private reducedMotion = !!this.preference?.matches;
  private readonly preferenceChanged = () => {
    this.reducedMotion = !!this.preference?.matches;
    this.rotationEnabled.set(!this.reducedMotion);
    if (this.reducedMotion) {
      this.finishMove();
    }
  };

  constructor() {
    this.rotationEnabled.set(!this.reducedMotion);
    if (!this.browser || !this.view) return;
    const interval = this.view.setInterval(() => {
      if (this.rotating()) this.move(1);
    }, 4000);
    this.preference?.addEventListener('change', this.preferenceChanged);
    inject(DestroyRef).onDestroy(() => {
      this.view!.clearInterval(interval);
      this.clearPending();
      this.preference?.removeEventListener('change', this.preferenceChanged);
    });
  }

  protected onFocusOut(event: FocusEvent): void {
    const section = event.currentTarget as HTMLElement;
    this.focused.set(event.relatedTarget instanceof Node && section.contains(event.relatedTarget));
  }

  protected move(direction: number): void {
    if (this.busy || !this.view) return;
    this.busy = true;
    if (direction < 0 && this.position() === 0 && !this.reducedMotion) {
      // Jump to the identical second set before animating back by one logo.
      this.animated.set(false);
      this.position.set(this.certificates.length);
      this.frame = this.view.requestAnimationFrame(() => {
        this.frame = this.view!.requestAnimationFrame(() => this.startMove(this.certificates.length - 1));
      });
      return;
    }
    const next = this.position() + direction;
    this.startMove(next < 0 ? this.certificates.length - 1 : next);
  }

  protected onTransitionEnd(event: TransitionEvent): void {
    if (event.target === event.currentTarget && event.propertyName === 'transform') this.finishMove();
  }

  private startMove(position: number): void {
    this.animated.set(!this.reducedMotion);
    this.position.set(position);
    if (this.reducedMotion) this.finishMove();
    else this.completion = this.view!.setTimeout(() => this.finishMove(), 700);
  }

  private finishMove(): void {
    this.clearPending();
    this.animated.set(false);
    if (this.position() === this.certificates.length) this.position.set(0);
    this.busy = false;
  }

  private clearPending(): void {
    if (this.completion !== undefined) this.view?.clearTimeout(this.completion);
    if (this.frame !== undefined) this.view?.cancelAnimationFrame(this.frame);
    this.completion = undefined;
    this.frame = undefined;
  }
}
