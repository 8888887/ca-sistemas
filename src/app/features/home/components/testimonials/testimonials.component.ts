import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VideoCardComponent } from '../../../../shared/ui/video-card/video-card.component';
import { TESTIMONIALS } from '../../data/home.data';

@Component({
  selector: 'app-testimonials',
  imports: [TranslatePipe, VideoCardComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  protected readonly testimonials = TESTIMONIALS;
}
