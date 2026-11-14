import { FaqItem } from '../../../../../../shared/models/faq.model';

export const DIGITAL_SIGNATURE_BENEFITS = [
  {
    id: 'validez',
    title: 'Validez jurídica certificada',
    description: 'Cumplimos con los más altos estándares legales nacionales e internacionales. Tus firmas electrónicas tendrán la misma validez que una firma manuscrita.',
    icon: 'validez-juridica.svg',
  },
  {
    id: 'corporativos',
    title: 'Ideal para entornos corporativos y de RR.HH.',
    description: 'Desde onboarding digital hasta autorizaciones internas, nuestras firmas digitales se integran con tus flujos de trabajo actuales.',
    icon: 'corporativos-rr-hh.svg',
  },
  {
    id: 'integracion',
    title: 'Integración rápida y soporte personalizado',
    description: 'Nos adaptamos a tus plataformas y sistemas de gestión. Nuestro equipo técnico te acompaña desde la implementación hasta el soporte diario.',
    icon: 'integracion-rapida.svg',
  },
  {
    id: 'automatizacion',
    title: 'Automatiza y digitaliza tus procesos',
    description: 'Reduce el uso de papel y agiliza aprobaciones, contratos laborales, evaluaciones y más. Perfecto para equipos de Recursos Humanos, Legales y Gerencia.',
    icon: 'automatiza-digitaliza.svg',
  },
  {
    id: 'seguridad',
    title: 'Seguridad avanzada y trazabilidad total',
    description: 'Cada firma queda registrada con trazabilidad completa, verificación de identidad y cifrado de extremo a extremo.',
    icon: 'seguridad-avanzada.svg',
  },
] as const;

export const DIGITAL_SIGNATURE_FAQS: readonly FaqItem[] = [
  {
    question: '¿Qué documentos puedo firmar digitalmente?',
    answer: 'Puedes firmar contratos laborales, autorizaciones internas y otros documentos administrativos de tu empresa.',
  },
  {
    question: '¿Puedo firmar si estoy fuera de la oficina?',
    answer: 'Sí. Puedes completar la firma a distancia, sin imprimir el documento ni acudir a la oficina.',
  },
  {
    question: '¿Puedo consultar quién firmó un documento?',
    answer: 'Sí. Cada firma queda registrada y vinculada a la identidad verificada del firmante, lo que facilita el seguimiento del documento.',
  },
];
