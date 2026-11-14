import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { PROCESS_BENEFITS, PROCESS_FAQS, PROCESS_OVERVIEW } from '../../data/mejora-de-procesos.data';

@Component({
  selector: 'app-mejora-procesos',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, MeetingRequestComponent],
  templateUrl: './mejora-de-procesos.component.html',
  styleUrl: './mejora-de-procesos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MejoraDeProcesosComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/gestion-empresarial/mejora-de-procesos/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly overview = PROCESS_OVERVIEW;
  protected readonly benefits = PROCESS_BENEFITS;
  protected readonly questions = PROCESS_FAQS;
}
