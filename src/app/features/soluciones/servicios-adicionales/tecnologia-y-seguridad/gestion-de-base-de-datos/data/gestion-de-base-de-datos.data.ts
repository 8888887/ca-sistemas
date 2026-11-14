import { FaqItem } from '../../../../../../shared/models/faq.model';

export const DATABASE_OVERVIEW = [
  'Tu base de datos es el motor de tus aplicaciones, reportes y decisiones. Un mal manejo puede provocar lentitud, errores, pérdida de información o incluso caídas en el servicio.',
  'Con nuestra experiencia en SQL Server (todas las versiones), garantizamos continuidad operativa, eficiencia y soporte 24/7.',
] as const;

export const DATABASE_BENEFITS = [
  {
    id: 'mantenimiento',
    title: 'Administración y mantenimiento preventivo',
    description: 'Gestión de instancias, monitoreo del rendimiento, limpieza de logs, control del espacio y planificación de crecimiento.',
    icon: 'mantenimiento-preventivo.svg',
  },
  {
    id: 'seguridad',
    title: 'Seguridad y respaldo de la información',
    description: 'Aplicación de parches, gestión de accesos, auditorías de seguridad y backups programados con recuperación asegurada.',
    icon: 'seguridad-respaldo.svg',
  },
  {
    id: 'consultas',
    title: 'Optimización de consultas y estructuras',
    description: 'Análisis de rendimiento, tuning de índices y recomendaciones para mejorar el tiempo de respuesta de tus sistemas.',
    icon: 'consultas-respaldo.svg',
  },
  {
    id: 'disponibilidad',
    title: 'Alta disponibilidad y recuperación ante desastres',
    description: 'Implementación de soluciones como Always On, clústeres o réplicas, adaptadas al tamaño de tu operación.',
    icon: 'recuperacion-desastres.svg',
  },
  {
    id: 'soporte',
    title: 'Soporte técnico especializado',
    description: 'Nuestros DBAs certificados están disponibles para asistirte en todo momento, con atención proactiva y correctiva.',
    icon: 'soporte-tecnico.svg',
  },
] as const;

export const DATABASE_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué incluye el servicio de administración de SQL Server?',
    answer: 'Incluye la gestión de instancias, el monitoreo del rendimiento, la limpieza de logs, el control del espacio de almacenamiento y la planificación del crecimiento de tus bases de datos.',
  },
  {
    question: '¿Cómo protegen y respaldan mi información?',
    answer: 'Aplicamos parches, gestionamos los accesos, realizamos auditorías de seguridad y programamos copias de respaldo para facilitar la recuperación de la información.',
  },
  {
    question: '¿Qué opciones ofrecen para mantener la operación ante una falla?',
    answer: 'Implementamos soluciones de alta disponibilidad y recuperación ante desastres, como Always On, clústeres o réplicas, según el tamaño y las necesidades de tu operación.',
  },
];
