import { FaqItem } from '../../../../../../shared/models/faq.model';

export const ANALYTICS_BENEFITS = [
  'Visualiza en tiempo real el desempeño de tu equipo, la rotación de personal y la satisfacción laboral.',
  'Personaliza los reportes con la integración de Power BI, según las necesidades de tu organización.',
  'Identifica tendencias y patrones en tus datos de recursos humanos.',
] as const;

export const ANALYTICS_FEATURES = [
  {
    id: 'riesgos-capacitacion',
    title: 'Anticipa riesgos y necesidades de capacitación',
    description: 'Usa el análisis predictivo para detectar señales de riesgo de rotación e identificar posibles necesidades de capacitación. Así, tu equipo de RR. HH. puede planificar acciones con anticipación.',
    image: 'riesgos-capacitacion.png',
    imageAlt: 'Equipo participando en una capacitación guiada por un instructor',
    width: 460,
    height: 289,
  },
  {
    id: 'decisiones-datos',
    title: 'Usa los datos para decidir dónde actuar',
    description: 'Entrega a tus líderes y al equipo de RR. HH. información para priorizar acciones que apoyen el desempeño y el bienestar de los colaboradores, en línea con los objetivos de tu empresa.',
    image: 'decisiones-datos.png',
    imageAlt: 'Equipo usando información compartida para priorizar acciones y tomar decisiones',
    width: 475,
    height: 261,
  },
] as const;

export const ANALYTICS_FAQS: readonly FaqItem[] = [
  {
    question: '¿Puedo personalizar los reportes?',
    answer: 'Sí. La integración con Power BI permite crear reportes adaptados a las necesidades de tu organización.',
  },
  {
    question: '¿Puedo anticipar riesgos de rotación y necesidades de capacitación?',
    answer: 'Sí. El análisis predictivo ayuda a detectar señales de riesgo de rotación e identificar posibles necesidades de capacitación para planificar acciones con anticipación.',
  },
  {
    question: '¿Qué módulo de Empresarial-RH ofrece estas funciones?',
    answer: 'El módulo de Reportes e Inteligencia de Negocio permite visualizar indicadores, analizar tendencias y generar reportes de recursos humanos.',
  },
];
