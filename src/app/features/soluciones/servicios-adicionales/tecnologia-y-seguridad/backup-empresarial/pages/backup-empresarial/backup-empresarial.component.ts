import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../../../../core/config/contact.config';
import { SERVICE_GROUPS } from '../../../../../../../core/config/solutions.data';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../../../../shared/ui/faq-list/faq-list.component';
import { MeetingRequestComponent } from '../../../../../../../shared/ui/meeting-request/meeting-request.component';
import { BACKUP_BENEFITS, BACKUP_FAQS, BACKUP_OVERVIEW } from '../../data/backup-empresarial.data';

@Component({
  selector: 'app-backup-empresarial',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, MeetingRequestComponent],
  templateUrl: './backup-empresarial.component.html',
  styleUrl: './backup-empresarial.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackupEmpresarialComponent {
  protected readonly assets = '/images/soluciones/servicios-adicionales/tecnologia-y-seguridad/backup-empresarial/';
  protected readonly contact = CONTACT;
  protected readonly services = SERVICE_GROUPS.flatMap(group => group.items);
  protected readonly overview = BACKUP_OVERVIEW;
  protected readonly benefits = BACKUP_BENEFITS;
  protected readonly questions = BACKUP_FAQS;
}
