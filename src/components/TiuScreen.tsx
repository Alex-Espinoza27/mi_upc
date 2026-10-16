import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, ShieldCheck } from 'lucide-react';
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
    <div className="relative min-h-screen bg-[#F9FAFE] flex flex-col justify-between max-w-md mx-auto overflow-hidden select-none">
      {/* Background Campus Illustration Layers with #B6C0F6 tint */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-44 -left-10 w-44 h-16 bg-[#B6C0F6]/40 rounded-full blur-md" />
        <div className="absolute top-52 right-4 w-32 h-14 bg-[#B6C0F6]/50 rounded-full blur-md" />
        <div className="absolute bottom-40 left-0 right-0 h-72 flex justify-center items-end opacity-40">
          <img
            src={`${import.meta.env.BASE_URL}assets/campus-bg.png`}
            alt="Fondo UPC"
            className="w-full object-cover scale-125"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Top Header */}
      <div className="relative z-20 px-[18px] pt-4 pb-2 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(30,40,80,0.12)] flex items-center justify-center text-[#E40A18] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
          aria-label="Volver"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>
        <h1 className="display font-extrabold text-[24px] tracking-wide text-[#000000] uppercase">
          TIU VIRTUAL
        </h1>
      </div>

      {/* Main TIU Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-[18px] pt-2 pb-6">
        {/* Dynamic Digital Clock Card */}
        <div className="w-full max-w-[280px] bg-[#E2E6FF] rounded-2xl py-3 px-5 text-center shadow-sm border border-[#D5DCFF] mb-2.5">
          <div className="font-clock font-bold text-4xl text-[#000000] tracking-wider leading-none">
            {timeStr || '22:14:44'}
          </div>
        </div>

        {/* Live Date: text-tertiary #6D7687 */}
        <p className="text-[#6D7687] text-[15px] font-medium tracking-normal mb-7">
          {dateStr || 'Lunes, 12 Oct 2026'}
        </p>

        {/* Circular Student Photo */}
        <div className="relative mb-6">
          <div className="w-36 h-36 rounded-full p-1 bg-white shadow-[0_8px_24px_rgba(30,40,80,0.16)]">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces';
              }}
            />
          </div>

          <div className="absolute bottom-1 right-2 w-7 h-7 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Student Credential White Card */}
        <div className="w-full bg-[#FFFFFF] rounded-[16px] p-[20px] shadow-[0_2px_8px_rgba(30,40,80,0.12)] border border-[#D6D9E2]/50 text-center space-y-2.5">
          {/* Masked Student Name: Display font, 24sp, red-text #D3101E */}
          <h2 className="display font-extrabold text-[24px] text-[#D3101E] uppercase leading-tight tracking-normal">
            {profile.maskedName}
          </h2>

          {/* Student Code: Regular / Bold 14sp text-secondary #4A5364 */}
          <div className="text-[14px] text-[#4A5364]">
            <p className="font-normal">Código de alumno:</p>
            <p className="font-bold text-[16px] text-[#4A5364] mt-0.5">
              {profile.studentCode}
            </p>
          </div>

          {/* ID Banner: Regular / Bold 14sp text-secondary #4A5364 */}
          <div className="text-[14px] text-[#4A5364]">
            <p className="font-normal">ID Banner:</p>
            <p className="font-bold text-[16px] text-[#4A5364] mt-0.5">
              {profile.bannerId}
            </p>
          </div>

          {/* Carrera: Bold 16sp text-secondary #4A5364 */}
          <p className="font-bold text-[16px] text-[#4A5364] uppercase pt-1">
            {profile.career}
          </p>

          {/* Campus Location */}
          <div className="flex items-center justify-center gap-1.5 text-[14px] text-[#4A5364] font-medium pt-1">
            <MapPin className="w-4 h-4 text-[#E40A18] fill-[#E40A18]" />
            <span>{profile.campus}</span>
          </div>
        </div>
      </div>

      {/* Bottom iOS Home Indicator */}
      <div className="relative z-20 w-full flex justify-center pb-3 pt-2">
        <div className="w-36 h-1 bg-[#000000]/60 rounded-full" />
      </div>
    </div>
  );
};
