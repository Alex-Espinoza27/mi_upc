import React, { useState } from 'react';
import { Bell, ChevronRight, ChevronDown } from 'lucide-react';
import { UpcHeaderLogo } from './UpcLogo';
import { StudentProfile } from '../types';
import { COURSES } from '../data/mockData';

interface HomeScreenProps {
  profile: StudentProfile;
  onOpenTiu: () => void;
  onOpenNotifications?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ profile }) => {
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow'>('today');
  const [expandedCourse, setExpandedCourse] = useState<boolean>(false);
  const [currentCourseIndex, setCurrentCourseIndex] = useState<number>(0);

  // Dynamic dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDayPill = (date: Date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dName = days[date.getDay()];
    const dNum = date.getDate().toString().padStart(2, '0');
    const mNum = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${dName} ${dNum}/${mNum}`;
  };

  const currentCourse = COURSES[currentCourseIndex] || COURSES[0];

  return (
    <div className="min-h-screen bg-[#F9FAFE] pb-28 max-w-md mx-auto">
      {/* Top Header */}
      <header className="px-[18px] pt-3 pb-2 flex items-center justify-between">
        <UpcHeaderLogo />
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Notificaciones"
        >
          <Bell className="w-6 h-6 text-[#000000]" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#E40A18] rounded-full border-2 border-white" />
        </button>
      </header>

      {/* Greeting Banner */}
      <section className="px-[18px] pt-3 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[22px] leading-tight">
              <span className="font-normal text-[#D3101E]">Hola, </span>
              <span className="font-bold text-[#D3101E]">{profile.name}</span>
            </div>
            <p className="text-[15px] font-normal text-[#4A5364] mt-1 leading-snug">
              ¡Te damos la bienvenida!
            </p>
          </div>
          <div className="relative w-28 h-20 flex-shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}assets/students-3d.png`}
              alt="Estudiantes UPC"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="space-y-3.5">
        {/* HORARIOS Card */}
        <section className="card-standard !py-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-[34px] h-[34px] flex items-center justify-center flex-shrink-0">
                <img
                  src={`${import.meta.env.BASE_URL}assets/clock-icon.png`}
                  alt="Reloj"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              {/* Título HORARIOS con grosor moderado (font-bold en lugar de font-extrabold) */}
              <h3 className="display font-bold text-[26px] text-[#000000] leading-none tracking-normal">
                HORARIOS
              </h3>
            </div>
            <button className="text-[15px] font-semibold text-[#3F2E9E] flex items-center gap-1 hover:underline cursor-pointer">
              <span>Ver todo</span>
              <ChevronRight className="w-4 h-4 text-[#2E0EC5] stroke-[2.8]" />
            </button>
          </div>

          {/* Date Pills con márgenes reducidos */}
          <div className="grid grid-cols-2 gap-2 my-2">
            <button
              onClick={() => setSelectedDay('today')}
              className={`py-1.5 px-3 rounded-full text-[13px] font-bold transition-all cursor-pointer text-center leading-normal ${
                selectedDay === 'today'
                  ? 'bg-[#E40A18] text-[#FFFFFF] shadow-sm'
                  : 'bg-white border border-[#E40A18] text-[#D3101E]'
              }`}
            >
              Hoy {formatDayPill(today)}
            </button>
            <button
              onClick={() => setSelectedDay('tomorrow')}
              className={`py-1.5 px-3 rounded-full text-[13px] font-bold transition-all cursor-pointer text-center leading-normal ${
                selectedDay === 'tomorrow'
                  ? 'bg-[#E40A18] text-[#FFFFFF] shadow-sm'
                  : 'bg-white border border-[#E40A18] text-[#D3101E]'
              }`}
            >
              Mañana {formatDayPill(tomorrow)}
            </button>
          </div>

          {/* Estado vacío compacto */}
          <div className="flex flex-col items-center justify-center pt-2.5 pb-1 text-center">
            <div className="w-8 h-8 rounded-full bg-[#A5B3CD] flex items-center justify-center mb-1.5">
              <span className="w-3.5 h-[2px] bg-white rounded-full" />
            </div>
            <p className="text-[#6D7687] text-[13.5px] font-medium leading-none">
              No tienes clases en el día
            </p>
          </div>
        </section>

        {/* CURSOS Card */}
        <div>
          <section className="card-standard !py-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-[34px] h-[34px] flex items-center justify-center flex-shrink-0">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/books-icon.png`}
                    alt="Cursos"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                {/* Título CURSOS con grosor moderado (font-bold) */}
                <h3 className="display font-bold text-[26px] text-[#000000] leading-none tracking-normal">
                  CURSOS
                </h3>
              </div>
              <button className="text-[15px] font-semibold text-[#3F2E9E] flex items-center gap-1 hover:underline cursor-pointer">
                <span>Ver todos</span>
                <ChevronRight className="w-4 h-4 text-[#2E0EC5] stroke-[2.8]" />
              </button>
            </div>

            {/* Course Details Card */}
            <div className="pt-0.5">
              <h4 className="text-[16px] font-bold text-[#4A5364] leading-snug mb-2">
                {currentCourse.name}
              </h4>

              {/* Badge VIRTUAL */}
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-[#B6FFB3] text-[#22661D] display text-[12px] uppercase px-2 py-0.5 rounded-[4px] font-bold tracking-wider">
                  {currentCourse.modality}
                </span>
              </div>

              {/* Enlace "Ver más detalle" SIN línea divisoria y con márgenes reducidos */}
              <div className="pt-0.5 pb-0.5">
                <button
                  onClick={() => setExpandedCourse(!expandedCourse)}
                  className="text-[15px] font-semibold text-[#3F2E9E] flex items-center justify-center w-full gap-1 py-0.5 hover:underline cursor-pointer"
                >
                  <span>Ver más detalle</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#2E0EC5] stroke-[2.8] transition-transform duration-200 ${
                      expandedCourse ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedCourse && (
                  <div className="mt-2.5 p-3.5 bg-[#F9FAFE] border border-[#D6D9E2]/60 rounded-xl text-[14px] space-y-1.5 text-[#4A5364] animate-fadeIn">
                    <p><strong className="text-[#000000]">Nombre completo:</strong> {currentCourse.fullName}</p>
                    <p><strong className="text-[#000000]">Código / Sección:</strong> {currentCourse.code} - {currentCourse.section}</p>
                    <p><strong className="text-[#000000]">Docente:</strong> {currentCourse.teacher}</p>
                    <p><strong className="text-[#000000]">Aula:</strong> {currentCourse.classroom}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Puntos de Scroll/Carrusel FUERA del card de cursos */}
          <div className="flex items-center justify-center gap-[8px] my-3">
            {COURSES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentCourseIndex(idx)}
                className={`w-[9px] h-[9px] rounded-full transition-all cursor-pointer ${
                  currentCourseIndex === idx ? 'bg-[#E40A18]' : 'bg-[#CCD9EC]'
                }`}
                aria-label={`Ver curso ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* MIS SERVICIOS Section */}
        <section className="px-[18px] pt-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="display font-bold text-[26px] text-[#000000] leading-none">
              MIS SERVICIOS
            </h3>
            <button className="text-[15px] font-semibold text-[#3F2E9E] flex items-center gap-1 hover:underline cursor-pointer">
              <span>Ver todos</span>
              <ChevronRight className="w-4 h-4 text-[#2E0EC5] stroke-[2.8]" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            <div className="bg-white rounded-[16px] p-3 shadow-[0_2px_8px_rgba(30,40,80,0.12)] flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E40A18] mb-1.5 font-bold">
                📄
              </div>
              <span className="text-[13px] font-medium text-[#4A5364]">Trámites</span>
            </div>

            <div className="bg-white rounded-[16px] p-3 shadow-[0_2px_8px_rgba(30,40,80,0.12)] flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#3F2E9E] mb-1.5 font-bold">
                📚
              </div>
              <span className="text-[13px] font-medium text-[#4A5364]">Biblioteca</span>
            </div>

            <div className="bg-white rounded-[16px] p-3 shadow-[0_2px_8px_rgba(30,40,80,0.12)] flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1.5 font-bold">
                💳
              </div>
              <span className="text-[13px] font-medium text-[#4A5364]">Pagos UPC</span>
            </div>

            <div className="bg-white rounded-[16px] p-3 shadow-[0_2px_8px_rgba(30,40,80,0.12)] flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-1.5 font-bold">
                🌐
              </div>
              <span className="text-[13px] font-medium text-[#4A5364]">Intranet</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
