import { TranslatePipe } from '../../../shared/i18n/translate.pipe';
import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { FloatingMenuComponent } from '../floating-menu/floating-menu.component';
import { BrandLogoComponent } from '../../../shared/ui/brand-logo/brand-logo.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { CONTACT } from '../../config/contact.config';
import { LanguageSwitcherComponent } from '../../../shared/ui/language-switcher/language-switcher.component';

@Component({
  selector: 'app-site-header',
  imports: [TranslatePipe, RouterLink, FloatingMenuComponent, BrandLogoComponent, IconComponent, LanguageSwitcherComponent],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeMenu(true)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class SiteHeaderComponent {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('solutionsTrigger');
  protected readonly menuOpen = signal(false);
  protected readonly mobileOpen = signal(false);
  protected readonly contact = CONTACT;

  constructor() {
    inject(Router).events.pipe(filter(event => event instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => { this.menuOpen.set(false); this.mobileOpen.set(false); });
  }

  protected toggleMenu(): void { this.menuOpen.update(value => !value); }

  protected openMenu(event: Event): void {
    event.preventDefault();
    this.menuOpen.set(true);
    setTimeout(() => this.element.nativeElement.querySelector<HTMLElement>('app-floating-menu button')?.focus());
  }

  protected closeMenu(restoreFocus = false): void {
    const wasOpen = this.menuOpen();
    this.menuOpen.set(false);
    if (restoreFocus && wasOpen) this.trigger()?.nativeElement.focus();
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.element.nativeElement.contains(event.target as Node)) {
      this.closeMenu();
      this.mobileOpen.set(false);
    }
  }

  protected onFocusOut(event: FocusEvent): void {
    if (event.relatedTarget && !this.element.nativeElement.contains(event.relatedTarget as Node)) {
      this.closeMenu();
      this.mobileOpen.set(false);
    }
  }

  protected toggleMobile(): void {
    this.mobileOpen.update(value => !value);
    if (!this.mobileOpen()) this.closeMenu();
  }
}
