import { ALL_SOLUTIONS, SERVICE_GROUPS } from './core/config/solutions.data';
import { CERTIFICATIONS, SECTORS, TESTIMONIALS } from './features/home/data/home.data';
import { EN_TRANSLATIONS } from './shared/i18n/en';
import { ATTENDANCE_BENEFITS, PAYROLL_FAQS, REPORTING_BENEFITS } from './features/soluciones/plataformas/planillas-y-control-de-asistencia/data/planillas-y-control-de-asistencia.data';
import { SAFETY_FAQS, SAFETY_FEATURES } from './features/soluciones/plataformas/salud-y-seguridad-ocupacional/data/salud-y-seguridad-ocupacional.data';
import { TALENT_FAQS, TALENT_FEATURES } from './features/soluciones/plataformas/gestion-del-talento-humano/data/gestion-del-talento-humano.data';
import { HARASSMENT_FAQS, HARASSMENT_FEATURES } from './features/soluciones/plataformas/hostigamiento-laboral-y-sexual/data/hostigamiento-laboral-y-sexual.data';
import { LEARNING_FAQS, LEARNING_FEATURES } from './features/soluciones/plataformas/e-learning/data/e-learning.data';
import { ABOUT_DIFFERENTIATORS, ABOUT_EXPERIENCE, ABOUT_HISTORY, ABOUT_PURPOSES, ABOUT_SERVICES, ABOUT_TEAM_IMAGES, ABOUT_VALUES } from './features/nosotros/data/nosotros.data';

describe('Site translations', () => {
  it('covers every catalog description and translatable data label', () => {
    const unchanged = new Set(['E-Learning', 'HR Analytics']);
    const sources = [
      ...ALL_SOLUTIONS.flatMap(item => [item.label, item.description]),
      ...SERVICE_GROUPS.map(group => group.label),
      ...SECTORS.map(sector => sector.name),
      ...TESTIMONIALS.map(item => item.sector),
      ...CERTIFICATIONS.map(item => item.description),
      ...ATTENDANCE_BENEFITS,
      ...REPORTING_BENEFITS,
      ...PAYROLL_FAQS.flatMap(item => [item.question, item.answer]),
      ...SAFETY_FEATURES.flatMap(item => [item.title, item.description, item.imageAlt]),
      ...SAFETY_FAQS.flatMap(item => [item.question, item.answer]),
      ...TALENT_FEATURES.flatMap(item => [item.title, item.imageAlt, ...item.benefits]),
      ...TALENT_FAQS.flatMap(item => [item.question, item.answer]),
      ...HARASSMENT_FEATURES.flatMap(item => [item.title, item.imageAlt, ...item.benefits]),
      ...HARASSMENT_FAQS.flatMap(item => [item.question, item.answer]),
      ...LEARNING_FEATURES.flatMap(item => [item.title, item.imageAlt, ...item.benefits]),
      ...LEARNING_FAQS.flatMap(item => [item.question, item.answer]),
      ABOUT_HISTORY, ABOUT_EXPERIENCE, ABOUT_DIFFERENTIATORS,
      ...ABOUT_PURPOSES.flatMap(item => [item.title, ...item.copy.map(part => part.text)]),
      ...ABOUT_VALUES.flatMap(item => [item.title, ...item.copy.map(part => part.text)]),
      ...ABOUT_SERVICES.flatMap(item => [item.title, item.description]),
      ...ABOUT_TEAM_IMAGES.map(image => image.alt),
    ];
    for (const source of sources) expect(unchanged.has(source) || Object.hasOwn(EN_TRANSLATIONS, source)).withContext(source).toBeTrue();
  });
});
