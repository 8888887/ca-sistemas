# CA Sistemas Empresariales

Sitio Angular 20 con componentes standalone, pantallas de carga diferida y estilos CSS. La portada y el menú de soluciones siguen las referencias proporcionadas.

## Desarrollo

```sh
npm install
npm start
```

Abrir `http://localhost:4200`. En PowerShell, si la política de ejecución bloquea `npm.ps1`, usar `npm.cmd`.

## Publicar con GitHub y Netlify

El archivo `netlify.toml` configura `npm run build`, publica `dist/ca-sistemas/browser` y utiliza Node.js 22. Incluye una reescritura hacia `index.html` para que las rutas de Angular funcionen al abrirlas directamente o recargar la página.

Subir el código fuente y `package-lock.json` a GitHub; las carpetas `node_modules`, `dist`, `artifacts` y `.netlify` están excluidas por `.gitignore`. En Netlify, importar el repositorio desde **Add new project → Import an existing project → GitHub**, seleccionar la rama `main` y publicar. La configuración de compilación se toma del archivo del proyecto. Para compartir la URL sin iniciar sesión, comprobar que el acceso del sitio en Netlify esté configurado como público.

## Estructura

```text
src/app/
  core/
    config/                 # Catálogo de soluciones y contacto
    layout/
      site-header/          # Cabecera y control de navegación
      floating-menu/        # Menú reutilizable de tres niveles
      site-footer/          # Pie de página y acceso a WhatsApp
  shared/
    i18n/                   # Idioma compartido, pipe y traducciones
    models/                 # Contratos compartidos
    ui/
      brand-logo/
      contact-form/         # Formulario sin dependencias del layout
      faq-list/             # Preguntas frecuentes con apertura nativa
      icon/
      language-switcher/    # Selector nativo español / inglés
      meeting-request/      # Solicitud de reunión con validación
      video-card/           # Miniatura local; video bajo demanda
  features/
    home/
      pages/home/           # Composición de la portada
      components/           # Hero, contacto, carrusel y testimonios
      data/                 # Contenido de la portada
    nosotros/
      pages/nosotros/       # Pantalla con HTML, CSS y TypeScript separados
      components/
        purpose-card/       # Tarjetas de misión y visión
        value-card/         # Tarjetas de valores
        service-card/       # Servicios con enlace al catálogo
      data/                 # Historia, equipo, valores y servicios
    solutions/pages/solution/
    soluciones/
      soluciones.routes.ts
      plataformas/
        plataformas.routes.ts
        planillas-y-control-de-asistencia/
          planillas-y-control-de-asistencia.component.ts
          planillas-y-control-de-asistencia.component.html
          planillas-y-control-de-asistencia.component.css
          data/             # Beneficios y preguntas de esta pantalla
        salud-y-seguridad-ocupacional/
          salud-y-seguridad-ocupacional.component.ts
          salud-y-seguridad-ocupacional.component.html
          salud-y-seguridad-ocupacional.component.css
          data/             # Bloques de contenido y preguntas de seguridad
        gestion-del-talento-humano/
          gestion-del-talento-humano.component.ts
          gestion-del-talento-humano.component.html
          gestion-del-talento-humano.component.css
          data/             # Beneficios y preguntas de gestión del talento
        hostigamiento-laboral-y-sexual/
          hostigamiento-laboral-y-sexual.component.ts
          hostigamiento-laboral-y-sexual.component.html
          hostigamiento-laboral-y-sexual.component.css
          data/             # Prevención, incidentes, capacitación y preguntas
        e-learning/
          e-learning.component.ts
          e-learning.component.html
          e-learning.component.css
          data/             # Programas, aprendizaje, progreso y preguntas
    blog/pages/blog/
    not-found/
  app.routes.ts
src/styles.css              # Variables y estilos generales
src/styles/fonts.css        # Fuentes locales
src/assets/fonts/           # Poppins y licencia OFL
public/images/              # Imágenes optimizadas y sus fuentes
```

Cada pantalla y componente tiene sus archivos `.component.ts`, `.component.html` y `.component.css`. El componente raíz mantiene los nombres originales `app.ts`, `app.html` y `app.css`.

`core` contiene la configuración y el layout de la aplicación. `shared` contiene piezas reutilizables que reciben configuración por inputs y no dependen de `core` ni de `features`. Cada funcionalidad conserva sus componentes y datos propios en `features`.

## Agregar pantallas y soluciones

```sh
npx ng generate component features/nueva-funcionalidad/pages/nueva-pantalla
```

La configuración de Angular CLI genera automáticamente componentes standalone con HTML, CSS y TypeScript separados y detección de cambios `OnPush`. Registrar la pantalla con `loadComponent` en `app.routes.ts`.

El catálogo `core/config/solutions.data.ts` alimenta el menú, el footer y las rutas `/soluciones/<slug>`. Agregar una solución al catálogo crea su enlace y su pantalla introductoria. Las pantallas propias de plataformas se organizan en `features/soluciones/plataformas/<slug>/` y se registran en `plataformas.routes.ts`. `soluciones.routes.ts` excluye esas rutas del fallback genérico. No duplicar header, footer ni menú en cada pantalla.

La pantalla de Planillas y Control de Asistencia está en `/soluciones/planillas-y-control-de-asistencia`. Incluye la imagen de Control de asistencia proporcionada por el usuario, preguntas expandibles y un formulario de correo, celular, plataforma y permiso de contacto. El formulario prepara la solicitud en WhatsApp; no confirma una reunión ni envía datos a un backend. Las fotografías de apoyo se recrearon con imagegen: [recursos y prompts](docs/assets/planillas-y-control-de-asistencia.md).

