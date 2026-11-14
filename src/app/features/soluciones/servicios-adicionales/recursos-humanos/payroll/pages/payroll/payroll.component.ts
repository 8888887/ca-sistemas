import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { PAYROLL_SERVICE_BENEFITS, PAYROLL_SERVICE_FAQS, PAYROLL_SERVICE_FEATURES } from '../../data/payroll.data';

@Component({
  selector: 'app-payroll-service',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, IconComponent, MeetingRequestComponent],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayrollServiceComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/recursos-humanos/payroll/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly benefits = PAYROLL_SERVICE_BENEFITS;
  protected readonly features = PAYROLL_SERVICE_FEATURES;
  protected readonly questions = PAYROLL_SERVICE_FAQS;
}
