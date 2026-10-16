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
    <div className="relative min-h-screen w-full bg-[#EFF3FC] flex flex-col justify-between max-w-md mx-auto overflow-hidden select-none">
      {/* 
        Nubes vectoriales pastel idénticas a IMAGEN 1.jpeg 
      */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Nube izquierda superior */}
        <div className="absolute top-[370px] -left-6 w-24 h-10 bg-[#C5D0F6]/80 rounded-full blur-[0.5px]" />
        {/* Nube izquierda media */}
        <div className="absolute top-[430px] left-8 w-20 h-7 bg-[#C5D0F6]/75 rounded-full" />
        
        {/* Nube derecha superior */}
        <div className="absolute top-[410px] right-8 w-16 h-6 bg-[#C5D0F6]/70 rounded-full" />
        {/* Nube derecha media */}
        <div className="absolute top-[460px] -right-4 w-20 h-8 bg-[#C5D0F6]/80 rounded-full" />

        {/* 
          Imagen de campus (SIN rostro) colocada detrás del card blanco,
          emergiendo desde el nivel del card hacia arriba 
        */}
        <div className="absolute bottom-[200px] left-0 right-0 h-[220px] flex items-end justify-center opacity-85">
          <img
            src={`${import.meta.env.BASE_URL}assets/campus-bg.png`}
            alt="Campus UPC"
            className="w-full h-full object-cover scale-110"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
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

      {/* Reloj y Alumno */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start px-[18px] pt-2">
        {/* Digital Clock Box: color lila/lavanda suave, números con grosor moderado/limpio */}
        <div className="w-full max-w-[270px] bg-[#E1E5FE] rounded-2xl py-3 px-6 text-center shadow-sm border border-[#D0D7FC] mt-2 mb-2">
          <div className="font-clock font-medium text-[36px] text-[#000000] tracking-wider leading-none">
            {timeStr || '22:14:44'}
          </div>
        </div>

        {/* Fecha con más margen hacia la foto */}
        <p className="text-[#6D7687] text-[15px] font-medium tracking-normal mt-1 mb-8">
          {dateStr || 'Lunes, 12 Oct 2026'}
        </p>

        {/* 
          Foto del alumno:
          - Ocupa TODO el círculo
          - SIN bordes blancos ni márgenes
          - SIN icono de check verde
        */}
        <div className="relative mb-5 z-20">
          <div className="w-[108px] h-[108px] rounded-full overflow-hidden shadow-[0_8px_24px_rgba(30,40,80,0.18)] bg-transparent">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 
          Card blanco de datos del alumno:
          - Bajado más hacia abajo
          - Nombre en letras más grandes pero con trazo más delgado (font-normal / font-medium display)
          - Textos oscuros en "Código de alumno", "ID Banner", "Campus Villa" con margen reducido a sus valores
        */}
        <div className="w-full bg-[#FFFFFF] rounded-t-[28px] rounded-b-[20px] p-[22px] pt-6 shadow-[0_4px_16px_rgba(30,40,80,0.08)] border border-[#D6D9E2]/40 text-center space-y-2 mt-auto mb-2 z-20">
          {/* Nombre: grande, alargado y con grosor delgado como en IMAGEN 1 */}
          <h2 className="display font-normal text-[32px] text-[#E40A18] uppercase leading-tight tracking-wide">
            {profile.maskedName}
          </h2>

          {/* Código de alumno con "U" y margen mínimo con el valor */}
          <div className="text-[14px] text-[#000000]">
            <p className="font-medium text-[#000000] leading-tight">Código de alumno:</p>
            <p className="font-bold text-[16px] text-[#1E2B48] mt-0.5 leading-tight">
              {profile.studentCode}
            </p>
          </div>

          {/* ID Banner con margen mínimo con el valor */}
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

          {/* Campus Villa con el icono de chincheta roja / chupetín */}
          <div className="flex items-center justify-center gap-1.5 text-[14px] text-[#000000] font-medium pt-0.5">
            <UpcPinIcon className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-[#000000]">{profile.campus}</span>
          </div>
        </div>
      </div>

      {/* Indicador inferior iOS Home */}
      <div className="relative z-20 w-full flex justify-center pb-2 pt-1">
        <div className="w-36 h-1 bg-[#000000]/60 rounded-full" />
      </div>
    </div>
  );
};
