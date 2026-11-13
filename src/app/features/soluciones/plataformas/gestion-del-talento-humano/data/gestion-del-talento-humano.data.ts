import { FaqItem } from '../../../../../shared/models/faq.model';

interface TalentFeature {
  readonly id: string;
  readonly title: string;
  readonly benefits: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
}

export const TALENT_FEATURES: readonly TalentFeature[] = [
  {
    id: 'seleccion',
    title: 'Selección e incorporación de personal',
    benefits: [
      'Gestiona los procesos de selección.',
      'Organiza la incorporación de nuevos colaboradores (onboarding).',
      'Realiza encuestas a tu equipo.',
    ],
    image: 'seleccion-incorporacion.png',
    imageAlt: 'Profesional de recursos humanos acompañando la incorporación de un nuevo colaborador',
  },
  {
    id: 'desempeno',
    title: 'Evaluación del desempeño',
    benefits: [
      'Asigna tareas y establece objetivos medibles.',
      'Haz seguimiento al avance de tus colaboradores.',
      'Evalúa los resultados e identifica áreas de mejora.',
    ],
    image: 'evaluacion-desempeno.png',
    imageAlt: 'Colaboradores revisando objetivos y resultados de desempeño en una computadora',
  },
  {
    id: 'desarrollo',
    title: 'Reportes y desarrollo del talento',
    benefits: [
      'Personaliza los reportes según las necesidades de tu empresa.',
      'Analiza el rendimiento de tu equipo.',
      'Identifica oportunidades de crecimiento y aprendizaje.',
    ],
    image: 'reportes-desarrollo.png',
    imageAlt: 'Equipo de trabajo conversando sobre oportunidades de desarrollo y crecimiento',
  },
];

export const TALENT_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué procesos puedo gestionar con Empresarial-RH?',
    answer: 'Puedes gestionar la selección, la incorporación de personal, las encuestas y las evaluaciones de desempeño.',
  },
  {
    question: '¿Puedo hacer seguimiento a los objetivos de mi equipo?',
    answer: 'Sí. Puedes definir objetivos medibles, revisar el avance y evaluar los resultados.',
  },
  {
    question: '¿Puedo personalizar los reportes?',
    answer: 'Sí. Puedes adaptarlos a las necesidades de tu organización.',
  },
  {
    question: '¿El software funciona en la nube?',
    answer: 'Sí. Empresarial-RH es un software modular en la nube (SaaS).',
  },
];
