import { Routes } from '@angular/router';
import { SERVICE_GROUPS } from '../../../../core/config/solutions.data';

const digitalSignatures = SERVICE_GROUPS.find(group => group.id === 'gestion-empresarial')!.items.find(service => service.slug === 'firmas-digitales-certificadas')!;
const processImprovement = SERVICE_GROUPS.find(group => group.id === 'gestion-empresarial')!.items.find(service => service.slug === 'mejora-de-procesos')!;

export const GESTION_EMPRESARIAL_ROUTES: Routes = [
  {
    path: processImprovement.slug,
    title: `${processImprovement.label} | CA Sistemas`,
    data: { solution: processImprovement },
    loadComponent: () => import('./mejora-de-procesos/pages/mejora-de-procesos/mejora-de-procesos.component').then(module => module.MejoraDeProcesosComponent),
  },
  {
    path: digitalSignatures.slug,
    title: `${digitalSignatures.label} | CA Sistemas`,
    data: { solution: digitalSignatures },
    loadComponent: () => import('./firmas-digitales-certificadas/pages/firmas-digitales-certificadas/firmas-digitales-certificadas.component').then(module => module.FirmasDigitalesCertificadasComponent),
  },
];
