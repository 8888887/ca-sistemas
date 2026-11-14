import { DestroyRef, Directive, ElementRef, OnInit, inject, input, signal } from '@angular/core';
import { RevealService } from './reveal.service';

@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal-ready]': 'ready()',
    '[class.reveal-visible]': 'visible()',
    '[class.reveal-from-right]': 'direction() === "right"',
    '[class.reveal-delay-80]': 'delay() === 80',
    '[class.reveal-delay-160]': 'delay() === 160',
    '(focusin)': 'show()',
  },
})
export class RevealDirective implements OnInit {
  readonly direction = input<'left' | 'right'>('left', { alias: 'appReveal' });
  readonly delay = input(0, { alias: 'appRevealDelay' });
  protected readonly ready = signal(false);
  protected readonly visible = signal(false);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly reveal = inject(RevealService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const stop = this.reveal.watch(this.element, () => this.visible.set(true));
    if (stop) {
      this.ready.set(true);
      this.destroyRef.onDestroy(stop);
    }
  }

  protected show(): void {
    this.reveal.reveal(this.element);
    this.visible.set(true);
  }
}
