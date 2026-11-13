import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Solution } from '../../../../shared/models/navigation.model';
import { CONTACT } from '../../../../core/config/contact.config';
import { ContactFormComponent } from '../../../../shared/ui/contact-form/contact-form.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-solution',
  imports: [TranslatePipe, RouterLink, ContactFormComponent, IconComponent],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionComponent {
  protected readonly contact = CONTACT;
  private readonly data = toSignal(inject(ActivatedRoute).data, { requireSync: true });
  protected readonly solution = computed(() => this.data()['solution'] as Solution);
}
