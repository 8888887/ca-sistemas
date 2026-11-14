import { FaqItem } from '../../../../../../shared/models/faq.model';

export const BACKUP_OVERVIEW = 'Las bases de datos son el corazón de tu empresa. Contienen información sensible, financiera, operativa y del talento humano. Sin una copia de respaldo confiable, un error humano, ataque cibernético o falla técnica puede causar pérdidas irreparables. Nuestra solución automatiza todo el proceso para que nunca te preocupes por perder información.';

export const BACKUP_BENEFITS = [
  {
    id: 'copias',
    title: 'Copias automáticas programadas',
    description: 'Define la frecuencia que necesites: diaria, semanal, por horas o en tiempo real. Tu información siempre estará respaldada.',
    icon: 'copias-automaticas.svg',
  },
  {
    id: 'almacenamiento',
    title: 'Almacenamiento seguro en la nube o en servidores locales',
    description: 'Adaptamos el sistema según tus necesidades: puedes elegir respaldo en la nube, on-premise o híbrido.',
    icon: 'almacenamiento-seguro.svg',
  },
  {
    id: 'recuperacion',
    title: 'Recuperación rápida ante cualquier incidente',
    description: 'Restaura tu base de datos en minutos, sin afectar tu operación. Soporte inmediato ante emergencias.',
    icon: 'recuperacion-rapida.svg',
  },
  {
    id: 'compatibilidad',
    title: 'Compatible con los principales motores de base de datos',
    description: 'SQL Server, MySQL, PostgreSQL, Oracle, y más. Total flexibilidad técnica para integrarnos con tus sistemas.',
    icon: 'compatible-con-bases-datos.svg',
  },
  {
    id: 'cumplimiento',
    title: 'Cumplimiento normativo',
    description: 'Nos alineamos con estándares de seguridad de información y políticas internas o sectoriales (como SUNAT, SBS, etc.).',
    icon: 'cumplimiento-normativo.svg',
  },
] as const;

export const BACKUP_FAQS: readonly FaqItem[] = [
  {
    question: '¿Con qué frecuencia se realizan las copias de seguridad?',
    answer: 'Puedes programar copias automáticas por horas, a diario o cada semana. También puedes optar por el respaldo en tiempo real, según las necesidades de tu operación.',
  },
  {
    question: '¿Dónde se guardan las copias de seguridad?',
    answer: 'Puedes almacenar tus respaldos en la nube, en los servidores de tu empresa o combinar ambas opciones en un esquema híbrido.',
  },
  {
    question: '¿Qué pasa si mi base de datos se daña o se elimina por error?',
    answer: 'Podemos restaurarla a partir de una copia de seguridad disponible. El tiempo de recuperación depende del tamaño de la base de datos y de la configuración del respaldo.',
  },
];
