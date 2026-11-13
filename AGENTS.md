# Convenciones del proyecto

- Cada pantalla y componente debe tener sus propios archivos `.component.ts`, `.component.html` y `.component.css`. Usar `templateUrl` y `styleUrl`; no escribir plantillas ni estilos inline.
- Organizar por funcionalidad en `src/app/features/<feature>`. Las pantallas van en `pages/`, las secciones exclusivas de esa funcionalidad en `components/` y sus datos en `data/`.
- Para las pantallas de plataformas, seguir la estructura solicitada: `features/soluciones/plataformas/<slug>/`, con los archivos `.component.ts`, `.component.html` y `.component.css` directamente en su carpeta. Registrar estas pantallas en `plataformas.routes.ts`; sus datos y componentes exclusivos permanecen dentro de esa misma funcionalidad.
- Mantener header, footer y menú flotante reutilizables en `src/app/core/layout/`. No copiarlos en las pantallas.
- Usar `shared/ui/` para componentes de presentación reutilizables y `shared/models/` para sus tipos. `shared/` no debe importar desde `features/` ni `core/`.
- Centralizar el catálogo de soluciones en `core/config/solutions.data.ts`; el menú, footer y rutas deben reutilizar ese catálogo.
- Crear componentes standalone con `ChangeDetectionStrategy.OnPush`. Preferir signals para estado local y rutas con `loadComponent` para pantallas.
- Mantener estilos generales y variables en `src/styles.css`; los estilos específicos pertenecen al CSS del componente.
- Usar `px` para las medidas fijas de los estilos: tamaños de fuente, espacios, bordes y límites de tamaño. No usar `rem`, `em` ni unidades del viewport para esas medidas. Mantener tamaños en píxeles por breakpoint y conservar las proporciones del layout adaptable.
- Conservar navegación accesible mediante teclado, foco visible, controles nativos y adaptación móvil.
- No inventar testimonios, publicaciones, datos comerciales ni confirmar envíos sin un servicio real.
- Mantener español e inglés: usar `TranslatePipe` para textos de interfaz y agregar su traducción en `shared/i18n/en.ts`. Conservar nombres comerciales, identificadores de rutas y datos escritos por el visitante. No insertar rótulos de interfaz en imágenes.
- Verificar con `npm.cmd run build` y, al modificar interacciones, `npm.cmd test -- --watch=false --browsers=ChromeHeadless`. En otros sistemas se puede usar `npm`.
