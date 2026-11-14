# Recursos de Encuesta de Clima Laboral

La pantalla `/soluciones/encuesta-de-clima-laboral` utiliza la fotografía PNG adjuntada y los cinco SVG originales facilitados por el usuario. Los SVG se copiaron desde los archivos indicados en Descargas, comprobando que las copias conservan su contenido exacto. No se modificaron la fotografía ni los iconos.

Los recursos están en `public/images/soluciones/servicios-adicionales/recursos-humanos/encuesta-de-clima-laboral/`:

| Archivo | Uso |
| --- | --- |
| `encuesta-clima-laboral.png` | Cabecera del servicio |
| `icons/segura-confidencial.svg` | Encuesta anónima, segura y confidencial |
| `icons/indicadores-clave.svg` | Indicadores clave y personalizables |
| `icons/resultados-inmediatos.svg` | Resultados inmediatos y reportes visuales |
| `icons/retencion-compromiso.svg` | Retención y compromiso |
| `icons/bienestar-laboral.svg` | Bienestar laboral |

La referencia completa se conserva en `artifacts/climate-design-reference.png`. Los textos siguen el diseño proporcionado por el usuario.

La funcionalidad está en `features/soluciones/servicios-adicionales/recursos-humanos/encuesta-de-clima-laboral/`, con HTML, CSS y TypeScript en `pages/encuesta-de-clima-laboral/` y contenido en `data/`. Se registra en las rutas de Recursos Humanos y reutiliza el catálogo central, header, footer, animaciones, preguntas frecuentes y formulario de servicios.
