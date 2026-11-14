import { RevealDirective } from '../../directives/reveal/reveal.directive';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FaqItem } from '../../models/faq.model';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-faq-list',
  imports: [RevealDirective, TranslatePipe, IconComponent],
  templateUrl: './faq-list.component.html',
  styleUrl: './faq-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqListComponent {
  readonly items = input.required<readonly FaqItem[]>();
  readonly title = input('Preguntas frecuentes');
}
