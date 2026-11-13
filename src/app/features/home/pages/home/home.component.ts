import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICE_GROUPS } from '../../../../core/config/solutions.data';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ModuleCarouselComponent } from '../../components/module-carousel/module-carousel.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { CERTIFICATIONS, CLIENTS, SECTORS } from '../../data/home.data';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, RouterLink, HeroComponent, ContactSectionComponent, IconComponent, ModuleCarouselComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly sectors = SECTORS;
  protected readonly clients = CLIENTS;
  protected readonly services = SERVICE_GROUPS;
  protected readonly certifications = CERTIFICATIONS;
}
