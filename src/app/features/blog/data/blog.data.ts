import { BlogArticle } from '../models/blog-article.model';

// Content and original embedded images supplied in Blog_CA_Sistemas.html.
export const BLOG_CATEGORIES = [
  {
    "id": "all",
    "label": "Todos"
  },
  {
    "id": "plataforma",
    "label": "Plataforma"
  },
  {
    "id": "recursos-humanos",
    "label": "Recursos Humanos"
  },
  {
    "id": "gestion-empresarial",
    "label": "Gestión Empresarial"
  },
  {
    "id": "tecnologia-y-seguridad",
    "label": "Tecnología y Seguridad"
  }
] as const;

export const BLOG_ARTICLES: readonly BlogArticle[] = [
  {
    "id": "evaluacion-de-desempeno",
    "category": "recursos-humanos",
    "title": "Cómo mejorar la evaluación de desempeño",
    "excerpt": "Define criterios observables para cada puesto.",
    "body": "Define criterios observables para cada puesto. Antes de la reunión, reúne ejemplos concretos y acuerda con cada persona un objetivo de mejora y una fecha de seguimiento.",
    "image": "/images/blog/evaluacion-de-desempeno.webp"
  },
  {
    "id": "hr-analytics",
    "category": "recursos-humanos",
    "title": "Indicadores de HR Analytics",
    "excerpt": "Empieza con una pregunta de negocio.",
    "body": "Empieza con una pregunta de negocio. Si buscas entender la rotación, compara la tasa por área y periodo con la misma fórmula y revisa el contexto antes de sacar conclusiones.",
    "image": "/images/blog/hr-analytics.webp"
  },
  {
    "id": "sql-server",
    "category": "tecnologia-y-seguridad",
    "title": "Cómo optimizar SQL Server",
    "excerpt": "Mide los tiempos de respuesta antes de intervenir.",
    "body": "Mide los tiempos de respuesta antes de intervenir. Identifica las consultas de mayor costo, revisa sus planes de ejecución y compara las métricas después de cada cambio.",
    "image": "/images/blog/sql-server.webp"
  },
  {
    "id": "firmas-digitales",
    "category": "gestion-empresarial",
    "title": "Firmas digitales certificadas",
    "excerpt": "Identifica qué documentos requieren firma y quién debe aprobarlos.",
    "body": "Identifica qué documentos requieren firma y quién debe aprobarlos. Define el flujo de revisión y conserva el documento firmado junto con su registro de validación.",
    "image": "/images/blog/firmas-digitales.webp"
  },
  {
    "id": "backup-empresarial",
    "category": "tecnologia-y-seguridad",
    "title": "Copias de seguridad empresariales",
    "excerpt": "Define cuántos datos podría perder tu empresa ante un incidente.",
    "body": "Define cuántos datos podría perder tu empresa ante un incidente. Usa ese límite para establecer la frecuencia de las copias y realiza pruebas periódicas de restauración.",
    "image": "/images/blog/backup-empresarial.webp"
  },
  {
    "id": "pentesting",
    "category": "tecnologia-y-seguridad",
    "title": "Pentesting y vulnerabilidades",
    "excerpt": "El análisis de vulnerabilidades identifica debilidades.",
    "body": "El análisis de vulnerabilidades identifica debilidades. El pentesting comprueba cuáles podrían explotarse mediante pruebas controladas dentro de un alcance autorizado.",
    "image": "/images/blog/pentesting.webp"
  },
  {
    "id": "planillas-y-asistencia",
    "category": "plataforma",
    "title": "Planillas y control de asistencia",
    "excerpt": "Revisa los horarios, las tardanzas y las incidencias antes del cierre de planilla.",
    "body": "Revisa los horarios, las tardanzas y las incidencias antes del cierre de planilla. Centralizar estos registros facilita la validación del equipo responsable.",
    "image": "/images/blog/planillas-y-asistencia.webp"
  }
];
