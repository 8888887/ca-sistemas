import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { ANALYTICS_BENEFITS, ANALYTICS_FAQS, ANALYTICS_FEATURES } from '../../data/hr-analytics.data';

@Component({
  selector: 'app-hr-analytics',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, IconComponent, MeetingRequestComponent],
  templateUrl: './hr-analytics.component.html',
  styleUrl: './hr-analytics.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HrAnalyticsComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/recursos-humanos/hr-analytics/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly benefits = ANALYTICS_BENEFITS;
  protected readonly features = ANALYTICS_FEATURES;
  protected readonly questions = ANALYTICS_FAQS;
}
