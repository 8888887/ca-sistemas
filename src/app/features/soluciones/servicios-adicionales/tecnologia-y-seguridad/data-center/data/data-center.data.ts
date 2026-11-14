import { FaqItem } from '../../../../../../shared/models/faq.model';

export const DATA_CENTER_HERO_DESCRIPTION = 'En CA Sistemas Empresariales te brindamos una solución robusta de alojamiento en Data Center Tier IV, diseñada para garantizar la continuidad operativa, la seguridad y el rendimiento de tu infraestructura crítica.';

export const DATA_CENTER_OVERVIEW = [
  'En CA Sistemas Empresariales ponemos a tu disposición un servicio de hosting empresarial en Data Center Tier IV, certificado con ISO 27001, para garantizar que tu información esté siempre segura, accesible y disponible.',
  'Asegura el funcionamiento ininterrumpido de tus aplicaciones, bases de datos, servidores y sistemas con la más alta calidad del mercado.',
  '¿Qué significa alojarse en un Data Center Tier IV?',
  'Es operar en el más alto estándar de infraestructura tecnológica. Un Data Center Tier IV garantiza redundancia total, tolerancia a fallos y un uptime del 99.995%, ideal para empresas que no pueden detener su operación ni un segundo.',
  'Sumado a la certificación ISO 27001, obtienes la máxima seguridad en la gestión de la información.',
] as const;

export const DATA_CENTER_BENEFITS = [
  {
    id: 'disponibilidad',
    title: 'Alta disponibilidad y continuidad operativa',
    description: 'Con infraestructura redundante, energía ininterrumpida, climatización inteligente y redes de respaldo.',
    icon: 'alta-disponibilidad.svg',
  },
  {
    id: 'seguridad',
    title: 'Seguridad física y lógica de primer nivel',
    description: 'Control de accesos biométrico, videovigilancia 24/7, detección de incendios y monitoreo continuo. Además, políticas de ciberseguridad alineadas a ISO 27001.',
    icon: 'seguridad-fisica.svg',
  },
  {
    id: 'infraestructura',
    title: 'Infraestructura escalable y personalizada',
    description: 'Servidores dedicados, VPS, entornos híbridos o cloud privado según tus necesidades.',
    icon: 'infraestructura-escalable.svg',
  },
  {
    id: 'soporte',
    title: 'Monitoreo y soporte técnico especializado 24/7',
    description: 'Equipo técnico altamente capacitado disponible en todo momento.',
    icon: 'monitoreo-soporte.svg',
  },
  {
    id: 'ubicacion',
    title: 'Ubicación estratégica y cumplimiento normativo',
    description: 'Data centers en España, Portugal, Irlanda, Colombia, Chile y Miami.',
    icon: 'ubicacion-estrategica.svg',
  },
] as const;

export const DATA_CENTER_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué significa alojarse en un Data Center Tier IV?',
    answer: 'Significa contar con infraestructura redundante y tolerancia a fallos para mantener la continuidad de tus aplicaciones, bases de datos y servidores.',
  },
  {
    question: '¿Qué opciones de infraestructura ofrecen?',
    answer: 'Puedes contar con servidores dedicados, VPS, entornos híbridos o cloud privado, según las necesidades de tu empresa.',
  },
  {
    question: '¿Cómo se protege y monitorea la infraestructura?',
    answer: 'El servicio incluye control de accesos biométrico, videovigilancia 24/7, detección de incendios, monitoreo continuo y soporte técnico especializado.',
  },
];
