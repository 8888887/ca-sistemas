import { ServiceGroup, Solution } from '../../shared/models/navigation.model';

export const PLATFORM_SOLUTIONS: readonly Solution[] = [
  { slug: 'planillas-y-control-de-asistencia', label: 'Planillas y Control de Asistencia', icon: 'payroll', description: 'Centraliza la gestión de planillas y el control de asistencia de tu equipo.' },
  { slug: 'salud-y-seguridad-ocupacional', label: 'Salud y Seguridad Ocupacional', icon: 'shield', description: 'Organiza la gestión de salud y seguridad ocupacional de tu empresa.' },
  { slug: 'gestion-del-talento-humano', label: 'Gestión del Talento Humano', icon: 'talent', description: 'Empresarial-RH gestiona onboarding, descriptivos de puestos, encuestas y evaluaciones de desempeño. Organiza y optimiza el desarrollo de tu equipo con datos seguros y accesibles en la nube.' },
  { slug: 'hostigamiento-laboral-y-sexual', label: 'Hostigamiento Laboral y Sexual', icon: 'hand', description: 'Conoce nuestra solución para la gestión del hostigamiento laboral y sexual.' },
  { slug: 'e-learning', label: 'E-Learning', icon: 'learning', description: 'Acompaña el aprendizaje y el desarrollo de tus colaboradores.' },
];

export const SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    id: 'recursos-humanos', label: 'Recursos Humanos', icon: 'people',
    items: [
      { slug: 'auditoria-laboral', label: 'Auditoría Laboral', icon: 'audit', description: 'Conoce el servicio de auditoría laboral de CA Sistemas Empresariales.' },
      { slug: 'ley-30709', label: 'Implementación de la Ley 30709', icon: 'law', description: 'Solicita información sobre nuestro servicio de implementación de la Ley 30709.' },
      { slug: 'hr-analytics', label: 'HR Analytics', icon: 'analytics', description: 'Conoce cómo el análisis de información puede acompañar la gestión de tus recursos humanos.' },
      { slug: 'payroll', label: 'Payroll Procesamiento de Planillas / Nóminas', icon: 'money', description: 'Consulta nuestro servicio de procesamiento de planillas y nóminas para tu empresa.' },
      { slug: 'evaluacion-de-desempeno', label: 'Evaluación de Desempeño', icon: 'performance', description: 'Conoce nuestro servicio de evaluación de desempeño para tu equipo.' },
      { slug: 'encuesta-de-clima-laboral', label: 'Encuesta de Clima Laboral', icon: 'survey', description: 'Escucha a tus colaboradores y conoce la experiencia de tu equipo.' },
    ],
  },
  {
    id: 'gestion-empresarial', label: 'Gestión Empresarial', icon: 'business',
    items: [
      { slug: 'firmas-digitales-certificadas', label: 'Firmas Digitales Certificadas', icon: 'signature', description: 'Consulta nuestro servicio de firmas digitales certificadas.' },
      { slug: 'mejora-de-procesos', label: 'Levantamiento y mejora de procesos', icon: 'settings', description: 'Identifica oportunidades para organizar y mejorar los procesos de tu empresa.' },
    ],
  },
  {
    id: 'tecnologia-y-seguridad', label: 'Tecnología y Seguridad', icon: 'security',
    items: [
      { slug: 'consultoria-en-tecnologia', label: 'Consultoría en Tecnología', icon: 'technology', description: 'Conversa con nuestro equipo sobre las necesidades tecnológicas de tu empresa.' },
      { slug: 'gestion-de-base-de-datos', label: 'Administración y Gestión de Base de Datos', icon: 'database', description: 'Conoce nuestro servicio de administración y gestión de bases de datos.' },
      { slug: 'pentesting', label: 'Pentesting y Análisis de Vulnerabilidades', icon: 'vulnerability', description: 'Consulta nuestro servicio de pentesting y análisis de vulnerabilidades.' },
      { slug: 'data-center', label: 'Alojamiento en Data Center Tier IV / ISO 27001', icon: 'building', description: 'Solicita información sobre alojamiento para la infraestructura de tu empresa.' },
      { slug: 'backup-empresarial', label: 'Backup de Base de Datos Empresarial', icon: 'cloud', description: 'Conoce las opciones de respaldo de bases de datos para tu empresa.' },
    ],
  },
];

export const ALL_SOLUTIONS = [...PLATFORM_SOLUTIONS, ...SERVICE_GROUPS.flatMap(group => group.items)];
