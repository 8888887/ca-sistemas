import { RevealDirective } from '../../../../shared/directives/reveal/reveal.directive';
import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT } from '../../../../core/config/contact.config';
import { ContactFormComponent } from '../../../../shared/ui/contact-form/contact-form.component';
import { VideoCardComponent } from '../../../../shared/ui/video-card/video-card.component';

@Component({
  selector: 'app-home-contact',
  imports: [RevealDirective, TranslatePipe, ContactFormComponent, VideoCardComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  protected readonly contact = CONTACT;
}
