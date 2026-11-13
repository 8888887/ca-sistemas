import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let fixture: ComponentFixture<ContactFormComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContactFormComponent] }).compileComponents();
    fixture = TestBed.createComponent(ContactFormComponent);
    fixture.componentRef.setInput('whatsappUrl', 'https://wa.me/51967367101');
    fixture.detectChanges();
    host = fixture.nativeElement;
  });

  const submit = () => host.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  const fill = (selector: string, value: string) => {
    const field = host.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!;
    field.value = value;
    field.dispatchEvent(new Event('input'));
  };

  it('does not open WhatsApp for an empty or invalid form', () => {
    const open = spyOn(window, 'open');
    fill('#contact-name', '  ');
    fill('#contact-phone', 'invalid-phone');
    submit();
    fixture.detectChanges();
    expect(open).not.toHaveBeenCalled();
    expect(host.querySelectorAll('[aria-invalid="true"]').length).toBe(4);
  });

  it('prepares the validated consultation in WhatsApp without claiming it was sent', () => {
    const open = spyOn(window, 'open');
    fill('#contact-name', 'Ana Pérez');
    fill('#contact-phone', '+51 999 888 777');
    fill('#contact-company', 'Empresa & Asociados');
    fill('#contact-message', 'Quiero automatizar mis planillas.');
    submit();
    fixture.detectChanges();
    expect(open).toHaveBeenCalledTimes(1);
    const url = String(open.calls.mostRecent().args[0]);
    expect(url.startsWith('https://wa.me/51967367101?text=')).toBeTrue();
    expect(decodeURIComponent(url)).toContain('Empresa & Asociados');
    expect(decodeURIComponent(url)).toContain('Quiero automatizar mis planillas.');
    expect(host.querySelector('[role="status"]')!.textContent).toContain('Confirma el envío');
  });
});
