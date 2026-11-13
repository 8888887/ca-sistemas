import { FaqItem } from '../../../../../shared/models/faq.model';

interface SafetyFeature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
}

export const SAFETY_FEATURES: readonly SafetyFeature[] = [
  {
    id: 'riesgos',
    title: 'Identifica riesgos e implementa protocolos',
    description: 'Identifica y evalúa los riesgos laborales e implementa protocolos de seguridad para proteger a tus colaboradores y facilitar el cumplimiento de la normativa vigente.',
    image: 'identificacion-de-riesgos.png',
    imageAlt: 'Especialistas con equipos de protección identificando riesgos en una planta industrial',
  },
  {
    id: 'incidentes',
    title: 'Registra incidentes y analiza tendencias',
    description: 'Lleva un registro detallado de incidentes, accidentes y enfermedades laborales. Usa esa información para analizar tendencias y definir medidas de prevención.',
    image: 'registro-de-incidentes.png',
    imageAlt: 'Equipo de seguridad ocupacional analizando gráficos de incidentes y tendencias',
  },
  {
    id: 'capacitacion',
    title: 'Capacita a tus colaboradores',
    description: 'Facilita la capacitación en temas de seguridad para que tu equipo esté informado y preparado para actuar ante una emergencia.',
    image: 'capacitacion-seguridad.png',
    imageAlt: 'Capacitación de colaboradores sobre el uso de un extintor y respuesta a emergencias',
  },
  {
    id: 'integracion',
    title: 'Integra la gestión de salud y seguridad con planillas y asistencia',
    description: 'Conecta este módulo con otras funcionalidades de Empresarial-RH, como planillas y asistencia, para tener una visión más completa de la salud de tu organización.',
    image: 'integracion-planillas-asistencia.png',
    imageAlt: 'Profesionales revisando una plataforma que conecta seguridad, salud y asistencia',
  },
];

export const SAFETY_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué puedo gestionar con el módulo de Salud y Seguridad Ocupacional?',
    answer: 'Puedes identificar y evaluar riesgos laborales, implementar protocolos de seguridad y registrar incidentes, accidentes y enfermedades laborales.',
  },
  {
    question: '¿El módulo facilita la capacitación en seguridad?',
    answer: 'Sí. El sistema facilita la capacitación de tus colaboradores en temas de seguridad y los ayuda a prepararse para actuar ante emergencias.',
  },
  {
    question: '¿Puedo integrarlo con planillas y asistencia?',
    answer: 'Sí. El módulo se integra con las funcionalidades de planillas y asistencia de Empresarial-RH.',
  },
];
