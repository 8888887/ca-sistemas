import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../../../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../../../../shared/i18n/translate.pipe';
import { TECHNOLOGY_EXPERTS } from '../../data/consultoria-en-tecnologia.data';

@Component({
  selector: 'app-technology-experts',
  imports: [RevealDirective, TranslatePipe],
  templateUrl: './technology-experts.component.html',
  styleUrl: './technology-experts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyExpertsComponent {
  protected readonly experts = TECHNOLOGY_EXPERTS;
  protected readonly assets = '/images/soluciones/servicios-adicionales/tecnologia-y-seguridad/consultoria-en-tecnologia/';
}
