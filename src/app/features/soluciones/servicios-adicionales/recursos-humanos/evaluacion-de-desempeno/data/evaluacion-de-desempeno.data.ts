import { FaqItem } from '../../../../../../shared/models/faq.model';

export const PERFORMANCE_BENEFITS = [
  {
    id: 'indicadores',
    title: 'Indicadores claros y personalizables',
    description: 'Define tus propios criterios de evaluación según cargo, área o nivel jerárquico. Evalúa por competencias, resultados, metas o KPIs.',
    icon: 'indicadores-claros.svg',
  },
  {
    id: 'seguimiento',
    title: 'Seguimiento continuo',
    description: 'Realiza evaluaciones periódicas, evaluaciones 360°, por pares, jefaturas o subordinados. Monitorea el desarrollo del talento en tiempo real.',
    icon: 'seguimiento-continuo.svg',
  },
  {
    id: 'reportes',
    title: 'Reportes y analítica inteligente',
    description: 'Visualiza resultados con dashboards intuitivos. Toma decisiones informadas sobre promociones, capacitaciones, rotaciones o desvinculaciones.',
    icon: 'reportes-analiticas.svg',
  },
  {
    id: 'clima-laboral',
    title: 'Mejora el clima laboral',
    description: 'Fomenta la retroalimentación constante, genera cultura de mejora continua y fortalece la comunicación entre líderes y equipos.',
    icon: 'clima-laboral.svg',
  },
  {
    id: 'normativas',
    title: 'Cumple con las normativas locales',
    description: 'Nuestro sistema está diseñado para adaptarse a la legislación laboral vigente en Perú y otros países de Latinoamérica.',
    icon: 'normativas-locales.svg',
  },
] as const;

export const PERFORMANCE_FAQS: readonly FaqItem[] = [
  {
    question: '¿Puedo definir criterios de evaluación distintos para cada cargo?',
    answer: 'Sí. Puedes configurar los criterios según el cargo, el área o el nivel jerárquico y evaluar por competencias, resultados, metas o indicadores de desempeño.',
  },
  {
    question: '¿Qué tipos de evaluación puedo realizar?',
    answer: 'Puedes hacer evaluaciones periódicas y aplicar distintos formatos, como la evaluación de 360° o la evaluación por pares, jefaturas o personas a cargo.',
  },
  {
    question: '¿Cómo me ayudan los resultados a planificar la capacitación?',
    answer: 'Te permiten identificar qué competencias necesita reforzar cada colaborador y priorizar las capacitaciones según las necesidades de tu equipo.',
  },
];
