import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-home-hero',
  imports: [TranslatePipe, RouterLink, IconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
