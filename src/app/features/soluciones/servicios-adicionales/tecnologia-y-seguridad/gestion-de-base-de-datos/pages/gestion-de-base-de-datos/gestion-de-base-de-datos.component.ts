import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { DATABASE_BENEFITS, DATABASE_FAQS, DATABASE_OVERVIEW } from '../../data/gestion-de-base-de-datos.data';

@Component({
  selector: 'app-gestion-base-datos',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, MeetingRequestComponent],
  templateUrl: './gestion-de-base-de-datos.component.html',
  styleUrl: './gestion-de-base-de-datos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionDeBaseDeDatosComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/tecnologia-y-seguridad/gestion-de-base-de-datos/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly overview = DATABASE_OVERVIEW;
  protected readonly benefits = DATABASE_BENEFITS;
  protected readonly questions = DATABASE_FAQS;
}
