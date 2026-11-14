import { FaqItem } from '../../../../../../shared/models/faq.model';

export const PROCESS_OVERVIEW = [
  'El Levantamiento de Procesos es un servicio estratégico que permite entender, documentar y optimizar cómo funciona realmente la organización, identificando el flujo real de actividades, responsabilidades, decisiones y controles que impactan directamente en los resultados del negocio.',
  'Más que un ejercicio documental, este servicio revela oportunidades concretas de mejora continua, eliminando ineficiencias, reduciendo la variabilidad operativa y fortaleciendo la capacidad de la empresa para crecer de manera ordenada y sostenible.',
  'A través de una metodología estructurada y participativa, transformamos la operación diaria en procesos claros, gestionables y alineados a los objetivos estratégicos de la organización.',
] as const;

export const PROCESS_BENEFITS = [
  {
    id: 'operacion-real',
    title: 'Activa la mejora continua desde la operación real',
    description: 'Los procesos se convierten en la base para identificar mejoras constantes, con impacto directo en tiempos, costos y calidad.',
    icon: 'operacion-real.svg',
  },
  {
    id: 'crecimiento',
    title: 'Facilita el crecimiento sin desorden operativo',
    description: 'Permite escalar operaciones con procesos claros, reduciendo la dependencia de personas clave y evitando improvisaciones.',
    icon: 'crecimiento.svg',
  },
  {
    id: 'eficiencia',
    title: 'Incrementa la eficiencia y productividad',
    description: 'Elimina reprocesos, cuellos de botella y actividades que no agregan valor, liberando capacidad operativa.',
    icon: 'eficiencia-productividad.svg',
  },
  {
    id: 'decisiones',
    title: 'Mejora la toma de decisiones gerenciales',
    description: 'Entrega visibilidad y entendimiento profundo de la operación, habilitando decisiones más rápidas y mejor informadas.',
    icon: 'decisiones-gerenciales.svg',
  },
  {
    id: 'organizacion',
    title: 'Prepara a la organización para el cambio',
    description: 'Sienta las bases para iniciativas de automatización, digitalización, mejora continua, Lean, Agile o certificaciones.',
    icon: 'organizacion.svg',
  },
] as const;

export const PROCESS_FAQS: readonly FaqItem[] = [
  {
    question: '¿En qué consiste el levantamiento de procesos?',
    answer: 'Analizamos cómo se realiza el trabajo en tu empresa y documentamos las actividades, los responsables, las decisiones y los controles de cada proceso revisado.',
  },
  {
    question: '¿Qué problemas ayuda a identificar?',
    answer: 'Permite detectar cuellos de botella, tareas duplicadas, pasos que generan demoras y responsabilidades poco claras entre áreas.',
  },
  {
    question: '¿Este servicio ayuda a preparar a mi empresa para automatizar?',
    answer: 'Sí. Conocer cómo funciona cada proceso te permite identificar qué pasos conviene simplificar y cuáles pueden digitalizarse o automatizarse.',
  },
];
