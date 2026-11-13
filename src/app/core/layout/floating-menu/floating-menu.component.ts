import { TranslatePipe } from '../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PLATFORM_SOLUTIONS, SERVICE_GROUPS } from '../../config/solutions.data';
import { SolutionCategory } from '../../../shared/models/navigation.model';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-floating-menu',
  imports: [TranslatePipe, IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './floating-menu.component.html',
  styleUrl: './floating-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingMenuComponent {
  readonly navigated = output<void>();
  protected readonly category = signal<SolutionCategory>('platform');
  protected readonly groupId = signal(SERVICE_GROUPS[0].id);
  protected readonly platform = PLATFORM_SOLUTIONS;
  protected readonly groups = SERVICE_GROUPS;
  protected readonly activeGroup = computed(() => this.groups.find(group => group.id === this.groupId())!);

  protected selectCategory(category: SolutionCategory): void {
    this.category.set(category);
  }

  protected selectGroup(id: string): void {
    this.groupId.set(id);
  }
}
