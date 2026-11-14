import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { TechnologyExpertsComponent } from '../../components/technology-experts/technology-experts.component';
import { TECHNOLOGY_CONSULTING_BENEFITS, TECHNOLOGY_CONSULTING_FAQS } from '../../data/consultoria-en-tecnologia.data';

@Component({
  selector: 'app-consultoria-tecnologia',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, MeetingRequestComponent, TechnologyExpertsComponent],
  templateUrl: './consultoria-en-tecnologia.component.html',
  styleUrl: './consultoria-en-tecnologia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultoriaEnTecnologiaComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/tecnologia-y-seguridad/consultoria-en-tecnologia/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly benefits = TECHNOLOGY_CONSULTING_BENEFITS;
  protected readonly questions = TECHNOLOGY_CONSULTING_FAQS;
}
