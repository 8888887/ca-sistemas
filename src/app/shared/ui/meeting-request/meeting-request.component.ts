import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../i18n/language.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { IconComponent } from '../icon/icon.component';

export interface MeetingPlatform {
  readonly slug: string;
  readonly label: string;
}

@Component({
  selector: 'app-meeting-request',
  imports: [ReactiveFormsModule, TranslatePipe, IconComponent],
  templateUrl: './meeting-request.component.html',
  styleUrl: './meeting-request.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingRequestComponent {
  readonly platforms = input.required<readonly MeetingPlatform[]>();
  readonly whatsappUrl = input.required<string>();
  readonly heading = input.required<string>();
  readonly description = input.required<string>();
  private readonly builder = inject(NonNullableFormBuilder);
  private readonly document = inject(DOCUMENT);
  private readonly language = inject(LanguageService);
  protected readonly prepared = signal(false);
  protected readonly form = this.builder.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s()-]{7,20}$/)]],
    platform: ['', Validators.required],
    contactPermission: [false, Validators.requiredTrue],
  });

  protected invalid(field: keyof typeof this.form.controls): boolean {
    return this.form.controls[field].touched && this.form.controls[field].invalid;
  }

  protected submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const { email, phone, platform } = this.form.getRawValue();
    const selected = this.platforms().find(item => item.slug === platform);
    if (!selected) {
      this.form.controls.platform.setErrors({ unknownPlatform: true });
      return;
    }
    const text = [
      this.language.translate('Hola, quiero agendar una reunión sobre {platform}.', { platform: this.language.translate(selected.label) }),
      this.language.translate('Correo: {email}', { email: email.trim() }),
      this.language.translate('Celular: {phone}', { phone: phone.trim() }),
    ].join('\n');
    this.document.defaultView?.open(`${this.whatsappUrl()}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    this.prepared.set(true);
  }
}
