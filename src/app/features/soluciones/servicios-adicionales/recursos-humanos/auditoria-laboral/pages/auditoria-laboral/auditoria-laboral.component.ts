import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { IconComponent } from '../../../../../../../shared/ui/icon/icon.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { AUDIT_BENEFITS, AUDIT_FAQS, AUDIT_REVIEW_AREAS } from '../../data/auditoria-laboral.data';

@Component({
  selector: 'app-auditoria-laboral',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, IconComponent, MeetingRequestComponent],
  templateUrl: './auditoria-laboral.component.html',
  styleUrl: './auditoria-laboral.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditoriaLaboralComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/recursos-humanos/auditoria-laboral/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly reviewAreas = AUDIT_REVIEW_AREAS;
  protected readonly benefits = AUDIT_BENEFITS;
  protected readonly questions = AUDIT_FAQS;
}
