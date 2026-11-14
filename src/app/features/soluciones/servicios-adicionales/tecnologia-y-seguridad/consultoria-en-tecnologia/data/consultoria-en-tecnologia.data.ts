import { FaqItem } from '../../../../../../shared/models/faq.model';

interface ConsultingBenefit {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly compactHeading?: boolean;
}

export const TECHNOLOGY_CONSULTING_BENEFITS: readonly ConsultingBenefit[] = [
  {
    id: 'transformacion',
    title: 'Transformación Digital y Modernización Tecnológica',
    description: 'Ayudamos a las organizaciones a evolucionar su modelo de negocio mediante la integración de tecnologías emergentes.',
    icon: 'digital-modernizacion.svg',
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico Integral del Área de TI (AS IS)',
    description: 'Realizamos una auditoría profunda del estado actual de la tecnología en su empresa. Evaluamos la infraestructura, los sistemas, los procesos y la cultura organizacional para identificar brechas, riesgos y oportunidades de mejora inmediata.',
    icon: 'diagnostico-integral.svg',
  },
  {
    id: 'modelo-objetivo',
    title: 'Diseño del Modelo Objetivo de TI (TO BE)',
    description: 'Definimos la arquitectura y el modelo operativo ideal que su empresa necesita para alcanzar sus metas de negocio. Diseñamos una visión a futuro que alinea la tecnología con las necesidades estratégicas, asegurando una estructura escalable y eficiente.',
    icon: 'modelo-objetivo.svg',
  },
  {
    id: 'optimizacion',
    title: 'Reestructuración y Optimización de Áreas de TI',
    description: 'Rediseñamos el departamento de tecnología para que deje de ser un centro de costos y se convierta en un motor de innovación. Optimizamos flujos de trabajo, eliminamos redundancias y aseguramos que el área de TI responda con agilidad a las demandas del mercado.',
    icon: 'optimizacion-areas.svg',
  },
  {
    id: 'roadmap',
    title: 'Elaboración de Roadmap Tecnológico',
    description: 'Creamos una hoja de ruta detallada y cronológica que guía la implementación de soluciones tecnológicas. Este plan estratégico asegura que cada inversión se realice en el momento adecuado, minimizando riesgos y maximizando el retorno de inversión (ROI).',
    icon: 'roadmap-tecnologico.svg',
  },
  {
    id: 'planes',
    title: 'Planes Estratégicos de TI (PETI)',
    description: 'Desarrollamos el Plan Estratégico de Tecnologías de la Información alineado al 100% con el plan de negocio de la compañía. Establecemos los objetivos de TI a mediano y largo plazo, definiendo los recursos necesarios para lograrlos.',
    icon: 'planes-estrategicos.svg',
  },
  {
    id: 'presupuestos',
    title: 'Soporte en la Elaboración y Optimización de Presupuestos de TI',
    description: 'Analizamos el talento humano para asegurar que las personas adecuadas estén en los puestos correctos. Evaluamos competencias técnicas y habilidades blandas, identificando necesidades de capacitación y definiendo indicadores clave de desempeño (KPIs).',
    icon: 'elaboracion-optimizacion.svg',
    compactHeading: true,
  },
  {
    id: 'gobierno',
    title: 'Gobierno de TI, Portafolio de Iniciativas y Priorización',
    description: 'Establecemos marcos de trabajo (como COBIT o ITIL) para asegurar que la tecnología esté bajo control y cumpla con las normativas. Implementamos metodologías de gestión de portafolio para que la dirección pueda priorizar los proyectos que realmente generan mayor valor estratégico para la empresa.',
    icon: 'iniciativas-priorizacion.svg',
    compactHeading: true,
  },
];

export const TECHNOLOGY_EXPERTS = [
  { id: 'robert-palomino', name: 'Robert Palomino de la Gala Núñez', image: 'robert-palomino.png' },
  { id: 'martin-vera', name: 'Martin Vera', image: 'martin-vera.png' },
  { id: 'luis-madrid', name: 'Luis Madrid Guerra', image: 'luis-madrid.png' },
] as const;

export const TECHNOLOGY_CONSULTING_FAQS: readonly FaqItem[] = [
  {
    question: '¿En qué consiste el servicio de consultoría en tecnología?',
    answer: 'CA Sistemas ayuda a tu empresa a modernizar su área de TI, optimizar recursos, fortalecer el talento interno y alinear la tecnología con los objetivos del negocio.',
  },
  {
    question: '¿Qué se evalúa en el diagnóstico integral de TI (As is)?',
    answer: 'Se revisan la infraestructura, los sistemas, los procesos y la cultura organizacional para identificar brechas, riesgos y oportunidades de mejora.',
  },
  {
    question: '¿Puedo solicitar un diagnóstico inicial sin compromiso?',
    answer: 'Sí. Puedes agendar una sesión inicial sin compromiso para conversar sobre tu estrategia tecnológica y explorar cómo optimizar tu inversión en TI.',
  },
];
