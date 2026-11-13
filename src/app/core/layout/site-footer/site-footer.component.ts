import { TranslatePipe } from '../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandLogoComponent } from '../../../shared/ui/brand-logo/brand-logo.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { CONTACT } from '../../config/contact.config';
import { PLATFORM_SOLUTIONS, SERVICE_GROUPS } from '../../config/solutions.data';

@Component({
  selector: 'app-site-footer',
  imports: [TranslatePipe, RouterLink, BrandLogoComponent, IconComponent],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent {
  protected readonly contact = CONTACT;
  protected readonly products = PLATFORM_SOLUTIONS;
  protected readonly services = SERVICE_GROUPS[0].items.slice(0, 4);
  protected readonly year = new Date().getFullYear();
}
