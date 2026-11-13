import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FloatingMenuComponent } from './floating-menu.component';

describe('FloatingMenuComponent', () => {
  let fixture: ComponentFixture<FloatingMenuComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FloatingMenuComponent], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(FloatingMenuComponent);
    fixture.detectChanges();
    host = fixture.nativeElement;
  });

  it('shows all five platform links by default', () => {
    expect(host.querySelectorAll('.platform-links a').length).toBe(5);
    expect(host.querySelector('.service-links')).toBeNull();
  });

  it('switches categories and all three service groups with click', () => {
    host.querySelector<HTMLButtonElement>('.categories button:nth-child(2)')!.click();
    fixture.detectChanges();
    expect(host.querySelectorAll('.service-links a').length).toBe(6);
    host.querySelector<HTMLButtonElement>('.service-groups button:nth-child(2)')!.click();
    fixture.detectChanges();
    expect(host.querySelectorAll('.service-links a').length).toBe(2);
    expect(host.querySelector('.service-links')!.textContent).toContain('Firmas Digitales Certificadas');
    host.querySelector<HTMLButtonElement>('.service-groups button:nth-child(3)')!.click();
    fixture.detectChanges();
    expect(host.querySelectorAll('.service-links a').length).toBe(5);
    expect(host.querySelector('.service-links')!.textContent).toContain('Backup de Base de Datos Empresarial');
  });

  it('supports pointer hover without changing categories on keyboard focus alone', () => {
    host.querySelector('.categories button:nth-child(2)')!.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    host.querySelector('.service-groups button:nth-child(2)')!.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(host.querySelectorAll('.service-links a').length).toBe(6);
    host.querySelector<HTMLButtonElement>('.service-groups button:nth-child(2)')!.click();
    fixture.detectChanges();
    expect(host.querySelectorAll('.service-links a').length).toBe(2);
    expect(host.querySelector('.service-groups button:nth-child(2)')!.getAttribute('aria-expanded')).toBe('true');
  });
});
