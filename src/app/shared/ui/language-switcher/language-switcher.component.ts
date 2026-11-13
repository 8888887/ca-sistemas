import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-language-switcher',
  imports: [IconComponent, TranslatePipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  protected readonly language = inject(LanguageService);

  protected changeLanguage(event: Event): void {
    this.language.setLanguage((event.target as HTMLSelectElement).value);
  }
}
