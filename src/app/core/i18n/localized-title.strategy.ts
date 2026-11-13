import { effect, inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { LanguageService } from '../../shared/i18n/language.service';

@Injectable()
export class LocalizedTitleStrategy extends TitleStrategy {
  private readonly language = inject(LanguageService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly source = signal('Software de Recursos Humanos | CA Sistemas');

  constructor() {
    super();
    effect(() => {
      this.title.setTitle(this.source().split(' | ').map(part => this.language.translate(part)).join(' | '));
      this.meta.updateTag({
        name: 'description',
        content: this.language.translate('Automatiza tus procesos de recursos humanos con Empresarial-RH. Conoce las soluciones de CA Sistemas Empresariales para tu empresa.'),
      });
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.source.set(this.buildTitle(snapshot) ?? 'Software de Recursos Humanos | CA Sistemas');
  }
}
