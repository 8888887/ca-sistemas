import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { DATA_CENTER_BENEFITS, DATA_CENTER_FAQS, DATA_CENTER_HERO_DESCRIPTION, DATA_CENTER_OVERVIEW } from '../../data/data-center.data';

@Component({
  selector: 'app-data-center',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, MeetingRequestComponent],
  templateUrl: './data-center.component.html',
  styleUrl: './data-center.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataCenterComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/tecnologia-y-seguridad/data-center/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly heroDescription = DATA_CENTER_HERO_DESCRIPTION;
  protected readonly overview = DATA_CENTER_OVERVIEW;
  protected readonly benefits = DATA_CENTER_BENEFITS;
  protected readonly questions = DATA_CENTER_FAQS;
}
