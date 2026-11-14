import { FaqItem } from '../../../../../../shared/models/faq.model';

interface PayEquityFeature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly portrait?: boolean;
}

export const LAW_FEATURES: readonly PayEquityFeature[] = [
  {
    id: 'factores-puntos',
    title: 'Creamos un modelo de factores y puntos',
    description: 'Definimos criterios medibles para evaluar cada puesto, como el nivel de responsabilidad, la complejidad y las habilidades requeridas.',
    image: 'modelo-factores-puntos.png',
    imageAlt: 'Equipo definiendo criterios para un modelo de valoración de puestos',
  },
  {
    id: 'valoracion-puestos',
    title: 'Valoramos y categorizamos los puestos',
    description: 'Aplicamos el modelo para identificar diferencias entre puestos y agruparlos según sus responsabilidades y requisitos.',
    image: 'valoracion-puestos.png',
    imageAlt: 'Profesionales revisando la valoración y categorización de puestos en una computadora',
    portrait: true,
  },
  {
    id: 'bandas-salariales',
    title: 'Diseñamos bandas salariales',
    description: 'Establecemos rangos de remuneración según la valoración de los puestos, con criterios claros para decidir cuánto corresponde a cada rol.',
    image: 'bandas-salariales.png',
    imageAlt: 'Profesionales organizando categorías y bandas salariales',
  },
  {
    id: 'politicas-internas',
    title: 'Proponemos políticas internas',
    description: 'Desarrollamos propuestas para los procesos de contratación, promoción y formación que fomenten la igualdad de oportunidades.',
    image: 'politicas-internas.png',
    imageAlt: 'Profesional elaborando propuestas de políticas internas de igualdad de oportunidades',
    portrait: true,
  },
  {
    id: 'diagnostico-salarial',
    title: 'Realizamos un diagnóstico salarial',
    description: 'Revisamos las remuneraciones actuales de manera individual para detectar posibles discrepancias e identificar áreas de mejora.',
    image: 'diagnostico-salarial.png',
    imageAlt: 'Revisión detallada de documentos para un diagnóstico salarial',
  },
];

export const LAW_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué incluye el servicio de implementación de la Ley N.° 30709?',
    answer: 'Incluye el modelo de factores y puntos, la valoración y categorización de puestos, el diseño de bandas salariales, las propuestas de políticas internas y el diagnóstico salarial.',
  },
  {
    question: '¿Cuál es la diferencia entre la valoración de puestos y el diagnóstico salarial?',
    answer: 'La valoración compara y agrupa los puestos según sus responsabilidades y requisitos. El diagnóstico salarial revisa las remuneraciones actuales de manera individual para detectar posibles discrepancias y áreas de mejora.',
  },
  {
    question: '¿Cómo se definen las bandas salariales?',
    answer: 'Se establecen rangos de remuneración según la valoración de los puestos, con criterios claros para cada rol y un enfoque adaptado a las necesidades de tu organización.',
  },
];
