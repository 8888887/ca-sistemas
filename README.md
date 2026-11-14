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

Las imágenes y bloques de contenido usan la directiva compartida `appReveal` para entrar desde izquierda o derecha una vez por visita a la pantalla. Se activan al aparecer en el área visible, con una transición de 800 ms y un desplazamiento de 80px (40px en móvil). La directiva admite `[appRevealDelay]="80"` o `160` para escalonar las entradas. Sus estilos están en `src/styles/motion.css` y utiliza un único `IntersectionObserver` compartido. Respeta `prefers-reduced-motion`, muestra de inmediato los controles que reciben foco y mantiene el contenido visible si el navegador no admite la observación. La comprobación de movimiento se ejecuta con `node scripts/check-motion-ui.mjs`; las comprobaciones de distribución usan movimiento reducido.

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
      servicios-adicionales/
        servicios-adicionales.routes.ts
        recursos-humanos/
          recursos-humanos.routes.ts
          auditoria-laboral/
            pages/auditoria-laboral/ # HTML, CSS y TypeScript del servicio
            data/                   # Áreas de revisión, beneficios y preguntas
          ley-30709/
            pages/ley-30709/        # HTML, CSS y TypeScript del servicio
            data/                   # Etapas del servicio y preguntas
          hr-analytics/
            pages/hr-analytics/     # HTML, CSS y TypeScript del servicio
            data/                   # Indicadores, beneficios y preguntas
          payroll/
            pages/payroll/          # HTML, CSS y TypeScript del servicio
            data/                   # Procesamiento, beneficios y preguntas
          evaluacion-de-desempeno/
            pages/evaluacion-de-desempeno/ # HTML, CSS y TypeScript
            data/                   # Beneficios y preguntas
          encuesta-de-clima-laboral/
            pages/encuesta-de-clima-laboral/ # HTML, CSS y TypeScript
            data/                   # Beneficios y preguntas
        gestion-empresarial/
          gestion-empresarial.routes.ts
          firmas-digitales-certificadas/
            pages/firmas-digitales-certificadas/ # HTML, CSS y TypeScript
            data/                   # Beneficios y preguntas
          mejora-de-procesos/
            pages/mejora-de-procesos/ # HTML, CSS y TypeScript
            data/                   # Presentación, beneficios y preguntas
        tecnologia-y-seguridad/
          tecnologia-y-seguridad.routes.ts
          consultoria-en-tecnologia/
            pages/consultoria-en-tecnologia/ # HTML, CSS y TypeScript
            components/technology-experts/  # Sección exclusiva de expertos
            data/                   # Beneficios, expertos y preguntas
          gestion-de-base-de-datos/
            pages/gestion-de-base-de-datos/ # HTML, CSS y TypeScript
            data/                   # Presentación, beneficios y preguntas
          pentesting/
            pages/pentesting/       # HTML, CSS y TypeScript
            data/                   # Presentación, beneficios y preguntas
          data-center/
            pages/data-center/      # HTML, CSS y TypeScript
            data/                   # Presentación, beneficios y preguntas
          backup-empresarial/
            pages/backup-empresarial/ # HTML, CSS y TypeScript
            data/                   # Presentación, beneficios y preguntas
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

Auditoría Laboral tiene su pantalla propia en `/soluciones/auditoria-laboral`, organizada dentro de Servicios adicionales → Recursos Humanos. Se accede desde el menú, el footer y la tarjeta de Nosotros. Usa las tres imágenes originales, animaciones compartidas y un formulario con selección de servicios. Ver [recursos de auditoría laboral](docs/assets/auditoria-laboral.md). La revisión local se ejecuta con `node scripts/check-audit-ui.mjs`.

Implementación de la Ley N.° 30709 está en `/soluciones/ley-30709`, dentro de la misma área de Recursos Humanos. Organiza cinco etapas del servicio en bloques alternados, con las seis imágenes originales, preguntas frecuentes y el formulario compartido de servicios. Ver [recursos de la Ley 30709](docs/assets/ley-30709.md). Se revisa localmente con `node scripts/check-law-ui.mjs`.

HR Analytics está en `/soluciones/hr-analytics`, dentro de Servicios adicionales → Recursos Humanos. Presenta indicadores y reportes, análisis predictivo y decisiones basadas en datos, con cuatro imágenes originales, preguntas frecuentes y el formulario compartido de servicios. Ver [recursos de HR Analytics](docs/assets/hr-analytics.md). Se comprueba en local con `node scripts/check-analytics-ui.mjs`.

Payroll y procesamiento de planillas está en `/soluciones/payroll`, dentro de Servicios adicionales → Recursos Humanos. Usa cinco imágenes originales y presenta automatización de nómina, costos laborales, acompañamiento y pagos puntuales. Reutiliza las animaciones, preguntas frecuentes y el formulario de servicios. Ver [recursos del servicio de Payroll](docs/assets/payroll.md). Se revisa con `node scripts/check-payroll-service-ui.mjs`.

