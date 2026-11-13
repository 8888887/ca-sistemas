import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', title: 'Software de Recursos Humanos | CA Sistemas', loadComponent: () => import('./features/home/pages/home/home.component').then(module => module.HomeComponent) },
  { path: 'soluciones', loadChildren: () => import('./features/soluciones/soluciones.routes').then(module => module.SOLUCIONES_ROUTES) },
  { path: 'blog', title: 'Blog | CA Sistemas', loadComponent: () => import('./features/blog/pages/blog/blog.component').then(module => module.BlogComponent) },
  { path: 'nosotros', title: 'Nosotros | CA Sistemas', loadComponent: () => import('./features/nosotros/pages/nosotros/nosotros.component').then(module => module.NosotrosComponent) },
  { path: '**', title: 'Página no encontrada | CA Sistemas', loadComponent: () => import('./features/not-found/not-found.component').then(module => module.NotFoundComponent) },
];
