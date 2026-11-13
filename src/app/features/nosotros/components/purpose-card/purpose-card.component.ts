import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { AboutPurpose } from '../../data/nosotros.data';

@Component({
  selector: 'app-purpose-card',
  imports: [TranslatePipe, IconComponent],
  templateUrl: './purpose-card.component.html',
  styleUrl: './purpose-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurposeCardComponent {
  readonly purpose = input.required<AboutPurpose>();
}
