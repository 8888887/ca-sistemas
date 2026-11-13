import { IconName } from '../../../shared/ui/icon/icon.data';

export interface AboutText {
  readonly text: string;
  readonly strong?: boolean;
}

export interface AboutPurpose {
  readonly title: string;
  readonly icon: IconName;
  readonly tone: string;
  readonly copy: readonly AboutText[];
}

export interface AboutValue {
  readonly title: string;
  readonly icon?: IconName;
  readonly image?: string;
  readonly tone?: string;
  readonly copy: readonly AboutText[];
}

export interface AboutService {
  readonly slug: string;
  readonly title: string;
  readonly image: string;
  readonly description: string;
}

export const ABOUT_HISTORY = 'inició sus actividades en el año 1998, desarrolló y comercializó por medio de IBM un ERP denominado empresarial.com sobre DB2, luego, con la llegada de los ERPs de clase mundial, se decidió potenciar solo el módulo de Recursos Humanos; es así, que a partir del año 2006, la empresa toma un giro hacia la consolidación definitiva, desarrollando un producto especializado y robusto, lo cual ha permitido alcanzar un gran éxito con diversos clientes de primer orden, así como con la integración con los ERPs de clase mundial SAP, MS y ORACLE.';

export const ABOUT_PURPOSES: readonly AboutPurpose[] = [
  {
    title: 'Misión', icon: 'target', tone: 'green',
    copy: [{ text: 'Está orientada a añadir valor a sus proyectos por el acompañamiento que otorga a sus clientes durante la implementación y puesta en marcha del software, ya que brinda capacitación y consultoría especializada en cada módulo, asegurando el éxito del producto.' }],
  },
  {
    title: 'Visión', icon: 'eye', tone: 'violet',
    copy: [
      { text: 'Transforma la gestión de tu equipo automatizando la asistencia y las planillas. Con su interfaz intuitiva y ' },
      { text: 'fácil integración, optimiza horarios, ausencias y horas extras,', strong: true },
      { text: ' impulsando la eficiencia y reduciendo errores.' },
    ],
  },
];

export const ABOUT_TEAM_IMAGES = [
  { file: 'soporte-capacitacion.png', alt: 'Especialista de CA Sistemas brindando soporte y capacitación en una computadora' },
  { file: 'equipo-oficina.png', alt: 'Integrantes del equipo de CA Sistemas en sus oficinas' },
  { file: 'asesoria-equipo.png', alt: 'Profesionales de CA Sistemas conversando durante una asesoría' },
] as const;

export const ABOUT_EXPERIENCE = 'Cuenta con un equipo de profesionales con amplia experiencia en RR.HH. y en Proyectos de Tecnología de la Información que, además, es capacitado periódicamente en legislación laboral, régimen general, y regímenes especiales, como construcción civil, minero, agrícola, pesquero, educativo, entre otros; así como en técnicas y nuevas metodologías para la correcta administración del talento humano.';

export const ABOUT_DIFFERENTIATORS = 'Existen elementos diferenciadores, que sobreponen a CASISTEMAS sobre empresas competidoras, los cuales son: CA Sistemas Empresariales, es la empresa con el ERP de RR.HH. más completo en el Perú, ya que está integrado por 4 grandes módulos, que abarcan todos los procesos de administración de personal y su gestión. Estos módulos son: Planillas y Control de Asistencia, Gestión de Talento Humano, Seguridad, Salud Ocupacional y Medio Ambiente, Hostigamiento y Discriminación Laboral y Sexual.';

export const ABOUT_VALUES: readonly AboutValue[] = [
  {
    title: 'Honestidad', icon: 'heart-hand', tone: 'orange',
    copy: [{ text: 'Actuamos con ' }, { text: 'transparencia y coherencia', strong: true }, { text: ' en cada decisión.' }],
  },
  {
    title: 'Orientación al cliente', icon: 'customer', tone: 'green',
    copy: [{ text: 'Nos enfocamos en ' }, { text: 'generar soluciones', strong: true }, { text: ' que respondan a sus necesidades.' }],
  },
  {
    title: 'Innovación', image: 'innovacion.png',
    copy: [{ text: 'Impulsamos la ' }, { text: 'mejora continua', strong: true }, { text: ' para ofrecer ' }, { text: 'soluciones', strong: true }, { text: ' con mayor eficiencia.' }],
  },
  {
    title: 'Compromiso', icon: 'handshake', tone: 'pink',
    copy: [{ text: 'Nos involucramos con cada proyecto, para poder lograr mejores ' }, { text: 'resultados sostenibles.', strong: true }],
  },
  {
    title: 'Responsabilidad', image: 'responsabilidad.png',
    copy: [{ text: 'Cumplimos con nuestros ' }, { text: 'compromisos', strong: true }, { text: ' contribuyendo al ' }, { text: 'desarrollo', strong: true }, { text: ' del cliente.' }],
  },
  {
    title: 'Seguridad', icon: 'security', tone: 'blue',
    copy: [{ text: 'Protegemos la información de nuestros usuarios para ' }, { text: 'garantizar la continuidad', strong: true }, { text: ' en cada proceso.' }],
  },
  {
    title: 'Diferencia', icon: 'exchange', tone: 'orange',
    copy: [{ text: 'Contamos con un enfoque personalizado, brindando la ' }, { text: 'calidad', strong: true }, { text: ' de nuestro equipo y servicio.' }],
  },
];

export const ABOUT_SERVICES: readonly AboutService[] = [
  {
    slug: 'auditoria-laboral', title: 'Auditoría Laboral', image: 'auditoria-laboral.png',
    description: 'Enfocada en verificar el cumplimiento de las obligaciones laborales y de seguridad y salud en el trabajo (SST). Diseñadas para evaluar el nivel de cumplimiento según los protocolos de inspección de SUNAFIL.',
  },
  {
    slug: 'hr-analytics', title: 'HR Analytics', image: 'hr-analytics.png',
    description: 'El análisis de datos de RRHH (HR Analytics) ofrece a la gerencia y a los equipos de recursos humanos una visión profunda de la organización, permitiéndoles entender el rendimiento de su personal y cómo contribuyen al valor global de la empresa.',
  },
  {
    slug: 'ley-30709', title: 'Implementación de la Ley 30709', image: 'ley-30709.png',
    description: 'Cumple con la ley contra la discriminación salarial por género con Empresarial-RH. Implementa una política salarial justa, asegurando igualdad de remuneración para hombres y mujeres en trabajos de igual valor, todo dentro de una plataforma fácil de usar.',
  },
  {
    slug: 'payroll', title: 'Servicio de Payroll procesamiento de planillas / Nóminas con transformación digital', image: 'payroll.png',
    description: 'Procesamos la planilla y nómina con nuestros recursos, ofreciendo acceso en línea por web y aplicación a través de Empresarial-RH.',
  },
];
