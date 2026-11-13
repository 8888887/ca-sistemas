import { FaqItem } from '../../../../../shared/models/faq.model';

export const ATTENDANCE_BENEFITS = [
  'Control de horarios y registros de asistencia',
  'Seguimiento de ausencias y horas extras',
  'Información organizada para generar planillas',
] as const;

export const REPORTING_BENEFITS = [
  'Reportes adaptados a tu organización',
  'Información conectada entre módulos',
  'Interfaz intuitiva para tus usuarios',
] as const;

export const PAYROLL_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué puedo controlar con el módulo de asistencia?',
    answer: 'Horarios, ausencias y horas extras de tus colaboradores, con información centralizada para facilitar la gestión administrativa.',
  },
  {
    question: '¿Se integra con otros módulos?',
    answer: 'Sí. El módulo permite la integración con otros componentes de Empresarial-RH. En una reunión podemos revisar el alcance que necesita tu organización.',
  },
  {
    question: '¿Puedo personalizar los reportes?',
    answer: 'Sí. Los reportes y análisis pueden adaptarse a las exigencias de tu negocio. El equipo de CA Sistemas puede ayudarte a definir tus necesidades.',
  },
];