La pantalla de Salud y Seguridad Ocupacional está en `/soluciones/salud-y-seguridad-ocupacional`. Usa las cinco imágenes originales facilitadas por el usuario y organiza el contenido y sus preguntas en `data/salud-y-seguridad-ocupacional.data.ts`. Reutiliza los componentes de preguntas frecuentes y solicitud de reunión, además del layout general. La procedencia de sus imágenes se documenta en [recursos de salud y seguridad](docs/assets/salud-y-seguridad-ocupacional.md).

La pantalla de Gestión del Talento Humano está en `/soluciones/gestion-del-talento-humano`. Conserva las cuatro imágenes originales proporcionadas por el usuario, con sus beneficios y preguntas organizados en `data/gestion-del-talento-humano.data.ts`. Reutiliza el layout, los iconos, las preguntas frecuentes y la solicitud de reunión. Sus recursos se describen en [imágenes de gestión del talento](docs/assets/gestion-del-talento-humano.md).

La pantalla de Hostigamiento Laboral y Sexual está en `/soluciones/hostigamiento-laboral-y-sexual`. Usa las cuatro imágenes originales del usuario y mantiene sus beneficios y preguntas en `data/hostigamiento-laboral-y-sexual.data.ts`. Reutiliza el layout, los iconos, las preguntas frecuentes y la solicitud de reunión. Sus recursos se documentan en [imágenes de hostigamiento laboral y sexual](docs/assets/hostigamiento-laboral-y-sexual.md).

La pantalla de E-Learning está en `/soluciones/e-learning`. Mantiene sus archivos HTML, CSS y TS en su propia carpeta y organiza beneficios y preguntas en `data/e-learning.data.ts`. Reutiliza el layout, los iconos, las preguntas frecuentes y la solicitud de reunión, con las cuatro imágenes originales del usuario. Ver [recursos de E-Learning](docs/assets/e-learning.md).

La pantalla Nosotros está en `/nosotros`, enlazada desde la cabecera y el footer. Reutiliza el layout general y organiza su historia, misión, visión, galería, siete valores y cuatro servicios en una funcionalidad independiente. Sus diez imágenes originales y los iconos se documentan en [recursos de Nosotros](docs/assets/nosotros.md). Se comprueba en el servidor local con `node scripts/check-nosotros-ui.mjs`.

Los datos de contacto se cambian en `core/config/contact.config.ts`. Las variables visuales están en `src/styles.css`. Las convenciones para futuras modificaciones están en [AGENTS.md](AGENTS.md).

Las fuentes y las medidas fijas de los estilos usan píxeles (`px`). Los ajustes de tamaño por pantalla se definen con media queries en píxeles; los porcentajes y las fracciones de las columnas se conservan para el layout adaptable.

## Comportamiento y contenido pendiente

- El menú se abre desde **Soluciones**. Las categorías cambian con hover o activación del botón. El teclado usa Tab y Enter/Espacio; Escape cierra el panel y devuelve el foco. También se cierra al navegar o hacer clic fuera.
- En móvil, abrir primero la navegación con el botón de menú. El panel se adapta a una columna y permite desplazamiento vertical.
- El formulario valida los campos y abre WhatsApp con la consulta preparada. El visitante confirma allí el envío. No hay API de contacto ni almacenamiento de datos personales.
- El carrusel permite recorrer los cinco módulos. Los videos de YouTube se cargan únicamente al reproducirlos.
- Las cinco plataformas tienen pantallas propias: Planillas y Control de Asistencia, Salud y Seguridad Ocupacional, Gestión del Talento Humano, Hostigamiento Laboral y Sexual y E-Learning. Los servicios conservan sus introducciones basadas en el catálogo. El blog muestra un estado sin publicaciones hasta incorporar contenido real.
- Se usan recursos públicos de CA Sistemas; algunas fotografías actuales difieren de la referencia. La procedencia se conserva en `public/images/sources.json`.

## Idiomas

El selector de la cabecera cambia entre español e inglés sin recargar ni perder el formulario o la ruta actual. El idioma inicial es español. La preferencia se conserva en `localStorage` con la clave `ca-sistemas.language`; si el navegador bloquea el almacenamiento, el cambio sigue funcionando durante la visita.

Las traducciones se definen en `src/app/shared/i18n/en.ts`, usando el texto español como clave. Para un texto nuevo, importar `TranslatePipe` en el componente y escribir, por ejemplo, `{{ 'Volver al inicio' | translate }}`. Agregar la traducción inglesa a ese diccionario. Los nombres comerciales, los datos que escribe el visitante y los identificadores de rutas conservan su forma original. Los videos conservan su audio original.

`LanguageService` comparte el idioma mediante una signal y actualiza el atributo `lang` del documento. La estrategia `core/i18n/localized-title.strategy.ts` traduce los títulos de página y la descripción. Los rótulos de sectores son HTML para que también puedan traducirse. Las capturas de software proporcionadas como imágenes conservan sus textos originales; sus descripciones accesibles sí se traducen.

## Validación

```sh
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
node scripts/check-ui.mjs
```

El último comando requiere una compilación previa y Chrome instalado. En Windows usa su ubicación habitual; para otra ubicación, definir `CHROME_BIN`. Inicia un servidor temporal, comprueba los estados del menú, teclado, rutas y seis anchos de pantalla, y lo cierra al terminar. Guarda capturas y el reporte en `artifacts/`, excluido de Git.

La compilación de producción queda en `dist/ca-sistemas/browser`. El hosting debe redirigir las rutas de la aplicación a `index.html` para permitir abrir enlaces internos directamente. No se ha publicado el sitio.
