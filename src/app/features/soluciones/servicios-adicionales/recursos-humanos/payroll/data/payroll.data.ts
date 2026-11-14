import { FaqItem } from '../../../../../../shared/models/faq.model';

export const PAYROLL_SERVICE_BENEFITS = [
  'Conecta los datos de asistencia con la generación de planillas.',
  'Agiliza el procesamiento de salarios y reduce el riesgo de errores manuales.',
  'Facilita el cumplimiento de las normas laborales y fiscales aplicables a tu nómina.',
] as const;

export const PAYROLL_SERVICE_FEATURES = [
  {
    id: 'costos-laborales',
    title: 'Conoce tus costos laborales en tiempo real',
    description: 'Consulta reportes y análisis de Empresarial-RH para entender tus costos laborales, planificar tu presupuesto y tomar decisiones informadas sobre tu personal.',
    image: 'costos-laborales.png',
    imageAlt: 'Equipo reunido con un instructor para revisar información y planificar acciones',
    width: 460,
    height: 289,
  },
  {
    id: 'acompanamiento',
    title: 'Recibe acompañamiento desde el inicio',
    description: 'Adaptamos el servicio a las necesidades de tu empresa. Te acompañamos desde la configuración inicial hasta la capacitación de tu personal para facilitar la transición.',
    image: 'acompanamiento-inicial.png',
    imageAlt: 'Profesional capacitando a un equipo durante la implementación del servicio',
    width: 475,
    height: 261,
  },
  {
    id: 'pagos-puntuales',
    title: 'Refuerza la confianza de tu equipo con pagos puntuales',
    description: 'Procesar los pagos de manera puntual y precisa contribuye a una gestión de nómina más transparente y confiable para tus colaboradores.',
    image: 'pagos-puntuales.png',
    imageAlt: 'Apretón de manos que representa una relación de confianza profesional',
    width: 475,
    height: 261,
  },
] as const;

export const PAYROLL_SERVICE_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué abarca el servicio de payroll?',
    answer: 'Abarca desde la recopilación de los datos de asistencia hasta la generación de planillas, con el respaldo de Empresarial-RH.',
  },
  {
    question: '¿Puedo consultar mis costos laborales en tiempo real?',
    answer: 'Sí. Empresarial-RH te da acceso a reportes y análisis en tiempo real para revisar tus costos laborales y planificar tu presupuesto.',
  },
  {
    question: '¿El servicio se adapta a las necesidades de mi empresa?',
    answer: 'Sí. El equipo de CA Sistemas capacita a tu personal para facilitar la transición al sistema de nómina.',
  },
];
