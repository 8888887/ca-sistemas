import { TranslatePipe } from '../../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {}
