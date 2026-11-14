import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../core/config/contact.config';
import { PLATFORM_SOLUTIONS } from '../../../../core/config/solutions.data';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { FaqListComponent } from '../../../../shared/ui/faq-list/faq-list.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { MeetingRequestComponent } from '../../../../shared/ui/meeting-request/meeting-request.component';
import { ATTENDANCE_BENEFITS, PAYROLL_FAQS, REPORTING_BENEFITS } from './data/planillas-y-control-de-asistencia.data';

@Component({
  selector: 'app-planillas-control-asistencia',
  imports: [RevealDirective, TranslatePipe, FaqListComponent, IconComponent, MeetingRequestComponent],
  templateUrl: './planillas-y-control-de-asistencia.component.html',
  styleUrl: './planillas-y-control-de-asistencia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanillasYControlDeAsistenciaComponent {
  protected readonly assets = '/images/soluciones/planillas-y-control-de-asistencia/';
  protected readonly contact = CONTACT;
  protected readonly platforms = PLATFORM_SOLUTIONS;
  protected readonly attendanceBenefits = ATTENDANCE_BENEFITS;
  protected readonly reportingBenefits = REPORTING_BENEFITS;
  protected readonly questions = PAYROLL_FAQS;
}
