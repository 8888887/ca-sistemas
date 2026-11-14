import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../core/config/contact.config';
import { PLATFORM_SOLUTIONS } from '../../../../core/config/solutions.data';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../shared/ui/faq-list/faq-list.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { MeetingRequestComponent } from '../../../../shared/ui/meeting-request/meeting-request.component';
import { LEARNING_FAQS, LEARNING_FEATURES } from './data/e-learning.data';

@Component({
  selector: 'app-e-learning',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, IconComponent, MeetingRequestComponent],
  templateUrl: './e-learning.component.html',
  styleUrl: './e-learning.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ELearningComponent {
  protected readonly assets = '/images/soluciones/e-learning/';
  protected readonly contact = CONTACT;
  protected readonly platforms = PLATFORM_SOLUTIONS;
  protected readonly features = LEARNING_FEATURES;
  protected readonly questions = LEARNING_FAQS;
}
