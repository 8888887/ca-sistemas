import { Routes } from '@angular/router';
import { ALL_SOLUTIONS } from '../../core/config/solutions.data';
import { PLATAFORMAS_ROUTES } from './plataformas/plataformas.routes';

const dedicatedPages = new Set(PLATAFORMAS_ROUTES.map(route => route.path));

export const SOLUCIONES_ROUTES: Routes = [
  ...PLATAFORMAS_ROUTES,
  ...ALL_SOLUTIONS.filter(solution => !dedicatedPages.has(solution.slug)).map(solution => ({
    path: solution.slug,
    title: `${solution.label} | CA Sistemas`,
    data: { solution },
    loadComponent: () => import('../solutions/pages/solution/solution.component').then(module => module.SolutionComponent),
  })),
];
