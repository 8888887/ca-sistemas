import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { CLIMATE_SURVEY_BENEFITS, CLIMATE_SURVEY_FAQS } from '../../data/encuesta-de-clima-laboral.data';

@Component({
  selector: 'app-encuesta-clima-laboral',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, MeetingRequestComponent],
  templateUrl: './encuesta-de-clima-laboral.component.html',
  styleUrl: './encuesta-de-clima-laboral.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncuestaDeClimaLaboralComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/recursos-humanos/encuesta-de-clima-laboral/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly benefits = CLIMATE_SURVEY_BENEFITS;
  protected readonly questions = CLIMATE_SURVEY_FAQS;
}
