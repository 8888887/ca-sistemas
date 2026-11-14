import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LANGUAGE_STORAGE_KEY, LanguageService } from '../../i18n/language.service';
import { MeetingRequestComponent } from './meeting-request.component';

describe('MeetingRequestComponent', () => {
  let fixture: ComponentFixture<MeetingRequestComponent>;
  let host: HTMLElement;
  let previousLanguage: string | null;

  beforeEach(async () => {
    previousLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    await TestBed.configureTestingModule({ imports: [MeetingRequestComponent] }).compileComponents();
    fixture = TestBed.createComponent(MeetingRequestComponent);
    fixture.componentRef.setInput('platforms', [{ slug: 'planillas', label: 'Planillas y Control de Asistencia' }]);
    fixture.componentRef.setInput('whatsappUrl', 'https://wa.me/51967367101');
    fixture.componentRef.setInput('heading', 'Una gestión más ordenada empieza aquí.');
    fixture.componentRef.setInput('description', 'Cuéntanos qué necesitas.');
    fixture.detectChanges();
    host = fixture.nativeElement;
  });

  afterEach(() => {
    if (previousLanguage === null) localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    else localStorage.setItem(LANGUAGE_STORAGE_KEY, previousLanguage);
    document.documentElement.lang = 'es-PE';
  });

  const submit = () => host.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  const fill = (selector: string, value: string, event = 'input') => {
    const field = host.querySelector<HTMLInputElement | HTMLSelectElement>(selector)!;
    field.value = value;
    field.dispatchEvent(new Event(event));
  };

  it('blocks an empty request and marks all required fields', () => {
    const open = spyOn(window, 'open');
    submit();
    fixture.detectChanges();
    expect(open).not.toHaveBeenCalled();
    expect(host.querySelectorAll('[aria-invalid="true"]').length).toBe(4);
  });

  it('supports service choices and translates their label and validation without losing the selection', () => {
    const open = spyOn(window, 'open');
    fixture.componentRef.setInput('platforms', [{ slug: 'auditoria-laboral', label: 'Auditoría Laboral' }]);
    fixture.componentRef.setInput('selectionLabel', '¿Qué servicio necesitas?');
    fixture.componentRef.setInput('selectionError', 'Selecciona un servicio.');
    fixture.detectChanges();
    submit();
    fixture.detectChanges();
    expect(host.querySelector('label[for="meeting-platform"]')!.textContent).toBe('¿Qué servicio necesitas?');
    expect(host.querySelector('#meeting-platform-error')!.textContent).toContain('Selecciona un servicio.');
    fill('#meeting-email', 'ana@example.com');
    fill('#meeting-phone', '+51 999 888 777');
    fill('#meeting-platform', 'auditoria-laboral', 'change');
    host.querySelector<HTMLInputElement>('#meeting-permission')!.click();
    TestBed.inject(LanguageService).setLanguage('en');
    fixture.detectChanges();
    expect(host.querySelector('label[for="meeting-platform"]')!.textContent).toBe('Which service do you need?');
    expect(host.querySelector<HTMLSelectElement>('#meeting-platform')!.value).toBe('auditoria-laboral');
    submit();
    expect(open).toHaveBeenCalledTimes(1);
    const destination = new URL(String(open.calls.mostRecent().args[0]));
    expect(destination.searchParams.get('text')).toContain('Labor Audit');
  });

  it('requires valid contact details and permission before preparing the meeting', () => {
    const open = spyOn(window, 'open');
    fill('#meeting-email', 'invalid');
    fill('#meeting-phone', '+51 999 888 777');
    fill('#meeting-platform', 'planillas', 'change');
    submit();
    expect(open).not.toHaveBeenCalled();
    fill('#meeting-email', 'ana@example.com');
    submit();
    expect(open).not.toHaveBeenCalled();
    host.querySelector<HTMLInputElement>('#meeting-permission')!.click();
    submit();
    fixture.detectChanges();
    expect(open).toHaveBeenCalledTimes(1);
    const destination = new URL(String(open.calls.mostRecent().args[0]));
    expect(destination.origin + destination.pathname).toBe('https://wa.me/51967367101');
    expect(destination.searchParams.get('text')).toContain('Planillas y Control de Asistencia');
    expect(destination.searchParams.get('text')).toContain('ana@example.com');
    expect(host.querySelector('[role="status"]')!.textContent).toContain('Confirma el envío');
  });

  it('keeps entered data and prepares the selected platform in English', () => {
    const open = spyOn(window, 'open');
    fill('#meeting-email', 'ana@example.com');
    fill('#meeting-phone', '+51 999 888 777');
    fill('#meeting-platform', 'planillas', 'change');
    host.querySelector<HTMLInputElement>('#meeting-permission')!.click();
    TestBed.inject(LanguageService).setLanguage('en');
    fixture.detectChanges();
    expect(host.querySelector<HTMLInputElement>('#meeting-email')!.value).toBe('ana@example.com');
    expect(host.querySelector('h2')!.textContent).toBe('More organized management starts here.');
    submit();
    const destination = new URL(String(open.calls.mostRecent().args[0]));
    expect(destination.searchParams.get('text')).toContain('schedule a meeting about Payroll and Attendance Control');
    expect(host.querySelector<HTMLSelectElement>('#meeting-platform')!.value).toBe('planillas');
  });
});
