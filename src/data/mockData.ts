import { StudentProfile } from '../types';

export const PROFILES: StudentProfile[] = [
  {
    id: 'clinton',
    name: 'Clinton Alex',
    maskedName: 'CLINTON ALEX E*** V***',
    studentCode: '202120751',
    bannerId: 'N03885376',
    career: 'ING. SISTEMAS DE INFORMACIÓN',
    campus: 'Campus Villa',
    email: 'U202120751@upc.edu.pe',
    avatarUrl: `${import.meta.env.BASE_URL}assets/clinton-photo.png`
  },
  {
    id: 'yanely',
    name: 'Yanely',
    maskedName: 'YANELY F*** D***',
    studentCode: 'U20211D914',
    bannerId: 'N038854403',
    career: 'ING. SISTEMAS DE INFORMACIÓN',
    campus: 'Campus Villa',
    email: 'u20211d914@upc.edu.pe',
    avatarUrl: `${import.meta.env.BASE_URL}assets/yanely-photo.png`
  }
];

export const COURSES = [
  {
    id: '1',
    name: 'Gestión de Proyectos con Arquitectura Empr...',
    fullName: 'Gestión de Proyectos con Arquitectura Empresarial',
    code: 'IS201',
    section: 'SX71',
    modality: 'VIRTUAL',
    teacher: 'Prof. Carlos Ramírez',
    classroom: 'Aula Virtual Blackboard'
  },
  {
    id: '2',
    name: 'Inteligencia Artificial Aplicada',
    fullName: 'Inteligencia Artificial y Modelos Generativos',
    code: 'IS204',
    section: 'SX72',
    modality: 'VIRTUAL',
    teacher: 'Prof. Ana Morales',
    classroom: 'Laboratorio de Innovación 4'
  },
  {
    id: '3',
    name: 'Desarrollo de Aplicaciones Móviles PWA',
    fullName: 'Desarrollo de Aplicaciones Web Progresivas y Móviles',
    code: 'IS208',
    section: 'SX73',
    modality: 'PRESENCIAL',
    teacher: 'Prof. David Vega',
    classroom: 'Pabellón B - Aula 302'
  }
];

export const SERVICES = [
  { id: 'tramites', title: 'Trámites', icon: 'FileText' },
  { id: 'biblioteca', title: 'Biblioteca', icon: 'BookOpen' },
  { id: 'pagos', title: 'Pagos UPC', icon: 'CreditCard' },
  { id: 'intranet', title: 'Intranet', icon: 'Globe' }
];
