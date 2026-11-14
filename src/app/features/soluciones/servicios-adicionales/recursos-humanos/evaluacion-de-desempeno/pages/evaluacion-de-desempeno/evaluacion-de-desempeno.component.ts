import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { PERFORMANCE_BENEFITS, PERFORMANCE_FAQS } from '../../data/evaluacion-de-desempeno.data';

@Component({
  selector: 'app-evaluacion-desempeno',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, MeetingRequestComponent],
  templateUrl: './evaluacion-de-desempeno.component.html',
  styleUrl: './evaluacion-de-desempeno.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvaluacionDeDesempenoComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/recursos-humanos/evaluacion-de-desempeno/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly benefits = PERFORMANCE_BENEFITS;
  protected readonly questions = PERFORMANCE_FAQS;
}
