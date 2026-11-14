# Recursos del servicio de Payroll

La pantalla `/soluciones/payroll` usa las cinco imágenes PNG originales facilitadas por el usuario, sin modificaciones. Se guardan en `public/images/soluciones/servicios-adicionales/recursos-humanos/payroll/`.

| Archivo | Uso |
| --- | --- |
| `payroll-empresas.png` | Cabecera del servicio |
| `procesamiento-nomina.png` | Automatización del procesamiento de nómina |
| `costos-laborales.png` | Costos laborales y planificación |
| `acompanamiento-inicial.png` | Acompañamiento y capacitación |
| `pagos-puntuales.png` | Confianza y pagos puntuales |

La referencia completa está en `artifacts/payroll-service-design-reference.png`. Los textos siguen el diseño proporcionado por el usuario.

La funcionalidad se organiza en `features/soluciones/servicios-adicionales/recursos-humanos/payroll/`, con HTML, CSS y TypeScript en `pages/payroll/` y contenido en `data/`. La ruta reutiliza el catálogo central y se registra en `recursos-humanos.routes.ts`. El componente usa el selector `app-payroll-service` y reutiliza la cabecera, footer, animaciones, preguntas frecuentes y formulario de servicios.
