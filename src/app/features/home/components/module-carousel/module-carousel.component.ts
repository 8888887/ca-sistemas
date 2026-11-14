import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLATFORM_SOLUTIONS } from '../../../../core/config/solutions.data';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-module-carousel',
  imports: [RevealDirective, TranslatePipe, RouterLink, IconComponent],
  templateUrl: './module-carousel.component.html',
  styleUrl: './module-carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleCarouselComponent {
  protected readonly modules = [PLATFORM_SOLUTIONS[2], PLATFORM_SOLUTIONS[0], PLATFORM_SOLUTIONS[1], PLATFORM_SOLUTIONS[3], PLATFORM_SOLUTIONS[4]];
  protected readonly index = signal(0);
  protected readonly active = computed(() => this.modules[this.index()]);
  protected readonly images = ['module-talent.webp', 'module-payroll.webp', 'module-safety.webp', 'module-talent.webp', 'module-payroll.webp'];

  protected move(direction: number): void {
    this.index.update(index => (index + direction + this.modules.length) % this.modules.length);
  }
}
