import { Routes } from '@angular/router';
import { SERVICE_GROUPS } from '../../../../core/config/solutions.data';

const technologyConsulting = SERVICE_GROUPS.find(group => group.id === 'tecnologia-y-seguridad')!.items.find(service => service.slug === 'consultoria-en-tecnologia')!;
const databaseManagement = SERVICE_GROUPS.find(group => group.id === 'tecnologia-y-seguridad')!.items.find(service => service.slug === 'gestion-de-base-de-datos')!;
const pentesting = SERVICE_GROUPS.find(group => group.id === 'tecnologia-y-seguridad')!.items.find(service => service.slug === 'pentesting')!;
const dataCenter = SERVICE_GROUPS.find(group => group.id === 'tecnologia-y-seguridad')!.items.find(service => service.slug === 'data-center')!;
const enterpriseBackup = SERVICE_GROUPS.find(group => group.id === 'tecnologia-y-seguridad')!.items.find(service => service.slug === 'backup-empresarial')!;

export const TECNOLOGIA_Y_SEGURIDAD_ROUTES: Routes = [
  {
    path: enterpriseBackup.slug,
    title: `${enterpriseBackup.label} | CA Sistemas`,
    data: { solution: enterpriseBackup },
    loadComponent: () => import('./backup-empresarial/pages/backup-empresarial/backup-empresarial.component').then(module => module.BackupEmpresarialComponent),
  },
  {
    path: dataCenter.slug,
    title: `${dataCenter.label} | CA Sistemas`,
    data: { solution: dataCenter },
    loadComponent: () => import('./data-center/pages/data-center/data-center.component').then(module => module.DataCenterComponent),
  },
  {
    path: pentesting.slug,
    title: `${pentesting.label} | CA Sistemas`,
    data: { solution: pentesting },
    loadComponent: () => import('./pentesting/pages/pentesting/pentesting.component').then(module => module.PentestingComponent),
  },
  {
    path: databaseManagement.slug,
    title: `${databaseManagement.label} | CA Sistemas`,
    data: { solution: databaseManagement },
    loadComponent: () => import('./gestion-de-base-de-datos/pages/gestion-de-base-de-datos/gestion-de-base-de-datos.component').then(module => module.GestionDeBaseDeDatosComponent),
  },
  {
    path: technologyConsulting.slug,
    title: `${technologyConsulting.label} | CA Sistemas`,
    data: { solution: technologyConsulting },
    loadComponent: () => import('./consultoria-en-tecnologia/pages/consultoria-en-tecnologia/consultoria-en-tecnologia.component').then(module => module.ConsultoriaEnTecnologiaComponent),
  },
];
