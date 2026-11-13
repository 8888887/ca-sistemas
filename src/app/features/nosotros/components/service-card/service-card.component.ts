import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { AboutService } from '../../data/nosotros.data';

@Component({
  selector: 'app-about-service-card',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  readonly service = input.required<AboutService>();
}
