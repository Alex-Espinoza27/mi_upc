import React, { useState } from 'react';
import { MapPin, Copy, Check, ChevronRight, IdCard, LogOut, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../types';

interface ProfileScreenProps {
  profile: StudentProfile;
  onOpenTiu: () => void;
  onLogout?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ profile, onOpenTiu, onLogout }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F6F7FA] pb-24 max-w-md mx-auto">
      {/* Toast Notification */}
      {copied && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#1A1F2C] text-white text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>¡Correo copiado al portapapeles!</span>
        </div>
      )}

      {/* Top Banner with Campus Background */}
      <div className="relative w-full h-36 bg-[#E9ECFB] overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}assets/campus-bg.png`}
          alt="Campus UPC"
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F6F7FA]/40" />
      </div>

      {/* Profile Photo */}
      <div className="flex justify-center -mt-16 relative z-10 mb-3">
        <div className="w-28 h-28 rounded-full p-1 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              // fallback avatar
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces';
            }}
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="px-6 text-center space-y-2">
        <h1 className="font-condensed font-extrabold text-2xl tracking-wide text-[#E30613] uppercase leading-tight">
          {profile.maskedName}
        </h1>

        <p className="font-bold text-[#2C384E] text-sm tracking-wide uppercase">
          {profile.career}
        </p>

        <div className="flex items-center justify-center gap-1.5 text-gray-600 text-xs font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#E30613] fill-[#E30613]/20" />
          <span>{profile.campus}</span>
        </div>

        {/* Email Pill with Copy Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 bg-[#EAEFF9] hover:bg-[#DEE6F5] text-[#2C384E] text-xs font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer active:scale-95"
            title="Copiar correo"
          >
            <span>{profile.email}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#E30613] stroke-[2.5]" />
            )}
          </button>
        </div>

        {/* Student Code and ID Banner */}
        <div className="pt-2 text-xs text-gray-600 space-y-1">
          <p>
            Código de alumno: <span className="font-bold text-[#1E293B]">{profile.studentCode}</span>
          </p>
          <p>
            ID Banner: <span className="font-bold text-[#1E293B]">{profile.bannerId}</span>
          </p>
        </div>

        <div className="w-full h-px bg-gray-200/80 my-5" />

        {/* TIU VIRTUAL Button Card */}
        <div
          onClick={onOpenTiu}
          className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl border border-gray-300 flex items-center justify-center text-gray-800">
              <IdCard className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="font-condensed font-extrabold text-xl tracking-wider text-[#1A1F2C]">
              TIU VIRTUAL
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#E30613] stroke-[3]" />
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-6 px-2 text-[11px] text-[#64748B] leading-relaxed">
          Revisa los{' '}
          <a href="#terminos" className="text-[#1A56DB] font-semibold underline underline-offset-2">
            Términos y condiciones
          </a>
          ,{' '}
          <a href="#privacidad" className="text-[#1A56DB] font-semibold underline underline-offset-2">
            Política de privacidad
          </a>{' '}
          y el{' '}
          <a href="#arco" className="text-[#1A56DB] font-semibold underline underline-offset-2">
            Portal PDP y Derechos ARCO
          </a>{' '}
          de la aplicación.
        </div>

        {/* Logout Button */}
        <div className="pt-4 pb-2">
          <button
            onClick={onLogout}
            className="w-full py-3.5 px-6 rounded-full border-2 border-[#E30613] text-[#E30613] font-bold text-sm tracking-wide bg-white hover:bg-red-50/50 transition-colors cursor-pointer active:scale-[0.98]"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
