import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { DIGITAL_SIGNATURE_BENEFITS, DIGITAL_SIGNATURE_FAQS } from '../../data/firmas-digitales-certificadas.data';

@Component({
  selector: 'app-firmas-digitales-certificadas',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, MeetingRequestComponent],
  templateUrl: './firmas-digitales-certificadas.component.html',
  styleUrl: './firmas-digitales-certificadas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirmasDigitalesCertificadasComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/gestion-empresarial/firmas-digitales-certificadas/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly benefits = DIGITAL_SIGNATURE_BENEFITS;
  protected readonly questions = DIGITAL_SIGNATURE_FAQS;
}
