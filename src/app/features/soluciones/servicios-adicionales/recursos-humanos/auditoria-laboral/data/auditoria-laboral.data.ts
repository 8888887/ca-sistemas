import { FaqItem } from '../../../../../../shared/models/faq.model';

export const AUDIT_REVIEW_AREAS = [
  {
    title: 'Obligaciones laborales',
    description: 'Evaluamos cómo se aplican normas laborales en tu organización e identificamos áreas de mejora.',
  },
  {
    title: 'Seguridad y salud en el trabajo',
    description: 'Revisamos el cumplimiento de las obligaciones de SST e identificamos posibles riesgos.',
  },
  {
    title: 'Procesos y políticas internas',
    description: 'Evaluamos tus procesos y políticas y adaptamos el enfoque a las necesidades de tu empresa.',
  },
] as const;

export const AUDIT_BENEFITS = [
  'Detecta riesgos y oportunidades de mejora con anticipación.',
  'Fortalece el clima laboral y la reputación de tu empresa.',
  'Refuerza la prevención de accidentes y enfermedades laborales.',
] as const;

export const AUDIT_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué incluye la auditoría laboral?',
    answer: 'Una evaluación de los procesos y políticas de tu empresa para verificar el cumplimiento de tus obligaciones laborales y de seguridad y salud en el trabajo.',
  },
  {
    question: '¿Me ayuda a prepararme para una inspección de SUNAFIL?',
    answer: 'Sí. La evaluación toma como referencia sus protocolos de inspección para identificar brechas de cumplimiento.',
  },
  {
    question: '¿La auditoría se adapta a mi empresa?',
    answer: 'Sí. El equipo de CA Sistemas personaliza el enfoque según las necesidades de tu organización.',
  },
];
