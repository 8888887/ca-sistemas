import { Routes } from '@angular/router';
import { RECURSOS_HUMANOS_ROUTES } from './recursos-humanos/recursos-humanos.routes';
import { GESTION_EMPRESARIAL_ROUTES } from './gestion-empresarial/gestion-empresarial.routes';
import { TECNOLOGIA_Y_SEGURIDAD_ROUTES } from './tecnologia-y-seguridad/tecnologia-y-seguridad.routes';

export const SERVICIOS_ADICIONALES_ROUTES: Routes = [...RECURSOS_HUMANOS_ROUTES, ...GESTION_EMPRESARIAL_ROUTES, ...TECNOLOGIA_Y_SEGURIDAD_ROUTES];
