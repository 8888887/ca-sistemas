# Recursos de HR Analytics

La pantalla `/soluciones/hr-analytics` conserva las cuatro imágenes PNG originales proporcionadas por el usuario, sin modificaciones, en `public/images/soluciones/servicios-adicionales/recursos-humanos/hr-analytics/`.

| Archivo | Uso |
| --- | --- |
| `hr-analytics-empresas.png` | Cabecera del servicio |
| `indicadores-equipo.png` | Indicadores y características del servicio |
| `riesgos-capacitacion.png` | Riesgos de rotación y necesidades de capacitación |
| `decisiones-datos.png` | Decisiones y priorización de acciones |

La referencia completa está en `artifacts/analytics-design-reference.png`. El contenido sigue el diseño del usuario. La segunda pregunta frecuente se adaptó a HR Analytics, pues en la referencia conservaba una pregunta sobre valoración de puestos y una respuesta de auditoría.

La funcionalidad está en `features/soluciones/servicios-adicionales/recursos-humanos/hr-analytics/`, con HTML, CSS y TypeScript en `pages/hr-analytics/` y contenido en `data/`. Usa el catálogo central y reutiliza el header, footer, animaciones, preguntas frecuentes y formulario de servicios. La ruta se registra en `recursos-humanos.routes.ts`.
