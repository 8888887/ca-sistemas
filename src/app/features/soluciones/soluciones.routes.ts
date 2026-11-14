import { Routes } from '@angular/router';
import { ALL_SOLUTIONS } from '../../core/config/solutions.data';
import { PLATAFORMAS_ROUTES } from './plataformas/plataformas.routes';
import { SERVICIOS_ADICIONALES_ROUTES } from './servicios-adicionales/servicios-adicionales.routes';

const dedicatedRoutes = [...PLATAFORMAS_ROUTES, ...SERVICIOS_ADICIONALES_ROUTES];
const dedicatedPages = new Set(dedicatedRoutes.map(route => route.path));

export const SOLUCIONES_ROUTES: Routes = [
  ...dedicatedRoutes,
  ...ALL_SOLUTIONS.filter(solution => !dedicatedPages.has(solution.slug)).map(solution => ({
    path: solution.slug,
    title: `${solution.label} | CA Sistemas`,
    data: { solution },
    loadComponent: () => import('../solutions/pages/solution/solution.component').then(module => module.SolutionComponent),
  })),
];
