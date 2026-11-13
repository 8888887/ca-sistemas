# Recursos de Planillas y Control de Asistencia

Los recursos finales están en `public/images/soluciones/planillas-y-control-de-asistencia/`:

| Archivo | Procedencia |
| --- | --- |
| `payroll-preview.webp` | [Captura pública de CA Sistemas](https://casistemas.com/wp-content/uploads/2024/09/Group-471.png), recortada al área de la aplicación y convertida a WebP. Conserva los textos originales del software. |
| `attendance-table.png` | Imagen original de 648 × 364 píxeles proporcionada por el usuario. Se conserva sin modificaciones. |
| `attendance-management.webp` | Fotografía recreada con la herramienta integrada imagegen, convertida a WebP para el sitio. |
| `reporting-team.webp` | Fotografía recreada con la herramienta integrada imagegen, convertida a WebP para el sitio. |

Las fotografías son ilustraciones generadas de situaciones de trabajo. La referencia del usuario guio su composición; no son las fotografías originales de esa referencia. Se utilizó el modo integrado de imagegen, sin CLI ni llamadas a una API desde el proyecto.

La vista central de Control de asistencia utiliza directamente `attendance-table.png`, la imagen facilitada por el usuario. No contiene controles interactivos. Sus textos internos conservan el idioma original y su descripción accesible cambia entre español e inglés.

## Prompt final: fotografía de asistencia

```text
Use case: photorealistic-natural. Create one landscape 16:9 website asset for a Peruvian enterprise HR payroll and attendance software page. Match this composition: modern sunlit office, on the RIGHT a young adult Latina human-resources professional with long dark hair in a light blue or white blouse, seated in profile at a white desk looking LEFT at a large desktop monitor in the CENTER. The monitor displays an anonymous blue-and-white attendance calendar dashboard with tiny grids and charts, no readable names. On the far LEFT in the background an adult man scans a wall-mounted time-attendance terminal near the glass office entrance. Glass walls, big bright windows, city buildings, green plant. Natural photographic detail, navy blue and soft cyan visual accents, professional believable workplace. A few subtle translucent blue UI icons for a clock/calendar/document float just above the monitor, like the supplied website design reference; do not add multicolored horizontal bars or large decorative overlays. No headlines, no captions, no watermarks, no logos. This is a standalone supporting photo, not an entire website mockup. Output landscape ratio 16:9.
```

## Prompt final: fotografía de reportes

```text
Use case: photorealistic-natural. Create one portrait 4:5 website asset for a Peruvian enterprise human resources software page. Modern bright glass-walled office, full seated-body composition: on the RIGHT an adult Latino male HR analyst in a light blue shirt and dark trousers sits in a black mesh ergonomic chair at a white desk, seen from a side/back angle, looking toward a large desktop computer monitor on the LEFT. Behind and slightly to the left of the seated man stands a Latina colleague in a white blouse and dark trousers, leaning slightly and pointing at the screen while discussing data. Monitor shows an anonymous white-and-blue HR reporting dashboard with small charts, no readable personal information. Soft bright daylight, blue glass walls, small green plants, pale wood office floor. Natural photographic workplace style, navy and cyan accents. Include only a few small translucent cyan analytics/chart/target interface symbols floating near the left side of the monitor, subtle like a marketing illustration. No text captions, no watermarks, no logos. Standalone realistic photograph, not a web page or a collage. Output portrait ratio 4:5.
```
