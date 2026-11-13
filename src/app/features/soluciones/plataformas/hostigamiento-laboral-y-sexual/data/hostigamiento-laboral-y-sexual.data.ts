import { FaqItem } from '../../../../../shared/models/faq.model';

interface HarassmentFeature {
  readonly id: string;
  readonly title: string;
  readonly benefits: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
}

export const HARASSMENT_FEATURES: readonly HarassmentFeature[] = [
  {
    id: 'prevencion',
    title: 'Prevención y seguimiento del cumplimiento',
    benefits: [
      'Identifica y organiza la información sobre conductas inapropiadas.',
      'Da seguimiento al cumplimiento de las leyes y normas laborales.',
      'Promueve una cultura de respeto e inclusión.',
    ],
    image: 'prevencion-cumplimiento.png',
    imageAlt: 'Colaboradora estableciendo límites ante una conducta inapropiada en la oficina',
  },
  {
    id: 'incidentes',
    title: 'Registro de incidentes y protocolos de respuesta',
    benefits: [
      'Registra los incidentes de hostigamiento laboral y sexual.',
      'Realiza investigaciones sobre los casos registrados.',
      'Establece protocolos para responder con rapidez y atender cada situación con la seriedad que merece.',
    ],
    image: 'registro-incidentes.png',
    imageAlt: 'Profesional registrando un incidente y revisando su seguimiento en una plataforma',
  },
  {
    id: 'capacitacion',
    title: 'Capacitación continua para tu equipo',
    benefits: [
      'Facilita la capacitación en derechos laborales y prevención del acoso.',
      'Mantén a tus colaboradores informados.',
      'Fomenta el diálogo y la comunicación abierta para fortalecer la confianza en el equipo.',
    ],
    image: 'capacitacion-equipo.png',
    imageAlt: 'Equipo participando en una capacitación sobre respeto y comunicación en el trabajo',
  },
];

export const HARASSMENT_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué puedo gestionar con el módulo de Hostigamiento Laboral y Sexual?',
    answer: 'Puedes registrar incidentes, realizar investigaciones y establecer protocolos de respuesta.',
  },
  {
    question: '¿El módulo ayuda a dar seguimiento al cumplimiento de las normas laborales?',
    answer: 'Sí. Ofrece herramientas para gestionar y monitorear el cumplimiento de las leyes y normas laborales.',
  },
  {
    question: '¿El módulo facilita la capacitación del personal?',
    answer: 'Sí. Facilita la capacitación continua en derechos laborales y prevención del acoso.',
  },
  {
    question: '¿El software funciona en la nube?',
    answer: 'Sí. Empresarial-RH es un software modular en la nube (SaaS).',
  },
];
