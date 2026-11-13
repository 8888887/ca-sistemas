import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { AboutValue } from '../../data/nosotros.data';

@Component({
  selector: 'app-value-card',
  imports: [TranslatePipe, IconComponent],
  templateUrl: './value-card.component.html',
  styleUrl: './value-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueCardComponent {
  readonly value = input.required<AboutValue>();
}
