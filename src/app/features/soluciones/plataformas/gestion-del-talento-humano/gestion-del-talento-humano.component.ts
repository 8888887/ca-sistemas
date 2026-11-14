import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../core/config/contact.config';
import { PLATFORM_SOLUTIONS } from '../../../../core/config/solutions.data';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../shared/ui/faq-list/faq-list.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { MeetingRequestComponent } from '../../../../shared/ui/meeting-request/meeting-request.component';
import { TALENT_FAQS, TALENT_FEATURES } from './data/gestion-del-talento-humano.data';

@Component({
  selector: 'app-gestion-talento-humano',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, IconComponent, MeetingRequestComponent],
  templateUrl: './gestion-del-talento-humano.component.html',
  styleUrl: './gestion-del-talento-humano.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionDelTalentoHumanoComponent {
  protected readonly assets = '/images/soluciones/gestion-del-talento-humano/';
  protected readonly contact = CONTACT;
  protected readonly platforms = PLATFORM_SOLUTIONS;
  protected readonly features = TALENT_FEATURES;
  protected readonly questions = TALENT_FAQS;
}
