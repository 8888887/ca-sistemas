# Recursos de Auditoría Laboral

La pantalla `/soluciones/auditoria-laboral` conserva las tres imágenes originales proporcionadas por el usuario, sin modificaciones, en `public/images/soluciones/servicios-adicionales/recursos-humanos/auditoria-laboral/`.

| Archivo | Uso |
| --- | --- |
| `auditoria-empresas.png` | Cabecera del servicio |
| `inspeccion-sunafil.png` | Preparación para inspecciones |
| `beneficios-auditoria.png` | Beneficios para la empresa |

La referencia completa está en `artifacts/audit-design-reference.png`. El contenido corresponde al diseño facilitado por el usuario.

La funcionalidad se organiza en `features/soluciones/servicios-adicionales/recursos-humanos/auditoria-laboral/`: `pages/auditoria-laboral/` contiene HTML, CSS y TS; `data/` contiene las áreas de revisión, beneficios y preguntas. Las rutas de servicios adicionales agrupan las pantallas por área y reutilizan el catálogo central.

La página usa el header y footer generales, las animaciones compartidas, preguntas frecuentes y solicitud de reunión. El formulario recibe los servicios del catálogo y personaliza el rótulo y la validación del selector mediante inputs. Mantiene la preparación de la consulta en WhatsApp y no confirma reuniones ni envía datos a un backend.
