import { FaqItem } from '../../../../../../shared/models/faq.model';

export const CLIMATE_SURVEY_BENEFITS = [
  {
    id: 'confidencialidad',
    title: 'Anónima, segura y confidencial',
    description: 'Fomenta respuestas honestas y sin filtros, asegurando la privacidad de cada colaborador.',
    icon: 'segura-confidencial.svg',
  },
  {
    id: 'indicadores',
    title: 'Indicadores clave y personalizables',
    description: 'Evalúa aspectos como liderazgo, comunicación interna, motivación, ambiente, relaciones laborales, equidad y más. Puedes adaptar la encuesta a las necesidades de tu organización.',
    icon: 'indicadores-clave.svg',
  },
  {
    id: 'resultados',
    title: 'Resultados inmediatos y reportes visuales',
    description: 'Obtén dashboards con insights clave. Analiza resultados por áreas, sedes o niveles jerárquicos para tomar acciones concretas.',
    icon: 'resultados-inmediatos.svg',
  },
  {
    id: 'retencion',
    title: 'Mejora la retención y el compromiso',
    description: 'Conocer cómo se siente tu equipo te ayuda a reducir la rotación, mejorar la productividad y fortalecer la cultura organizacional.',
    icon: 'retencion-compromiso.svg',
  },
  {
    id: 'bienestar',
    title: 'Cumple con estándares de bienestar laboral',
    description: 'Demuestra tu compromiso con el bienestar del talento humano, alineándote con buenas prácticas empresariales y requisitos de salud ocupacional.',
    icon: 'bienestar-laboral.svg',
  },
] as const;

export const CLIMATE_SURVEY_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué aspectos puedo evaluar con la encuesta?',
    answer: 'Puedes conocer la percepción de tus colaboradores sobre el liderazgo, la comunicación interna, la motivación, el ambiente de trabajo, las relaciones laborales y la equidad.',
  },
  {
    question: '¿Las respuestas son anónimas?',
    answer: 'Sí. La encuesta protege la identidad de cada colaborador para que pueda compartir su opinión con confianza.',
  },
  {
    question: '¿Cuándo puedo consultar los resultados?',
    answer: 'Puedes consultar los resultados en tiempo real mediante paneles visuales que facilitan la lectura de los indicadores.',
  },
];
