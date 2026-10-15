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

      // Spanish Date Format: "Lunes, 12 Oct 2026"
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
    <div className="relative min-h-screen bg-gradient-to-b from-[#F2F5FD] via-[#EEF2FC] to-[#E8EDFA] flex flex-col justify-between max-w-md mx-auto overflow-hidden select-none">
      {/* Background Campus Illustration Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        {/* Soft clouds */}
        <div className="absolute top-44 -left-10 w-44 h-16 bg-[#D8E1F8]/50 rounded-full blur-md" />
        <div className="absolute top-52 right-4 w-32 h-14 bg-[#D8E1F8]/60 rounded-full blur-md" />
        
        {/* Campus illustration image if present */}
        <div className="absolute bottom-44 left-0 right-0 h-72 flex justify-center items-end opacity-45">
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
      <div className="relative z-20 px-5 pt-4 pb-2 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#E30613] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
          aria-label="Volver"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>
        <h1 className="font-condensed font-extrabold text-2xl tracking-wider text-[#1A1F2C] uppercase">
          TIU VIRTUAL
        </h1>
      </div>

      {/* Main TIU Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 pt-2 pb-6">
        {/* Dynamic Digital Clock Card */}
        <div className="w-full max-w-[280px] bg-[#E2E6FF] rounded-2xl py-3 px-5 text-center shadow-sm border border-[#D5DCFF] mb-3">
          <div className="font-clock font-bold text-4xl text-[#1E2538] tracking-wider leading-none">
            {timeStr || '22:14:44'}
          </div>
        </div>

        {/* Live Date */}
        <p className="text-[#5A6478] text-sm font-medium tracking-wide mb-8">
          {dateStr || 'Lunes, 12 Oct 2026'}
        </p>

        {/* Circular Student Photo with Subtle Hologram Ring */}
        <div className="relative mb-6">
          <div className="w-36 h-36 rounded-full p-1 bg-white shadow-[0_10px_30px_rgba(30,41,59,0.18)]">
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

          {/* Active credential badge */}
          <div className="absolute bottom-1 right-2 w-7 h-7 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Student Credential White Card */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(20,30,55,0.08)] border border-gray-100 text-center space-y-3">
          {/* Masked Student Name */}
          <h2 className="font-condensed font-extrabold text-3xl tracking-wide text-[#E30613] uppercase leading-tight">
            {profile.maskedName}
          </h2>

          {/* Student Code */}
          <div className="text-xs text-[#5D6778]">
            <p>Código de alumno:</p>
            <p className="font-extrabold text-[#1F2D48] text-base tracking-wide mt-0.5">
              {profile.studentCode}
            </p>
          </div>

          {/* ID Banner */}
          <div className="text-xs text-[#5D6778]">
            <p>ID Banner:</p>
            <p className="font-extrabold text-[#1F2D48] text-base tracking-wide mt-0.5">
              {profile.bannerId}
            </p>
          </div>

          {/* Degree */}
          <p className="font-extrabold text-[#1F2D48] text-sm tracking-wider uppercase pt-1">
            {profile.career}
          </p>

          {/* Campus Location */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#3E4A60] font-medium pt-1">
            <MapPin className="w-4 h-4 text-[#E30613] fill-[#E30613]" />
            <span>{profile.campus}</span>
          </div>
        </div>
      </div>

      {/* Bottom iOS Home Indicator */}
      <div className="relative z-20 w-full flex justify-center pb-3 pt-2">
        <div className="w-36 h-1.5 bg-[#1F2937] rounded-full opacity-80" />
      </div>
    </div>
  );
};
