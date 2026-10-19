import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { UpcPinIcon } from './UpcLogo';
import { StudentProfile } from '../types';

interface TiuScreenProps {
  profile: StudentProfile;
  onBack: () => void;
}

export const TiuScreen: React.FC<TiuScreenProps> = ({ profile, onBack }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds}`);

      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];
      const dayName = days[now.getDay()];
      const dayNum = now.getDate();
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();

      setDateStr(`${dayName}, ${dayNum} ${monthName} ${year}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#f9faff] flex flex-col justify-between max-w-md mx-auto overflow-hidden select-none">
      {/* 
        FONDO OFICIAL ANIMADO EXTRAÍDO DEL APK (nube.gif)
        - Desplazado hacia abajo con top-[80px] para despejar el header y permitir encuadre natural
        - Posicionado con object-top para mostrar la perspectiva completa (-zoom)
      */}
      <div className="absolute inset-x-0 bottom-0 top-[150px] pointer-events-none overflow-hidden z-0">
        <img
          src={`${import.meta.env.BASE_URL}assets/nube.gif`}
          alt="Fondo Oficial TIU Animado"
          className="w-full h-full object-cover object-top select-none"
        />
      </div>

      {/* Top Header con botón de volver circular */}
      <div className="relative z-20 px-[18px] pt-4 pb-2 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(30,40,80,0.10)] flex items-center justify-center text-[#E40A18] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
          aria-label="Volver"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>
        <h1 className="display font-bold text-[24px] tracking-wide text-[#000000] uppercase">
          TIU VIRTUAL
        </h1>
      </div>

      {/* Componente CredentialClock, Foto y Tarjeta del Alumno */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-between px-[30px] pt-15 pb-1">
        {/* Reloj y Fecha subidos más arriba */}
        <div className="w-full flex flex-col items-center -mt-2">
          {/* Reloj de seguridad en vivo con fondo oficial #dbd9ff */}
          <div className="w-full max-w-[270px] bg-[#dbd9ff] rounded-2xl py-3 px-6 text-center shadow-sm border border-[#c8c5ff]">
            <div className="font-clock font-medium text-[36px] text-[#000000] tracking-wider leading-none">
              {timeStr || '22:14:44'}
            </div>
          </div>

          {/* Fecha debajo del reloj */}
          <p className="text-[#6D7687] text-[15px] font-medium tracking-normal mt-1.5 mb-3">
            {dateStr || 'Lunes, 12 Oct 2026'}
          </p>
        </div>

        {/* 
          Foto del alumno:
          - Agrandada a 126px x 126px
          - z-20 sobre el fondo animado nube.gif
          - Ocupa TODO el círculo sin bordes ni insignias
        */}
        <div className="relative my-2 z-20">
          <div className="w-[135px] h-[135px] rounded-full overflow-hidden shadow-[0_8px_24px_rgba(30,40,80,0.18)] bg-transparent">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 
          Card blanco de datos del alumno (StudentCredentialContent):
          - Posicionado unos píxeles más abajo
          - Nombre en tipografía oficial Solano Gothic, grande y estilizada
          - Textos contrastados con márgenes mínimos
        */}
        <div className="w-full bg-[#FFFFFF] rounded-[24px] p-[22px] pt-5 shadow-[0_4px_16px_rgba(30,40,80,0.08)] border border-[#D6D9E2]/40 text-center space-y-2 mt-2 mb-20 z-20">
          {/* Nombre oficial del estudiante */}
          <h2 className="display font-normal text-[32px] text-[#E40A18] uppercase leading-tight tracking-wide">
            {profile.maskedName}
          </h2>

          {/* Código de alumno con prefijo U */}
          <div className="text-[14px] text-[#000000]">
            <p className="font-medium text-[#000000] leading-tight">Código de alumno:</p>
            <p className="font-bold text-[16px] text-[#1E2B48] mt-0.5 leading-tight">
              {profile.studentCode}
            </p>
          </div>

          {/* ID Banner */}
          <div className="text-[14px] text-[#000000] pt-0.5">
            <p className="font-medium text-[#000000] leading-tight">ID Banner:</p>
            <p className="font-bold text-[16px] text-[#1E2B48] mt-0.5 leading-tight">
              {profile.bannerId}
            </p>
          </div>

          {/* Carrera */}
          <p className="font-bold text-[15px] text-[#1E2B48] uppercase tracking-normal pt-1 leading-tight">
            {profile.career}
          </p>

          {/* Sede con el icono 3D oficial (pinned.png) */}
          <div className="flex items-center justify-center gap-1.5 text-[14px] text-[#000000] font-medium pt-0.5">
            <UpcPinIcon className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-[#000000]">{profile.campus}</span>
          </div>
        </div>
      </div>

      {/* Indicador inferior de barra de inicio móvil */}
      <div className="relative z-20 w-full flex justify-center pb-2 pt-1">
        <div className="w-36 h-1 bg-[#000000]/60 rounded-full" />
      </div>
    </div>
  );
};
