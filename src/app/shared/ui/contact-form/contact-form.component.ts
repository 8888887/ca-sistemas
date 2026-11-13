import { TranslatePipe } from '../../i18n/translate.pipe';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'app-contact-form',
  imports: [TranslatePipe, ReactiveFormsModule, IconComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  readonly whatsappUrl = input.required<string>();
  private readonly document = inject(DOCUMENT);
  private readonly builder = inject(NonNullableFormBuilder);
  private readonly language = inject(LanguageService);
  protected readonly prepared = signal(false);
  protected readonly form = this.builder.group({
    name: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s()-]{7,20}$/)]],
    company: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(150)]],
    message: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(1500)]],
  });

  protected invalid(field: keyof typeof this.form.controls): boolean {
    return this.form.controls[field].touched && this.form.controls[field].invalid;
  }

  protected submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const { name, phone, company, message } = this.form.getRawValue();
    const text = [
      this.language.translate('Hola, soy {name} de {company}.', { name: name.trim(), company: company.trim() }),
      this.language.translate('Celular: {phone}', { phone: phone.trim() }),
      this.language.translate('Consulta: {message}', { message: message.trim() }),
    ].join('\n');
    this.document.defaultView?.open(`${this.whatsappUrl()}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    this.prepared.set(true);
  }
}
