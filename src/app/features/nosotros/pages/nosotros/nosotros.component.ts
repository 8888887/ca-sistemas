import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { PurposeCardComponent } from '../../components/purpose-card/purpose-card.component';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { ValueCardComponent } from '../../components/value-card/value-card.component';
import { ABOUT_DIFFERENTIATORS, ABOUT_EXPERIENCE, ABOUT_HISTORY, ABOUT_PURPOSES, ABOUT_SERVICES, ABOUT_TEAM_IMAGES, ABOUT_VALUES } from '../../data/nosotros.data';

@Component({
  selector: 'app-nosotros',
  imports: [RevealDirective, TranslatePipe, PurposeCardComponent, ValueCardComponent, ServiceCardComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NosotrosComponent {
  protected readonly assets = '/images/nosotros/';
  protected readonly history = ABOUT_HISTORY;
  protected readonly purposes = ABOUT_PURPOSES;
  protected readonly teamImages = ABOUT_TEAM_IMAGES;
  protected readonly experience = ABOUT_EXPERIENCE;
  protected readonly differentiators = ABOUT_DIFFERENTIATORS;
  protected readonly values = ABOUT_VALUES;
  protected readonly services = ABOUT_SERVICES;
}
