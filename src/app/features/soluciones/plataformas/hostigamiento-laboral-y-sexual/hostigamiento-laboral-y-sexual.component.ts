import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../core/config/contact.config';
import { PLATFORM_SOLUTIONS } from '../../../../core/config/solutions.data';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../shared/ui/faq-list/faq-list.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { MeetingRequestComponent } from '../../../../shared/ui/meeting-request/meeting-request.component';
import { HARASSMENT_FAQS, HARASSMENT_FEATURES } from './data/hostigamiento-laboral-y-sexual.data';

@Component({
  selector: 'app-hostigamiento-laboral-sexual',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, IconComponent, MeetingRequestComponent],
  templateUrl: './hostigamiento-laboral-y-sexual.component.html',
  styleUrl: './hostigamiento-laboral-y-sexual.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostigamientoLaboralYSexualComponent {
  protected readonly assets = '/images/soluciones/hostigamiento-laboral-y-sexual/';
  protected readonly contact = CONTACT;
  protected readonly platforms = PLATFORM_SOLUTIONS;
  protected readonly features = HARASSMENT_FEATURES;
  protected readonly questions = HARASSMENT_FAQS;
}
