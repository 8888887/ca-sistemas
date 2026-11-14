import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { LAW_FAQS, LAW_FEATURES } from '../../data/ley-30709.data';

@Component({
  selector: 'app-ley-30709',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, MeetingRequestComponent],
  templateUrl: './ley-30709.component.html',
  styleUrl: './ley-30709.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ley30709Component {
  protected readonly assets = '/images/soluciones/servicios-adicionales/recursos-humanos/ley-30709/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly features = LAW_FEATURES;
  protected readonly questions = LAW_FAQS;
}
