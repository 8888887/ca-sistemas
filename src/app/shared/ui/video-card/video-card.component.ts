import { TranslatePipe } from '../../i18n/translate.pipe';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-video-card',
  imports: [TranslatePipe, IconComponent],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCardComponent {
  private readonly sanitizer = inject(DomSanitizer);
  readonly videoId = input.required<string>();
  readonly title = input.required<string>();
  protected readonly playing = signal(false);
  protected readonly source = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId())}?autoplay=1&rel=0`,
  ));
}
