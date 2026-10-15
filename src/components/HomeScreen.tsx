import React, { useState } from 'react';
import { Bell, ChevronRight, ChevronDown, MinusCircle, BookOpen, FileText, CreditCard, Globe, Sparkles } from 'lucide-react';
import { UpcHeaderLogo } from './UpcLogo';
import { StudentProfile } from '../types';
import { COURSES } from '../data/mockData';

interface HomeScreenProps {
  profile: StudentProfile;
  onOpenTiu: () => void;
  onOpenNotifications?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ profile, onOpenTiu }) => {
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
    <div className="min-h-screen bg-[#F6F7FA] pb-24 max-w-md mx-auto">
      {/* Top Header */}
      <header className="px-5 pt-3 pb-2 flex items-center justify-between">
        <UpcHeaderLogo />
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Notificaciones"
        >
          <Bell className="w-6 h-6 text-[#1A1F2C]" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#E30613] rounded-full border-2 border-white" />
        </button>
      </header>

      {/* Greeting Banner */}
      <section className="px-5 pt-3 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[#E30613] text-xl font-medium tracking-tight">Hola,</h2>
            <h1 className="text-[#E30613] text-3xl font-condensed font-extrabold uppercase tracking-tight -mt-1">
              {profile.name}
            </h1>
            <p className="text-[#6C7280] text-sm mt-0.5 font-normal">¡Te damos la bienvenida!</p>
          </div>
          <div className="relative w-28 h-20 flex-shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}assets/students-3d.png`}
              alt="Estudiantes UPC"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback SVG illustration if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="px-4 space-y-4">
        {/* HORARIOS Card */}
        <section className="bg-white rounded-3xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}assets/clock-icon.png`}
                  alt="Reloj"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-condensed font-extrabold text-2xl tracking-wide text-[#1A1F2C]">
                HORARIOS
              </h3>
            </div>
            <button className="text-[#1A56DB] text-sm font-semibold flex items-center gap-0.5 hover:underline cursor-pointer">
              Ver todo <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Day Pills */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <button
              onClick={() => setSelectedDay('today')}
              className={`py-2 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedDay === 'today'
                  ? 'bg-[#E30613] text-white shadow-sm'
                  : 'bg-white border border-[#E30613] text-[#E30613]'
              }`}
            >
              Hoy {formatDayPill(today)}
            </button>
            <button
              onClick={() => setSelectedDay('tomorrow')}
              className={`py-2 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedDay === 'tomorrow'
                  ? 'bg-[#E30613] text-white shadow-sm'
                  : 'bg-white border border-[#E30613] text-[#E30613]'
              }`}
            >
              Mañana {formatDayPill(tomorrow)}
            </button>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-10 h-10 rounded-full bg-[#9CA3AF]/20 flex items-center justify-center mb-3">
              <span className="w-4 h-1 bg-[#838B9B] rounded-full" />
            </div>
            <p className="text-[#64748B] text-sm font-medium">No tienes clases en el día</p>
          </div>
        </section>

        {/* CURSOS Card */}
        <section className="bg-white rounded-3xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}assets/books-icon.png`}
                  alt="Cursos"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <h3 className="font-condensed font-extrabold text-2xl tracking-wide text-[#1A1F2C]">
                CURSOS
              </h3>
            </div>
            <button className="text-[#1A56DB] text-sm font-semibold flex items-center gap-0.5 hover:underline cursor-pointer">
              Ver todos <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Course Details Card */}
          <div className="py-2">
            <h4 className="text-[#1A1F2C] font-bold text-base tracking-tight mb-2">
              {currentCourse.name}
            </h4>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block bg-[#DCFCE7] text-[#15803D] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
                {currentCourse.modality}
              </span>
            </div>

            {/* Expandable detail */}
            <div className="border-t border-gray-50 pt-2">
              <button
                onClick={() => setExpandedCourse(!expandedCourse)}
                className="text-[#3B62C6] text-xs font-medium flex items-center justify-center w-full gap-1 py-1 hover:underline cursor-pointer"
              >
                Ver más detalle
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    expandedCourse ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedCourse && (
                <div className="mt-3 p-3 bg-[#F8FAFC] rounded-2xl text-xs space-y-1.5 text-gray-600 animate-fadeIn">
                  <p><strong className="text-gray-800">Nombre completo:</strong> {currentCourse.fullName}</p>
                  <p><strong className="text-gray-800">Código / Sección:</strong> {currentCourse.code} - {currentCourse.section}</p>
                  <p><strong className="text-gray-800">Docente:</strong> {currentCourse.teacher}</p>
                  <p><strong className="text-gray-800">Aula:</strong> {currentCourse.classroom}</p>
                </div>
              )}
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {COURSES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCourseIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    currentCourseIndex === idx ? 'bg-[#E30613] w-2.5' : 'bg-[#D0D7E5]'
                  }`}
                  aria-label={`Ver curso ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quick TIU Banner Shortcut */}
        <div
          onClick={onOpenTiu}
          className="bg-gradient-to-r from-[#1E293B] to-[#0F172A] text-white rounded-2xl p-4 flex items-center justify-between shadow-md cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <p className="font-condensed font-bold text-lg leading-tight">TIU VIRTUAL ACTIVO</p>
              <p className="text-xs text-gray-300">Toca para abrir tu Carnet Universitario</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>

        {/* MIS SERVICIOS Section */}
        <section className="pt-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-condensed font-extrabold text-2xl tracking-wide text-[#1A1F2C]">
              MIS SERVICIOS
            </h3>
            <button className="text-[#1A56DB] text-sm font-semibold flex items-center gap-0.5 hover:underline cursor-pointer">
              Ver todos <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#E30613] mb-1.5">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-gray-700">Trámites</span>
            </div>

            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1A56DB] mb-1.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-gray-700">Biblioteca</span>
            </div>

            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1.5">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-gray-700">Pagos UPC</span>
            </div>

            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-1.5">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-medium text-gray-700">Intranet</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
