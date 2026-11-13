import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('renders the shared header, footer and page outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-site-header')).not.toBeNull();
    expect(compiled.querySelector('app-site-footer')).not.toBeNull();
    expect(compiled.querySelector('main router-outlet')).not.toBeNull();
  });

  it('closes the floating menu on Escape and returns focus to its trigger', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const trigger = host.querySelector<HTMLButtonElement>('.solutions-trigger')!;
    trigger.click();
    fixture.detectChanges();
    expect(host.querySelector('app-floating-menu')).not.toBeNull();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(host.querySelector('app-floating-menu')).toBeNull();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the floating menu when clicking outside the header', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    host.querySelector<HTMLButtonElement>('.solutions-trigger')!.click();
    fixture.detectChanges();
    host.querySelector<HTMLElement>('main')!.click();
    fixture.detectChanges();
    expect(host.querySelector('app-floating-menu')).toBeNull();
  });
});
