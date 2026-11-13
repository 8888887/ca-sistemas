import { FaqItem } from '../../../../../shared/models/faq.model';

interface LearningFeature {
  readonly id: string;
  readonly title: string;
  readonly benefits: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
}

export const LEARNING_FEATURES: readonly LearningFeature[] = [
  {
    id: 'programas',
    title: 'Diseña programas de capacitación a medida',
    benefits: [
      'Crea un catálogo con cursos en línea en vivo, cursos a ritmo propio y seminarios web interactivos.',
      'Organiza la formación en aulas virtuales y desarrolla contenido informativo.',
      'Facilita el acceso a los recursos que cada colaborador necesita para su desarrollo profesional.',
    ],
    image: 'programas-capacitacion.png',
    imageAlt: 'Profesionales diseñando programas de capacitación en una computadora portátil',
  },
  {
    id: 'contenidos',
    title: 'Personaliza los contenidos y las rutas de aprendizaje',
    benefits: [
      'Adapta los contenidos a las necesidades de tu equipo.',
      'Define rutas de aprendizaje alineadas con los objetivos de cada colaborador y de la empresa.',
      'Ofrece una formación flexible que se pueda combinar con las responsabilidades del trabajo.',
    ],
    image: 'rutas-aprendizaje.png',
    imageAlt: 'Colaboradoras revisando contenidos y rutas de aprendizaje para su formación',
  },
  {
    id: 'progreso',
    title: 'Haz seguimiento y evalúa el progreso',
    benefits: [
      'Monitorea el avance de tus colaboradores.',
      'Identifica áreas de mejora y ofrece retroalimentación oportuna.',
      'Mide el retorno de la inversión en capacitación.',
    ],
    image: 'seguimiento-progreso.png',
    imageAlt: 'Equipo revisando el avance de cursos y evaluaciones en una plataforma de aprendizaje',
  },
];

export const LEARNING_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué tipos de capacitación puedo ofrecer con Empresarial-RH?',
    answer: 'Puedes ofrecer cursos en línea en vivo, cursos a ritmo propio y seminarios web interactivos.',
  },
  {
    question: '¿Puedo personalizar los contenidos y las rutas de aprendizaje?',
    answer: 'Sí. Puedes adaptar los contenidos y definir rutas según los objetivos de cada colaborador y de tu organización.',
  },
  {
    question: '¿La capacitación es completamente en línea?',
    answer: 'Sí. Con el aula virtual de Empresarial-RH puedes diseñar y gestionar programas de capacitación 100 % en línea.',
  },
  {
    question: '¿Puedo evaluar el avance de mi equipo?',
    answer: 'Sí. Puedes monitorear el progreso, evaluar los resultados, identificar áreas de mejora y ofrecer retroalimentación.',
  },
];
