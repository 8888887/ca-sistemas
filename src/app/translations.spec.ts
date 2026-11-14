import { ALL_SOLUTIONS, SERVICE_GROUPS } from './core/config/solutions.data';
import { CERTIFICATIONS, SECTORS, TESTIMONIALS } from './features/home/data/home.data';
import { EN_TRANSLATIONS } from './shared/i18n/en';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from './features/blog/data/blog.data';
import { ATTENDANCE_BENEFITS, PAYROLL_FAQS, REPORTING_BENEFITS } from './features/soluciones/plataformas/planillas-y-control-de-asistencia/data/planillas-y-control-de-asistencia.data';
import { SAFETY_FAQS, SAFETY_FEATURES } from './features/soluciones/plataformas/salud-y-seguridad-ocupacional/data/salud-y-seguridad-ocupacional.data';
import { TALENT_FAQS, TALENT_FEATURES } from './features/soluciones/plataformas/gestion-del-talento-humano/data/gestion-del-talento-humano.data';
import { HARASSMENT_FAQS, HARASSMENT_FEATURES } from './features/soluciones/plataformas/hostigamiento-laboral-y-sexual/data/hostigamiento-laboral-y-sexual.data';
import { LEARNING_FAQS, LEARNING_FEATURES } from './features/soluciones/plataformas/e-learning/data/e-learning.data';
import { ABOUT_DIFFERENTIATORS, ABOUT_EXPERIENCE, ABOUT_HISTORY, ABOUT_PURPOSES, ABOUT_SERVICES, ABOUT_TEAM_IMAGES, ABOUT_VALUES } from './features/nosotros/data/nosotros.data';
import { AUDIT_BENEFITS, AUDIT_FAQS, AUDIT_REVIEW_AREAS } from './features/soluciones/servicios-adicionales/recursos-humanos/auditoria-laboral/data/auditoria-laboral.data';
import { LAW_FAQS, LAW_FEATURES } from './features/soluciones/servicios-adicionales/recursos-humanos/ley-30709/data/ley-30709.data';
import { ANALYTICS_BENEFITS, ANALYTICS_FAQS, ANALYTICS_FEATURES } from './features/soluciones/servicios-adicionales/recursos-humanos/hr-analytics/data/hr-analytics.data';
import { PAYROLL_SERVICE_BENEFITS, PAYROLL_SERVICE_FAQS, PAYROLL_SERVICE_FEATURES } from './features/soluciones/servicios-adicionales/recursos-humanos/payroll/data/payroll.data';
import { PERFORMANCE_BENEFITS, PERFORMANCE_FAQS } from './features/soluciones/servicios-adicionales/recursos-humanos/evaluacion-de-desempeno/data/evaluacion-de-desempeno.data';
import { CLIMATE_SURVEY_BENEFITS, CLIMATE_SURVEY_FAQS } from './features/soluciones/servicios-adicionales/recursos-humanos/encuesta-de-clima-laboral/data/encuesta-de-clima-laboral.data';
import { DIGITAL_SIGNATURE_BENEFITS, DIGITAL_SIGNATURE_FAQS } from './features/soluciones/servicios-adicionales/gestion-empresarial/firmas-digitales-certificadas/data/firmas-digitales-certificadas.data';
import { PROCESS_BENEFITS, PROCESS_FAQS, PROCESS_OVERVIEW } from './features/soluciones/servicios-adicionales/gestion-empresarial/mejora-de-procesos/data/mejora-de-procesos.data';
import { TECHNOLOGY_CONSULTING_BENEFITS, TECHNOLOGY_CONSULTING_FAQS } from './features/soluciones/servicios-adicionales/tecnologia-y-seguridad/consultoria-en-tecnologia/data/consultoria-en-tecnologia.data';
import { DATABASE_BENEFITS, DATABASE_FAQS, DATABASE_OVERVIEW } from './features/soluciones/servicios-adicionales/tecnologia-y-seguridad/gestion-de-base-de-datos/data/gestion-de-base-de-datos.data';
import { PENTESTING_BENEFITS, PENTESTING_FAQS, PENTESTING_OVERVIEW } from './features/soluciones/servicios-adicionales/tecnologia-y-seguridad/pentesting/data/pentesting.data';
import { DATA_CENTER_BENEFITS, DATA_CENTER_FAQS, DATA_CENTER_HERO_DESCRIPTION, DATA_CENTER_OVERVIEW } from './features/soluciones/servicios-adicionales/tecnologia-y-seguridad/data-center/data/data-center.data';
import { BACKUP_BENEFITS, BACKUP_FAQS, BACKUP_OVERVIEW } from './features/soluciones/servicios-adicionales/tecnologia-y-seguridad/backup-empresarial/data/backup-empresarial.data';

