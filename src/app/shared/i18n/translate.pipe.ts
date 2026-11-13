import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from './language.service';

/** Re-evaluates static template text when the shared language signal changes. */
@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(source: string): string {
    return this.language.translate(source);
  }
}
