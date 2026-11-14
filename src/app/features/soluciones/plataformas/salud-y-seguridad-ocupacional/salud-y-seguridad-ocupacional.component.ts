import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../core/config/contact.config';
import { PLATFORM_SOLUTIONS } from '../../../../core/config/solutions.data';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../shared/ui/faq-list/faq-list.component';
import { MeetingRequestComponent } from '../../../../shared/ui/meeting-request/meeting-request.component';
import { SAFETY_FAQS, SAFETY_FEATURES } from './data/salud-y-seguridad-ocupacional.data';

@Component({
  selector: 'app-salud-seguridad-ocupacional',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, MeetingRequestComponent],
  templateUrl: './salud-y-seguridad-ocupacional.component.html',
  styleUrl: './salud-y-seguridad-ocupacional.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaludYSeguridadOcupacionalComponent {
  protected readonly assets = '/images/soluciones/salud-y-seguridad-ocupacional/';
  protected readonly contact = CONTACT;
  protected readonly platforms = PLATFORM_SOLUTIONS;
  protected readonly features = SAFETY_FEATURES;
  protected readonly questions = SAFETY_FAQS;
}
