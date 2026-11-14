import { Routes } from '@angular/router';
import { SERVICE_GROUPS } from '../../../../core/config/solutions.data';

const audit = SERVICE_GROUPS.find(group => group.id === 'recursos-humanos')!.items.find(service => service.slug === 'auditoria-laboral')!;
const payEquity = SERVICE_GROUPS.find(group => group.id === 'recursos-humanos')!.items.find(service => service.slug === 'ley-30709')!;
const analytics = SERVICE_GROUPS.find(group => group.id === 'recursos-humanos')!.items.find(service => service.slug === 'hr-analytics')!;
const payroll = SERVICE_GROUPS.find(group => group.id === 'recursos-humanos')!.items.find(service => service.slug === 'payroll')!;
const performance = SERVICE_GROUPS.find(group => group.id === 'recursos-humanos')!.items.find(service => service.slug === 'evaluacion-de-desempeno')!;
const climateSurvey = SERVICE_GROUPS.find(group => group.id === 'recursos-humanos')!.items.find(service => service.slug === 'encuesta-de-clima-laboral')!;

export const RECURSOS_HUMANOS_ROUTES: Routes = [
  {
    path: climateSurvey.slug,
    title: `${climateSurvey.label} | CA Sistemas`,
    data: { solution: climateSurvey },
    loadComponent: () => import('./encuesta-de-clima-laboral/pages/encuesta-de-clima-laboral/encuesta-de-clima-laboral.component').then(module => module.EncuestaDeClimaLaboralComponent),
  },
  {
    path: performance.slug,
    title: `${performance.label} | CA Sistemas`,
    data: { solution: performance },
    loadComponent: () => import('./evaluacion-de-desempeno/pages/evaluacion-de-desempeno/evaluacion-de-desempeno.component').then(module => module.EvaluacionDeDesempenoComponent),
  },
  {
    path: payroll.slug,
    title: `${payroll.label} | CA Sistemas`,
    data: { solution: payroll },
    loadComponent: () => import('./payroll/pages/payroll/payroll.component').then(module => module.PayrollServiceComponent),
  },
  {
    path: analytics.slug,
    title: `${analytics.label} | CA Sistemas`,
    data: { solution: analytics },
    loadComponent: () => import('./hr-analytics/pages/hr-analytics/hr-analytics.component').then(module => module.HrAnalyticsComponent),
  },
  {
    path: payEquity.slug,
    title: `${payEquity.label} | CA Sistemas`,
    data: { solution: payEquity },
    loadComponent: () => import('./ley-30709/pages/ley-30709/ley-30709.component').then(module => module.Ley30709Component),
  },
  {
    path: audit.slug,
    title: `${audit.label} | CA Sistemas`,
    data: { solution: audit },
    loadComponent: () => import('./auditoria-laboral/pages/auditoria-laboral/auditoria-laboral.component').then(module => module.AuditoriaLaboralComponent),
  },
];