describe('Site translations', () => {
  it('covers every catalog description and translatable data label', () => {
    const unchanged = new Set(['E-Learning', 'HR Analytics']);
    const sources = [
      ...BLOG_ARTICLES.flatMap(article => [article.title, article.excerpt, article.body]),
      ...BLOG_CATEGORIES.map(category => category.label),
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
      ...AUDIT_REVIEW_AREAS.flatMap(area => [area.title, area.description]),
      ...AUDIT_BENEFITS,
      ...AUDIT_FAQS.flatMap(item => [item.question, item.answer]),
      ...LAW_FEATURES.flatMap(item => [item.title, item.description, item.imageAlt]),
      ...LAW_FAQS.flatMap(item => [item.question, item.answer]),
      ...ANALYTICS_BENEFITS,
      ...ANALYTICS_FEATURES.flatMap(item => [item.title, item.description, item.imageAlt]),
      ...ANALYTICS_FAQS.flatMap(item => [item.question, item.answer]),
      ...PAYROLL_SERVICE_BENEFITS,
      ...PAYROLL_SERVICE_FEATURES.flatMap(item => [item.title, item.description, item.imageAlt]),
      ...PAYROLL_SERVICE_FAQS.flatMap(item => [item.question, item.answer]),
      ...PERFORMANCE_BENEFITS.flatMap(item => [item.title, item.description]),
      ...PERFORMANCE_FAQS.flatMap(item => [item.question, item.answer]),
      ...CLIMATE_SURVEY_BENEFITS.flatMap(item => [item.title, item.description]),
      ...CLIMATE_SURVEY_FAQS.flatMap(item => [item.question, item.answer]),
      ...DIGITAL_SIGNATURE_BENEFITS.flatMap(item => [item.title, item.description]),
      ...DIGITAL_SIGNATURE_FAQS.flatMap(item => [item.question, item.answer]),
      ...PROCESS_OVERVIEW,
      ...PROCESS_BENEFITS.flatMap(item => [item.title, item.description]),
      ...PROCESS_FAQS.flatMap(item => [item.question, item.answer]),
      ...TECHNOLOGY_CONSULTING_BENEFITS.flatMap(item => [item.title, item.description]),
      ...TECHNOLOGY_CONSULTING_FAQS.flatMap(item => [item.question, item.answer]),
      ...DATABASE_OVERVIEW,
      ...DATABASE_BENEFITS.flatMap(item => [item.title, item.description]),
      ...DATABASE_FAQS.flatMap(item => [item.question, item.answer]),
      PENTESTING_OVERVIEW,
      ...PENTESTING_BENEFITS.flatMap(item => [item.title, item.description]),
      ...PENTESTING_FAQS.flatMap(item => [item.question, item.answer]),
      DATA_CENTER_HERO_DESCRIPTION,
      ...DATA_CENTER_OVERVIEW,
      ...DATA_CENTER_BENEFITS.flatMap(item => [item.title, item.description]),
      ...DATA_CENTER_FAQS.flatMap(item => [item.question, item.answer]),
      BACKUP_OVERVIEW,
      ...BACKUP_BENEFITS.flatMap(item => [item.title, item.description]),
      ...BACKUP_FAQS.flatMap(item => [item.question, item.answer]),
    ];
    for (const source of sources) expect(unchanged.has(source) || Object.hasOwn(EN_TRANSLATIONS, source)).withContext(source).toBeTrue();
  });
});
