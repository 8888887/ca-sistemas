import { Routes } from '@angular/router';
import { PLATFORM_SOLUTIONS } from '../../../core/config/solutions.data';

const payroll = PLATFORM_SOLUTIONS.find(solution => solution.slug === 'planillas-y-control-de-asistencia')!;
const occupationalHealth = PLATFORM_SOLUTIONS.find(solution => solution.slug === 'salud-y-seguridad-ocupacional')!;
const talent = PLATFORM_SOLUTIONS.find(solution => solution.slug === 'gestion-del-talento-humano')!;
const harassment = PLATFORM_SOLUTIONS.find(solution => solution.slug === 'hostigamiento-laboral-y-sexual')!;
const learning = PLATFORM_SOLUTIONS.find(solution => solution.slug === 'e-learning')!;

export const PLATAFORMAS_ROUTES: Routes = [
  {
    path: harassment.slug,
    title: `${harassment.label} | CA Sistemas`,
    data: { solution: harassment },
    loadComponent: () => import('./hostigamiento-laboral-y-sexual/hostigamiento-laboral-y-sexual.component').then(module => module.HostigamientoLaboralYSexualComponent),
  },
  {
    path: payroll.slug,
    title: `${payroll.label} | CA Sistemas`,
    data: { solution: payroll },
    loadComponent: () => import('./planillas-y-control-de-asistencia/planillas-y-control-de-asistencia.component').then(module => module.PlanillasYControlDeAsistenciaComponent),
  },
  {
    path: occupationalHealth.slug,
    title: `${occupationalHealth.label} | CA Sistemas`,
    data: { solution: occupationalHealth },
    loadComponent: () => import('./salud-y-seguridad-ocupacional/salud-y-seguridad-ocupacional.component').then(module => module.SaludYSeguridadOcupacionalComponent),
  },
  {
    path: talent.slug,
    title: `${talent.label} | CA Sistemas`,
    data: { solution: talent },
    loadComponent: () => import('./gestion-del-talento-humano/gestion-del-talento-humano.component').then(module => module.GestionDelTalentoHumanoComponent),
  },
  {
    path: learning.slug,
    title: `${learning.label} | CA Sistemas`,
    data: { solution: learning },
    loadComponent: () => import('./e-learning/e-learning.component').then(module => module.ELearningComponent),
  },
];