Evaluación de Desempeño está en `/soluciones/evaluacion-de-desempeno`, dentro de Servicios adicionales → Recursos Humanos. Presenta cinco beneficios con los SVG originales, dos fotografías, preguntas frecuentes y el formulario compartido. Ver [recursos de evaluación de desempeño](docs/assets/evaluacion-de-desempeno.md). Se comprueba en local con `node scripts/check-performance-ui.mjs`.

Encuesta de Clima Laboral está en `/soluciones/encuesta-de-clima-laboral`, dentro de Servicios adicionales → Recursos Humanos. Conserva la fotografía y los cinco iconos SVG originales del usuario, con beneficios y preguntas en su carpeta `data/` y HTML, CSS y TypeScript en `pages/encuesta-de-clima-laboral/`. Reutiliza el layout, las animaciones y el formulario de servicios, con español e inglés. Ver [recursos de encuesta de clima laboral](docs/assets/encuesta-de-clima-laboral.md). Se comprueba en local con `node scripts/check-climate-ui.mjs`.

Firmas Digitales Certificadas está en `/soluciones/firmas-digitales-certificadas`, dentro de Servicios adicionales → Gestión Empresarial. Conserva la fotografía y los cinco SVG originales del usuario, con la presentación, beneficios, preguntas frecuentes y formulario de contacto en una funcionalidad independiente. Ver [recursos de firmas digitales](docs/assets/firmas-digitales-certificadas.md). Se comprueba en local con `node scripts/check-signature-ui.mjs`.

Levantamiento y mejora de procesos está en `/soluciones/mejora-de-procesos`, dentro de Servicios adicionales → Gestión Empresarial. Usa las tres fotografías y los cinco SVG originales del usuario, con presentación del servicio, explicación, beneficios, preguntas y formulario compartido. Mantiene HTML, CSS, TypeScript y datos separados. Ver [recursos de mejora de procesos](docs/assets/mejora-de-procesos.md). Se comprueba en local con `node scripts/check-process-ui.mjs`.

Consultoría en Tecnología está en `/soluciones/consultoria-en-tecnologia`, dentro de Servicios adicionales → Tecnología y Seguridad. Conserva la imagen principal, los tres retratos y los ocho SVG originales del usuario. Organiza la pantalla, sus datos y el componente de expertos en carpetas propias, con preguntas frecuentes, formulario compartido y español e inglés. Ver [recursos de consultoría en tecnología](docs/assets/consultoria-en-tecnologia.md). Se comprueba en local con `node scripts/check-consulting-ui.mjs`.

Administración y Gestión de Base de Datos está en `/soluciones/gestion-de-base-de-datos`, dentro de Servicios adicionales → Tecnología y Seguridad. Conserva las dos imágenes y los cinco SVG originales del usuario, con presentación de SQL Server, alcance del servicio, preguntas frecuentes y formulario compartido. Mantiene HTML, CSS, TypeScript y datos separados. Ver [recursos de gestión de base de datos](docs/assets/gestion-de-base-de-datos.md). Se comprueba en local con `node scripts/check-database-ui.mjs`.

Pentesting y Análisis de Vulnerabilidades está en `/soluciones/pentesting`, dentro de Servicios adicionales → Tecnología y Seguridad. Conserva las dos imágenes y los cinco SVG originales del usuario, con explicación del servicio, cinco beneficios, preguntas frecuentes y formulario compartido. Mantiene HTML, CSS, TypeScript y datos separados. Ver [recursos de pentesting](docs/assets/pentesting.md). Se comprueba en local con `node scripts/check-pentesting-ui.mjs`.

Alojamiento en Data Center está en `/soluciones/data-center`, dentro de Servicios adicionales → Tecnología y Seguridad. Usa las dos imágenes y los cinco SVG originales del usuario, con una presentación del hosting empresarial, cinco beneficios y contenido de contacto adaptado al servicio. Mantiene HTML, CSS, TypeScript y datos separados. Ver [recursos de data center](docs/assets/data-center.md). Se comprueba en local con `node scripts/check-data-center-ui.mjs`.

Backup Empresarial está en `/soluciones/backup-empresarial`, dentro de Servicios adicionales → Tecnología y Seguridad. Conserva las dos imágenes y los cinco SVG originales del usuario, con una explicación del respaldo profesional, beneficios, preguntas frecuentes y formulario compartido. Mantiene HTML, CSS, TypeScript y datos separados. Ver [recursos de backup empresarial](docs/assets/backup-empresarial.md). Se comprueba en local con `node scripts/check-backup-ui.mjs`.

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
