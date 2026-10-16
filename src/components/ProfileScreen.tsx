import React, { useState } from 'react';
import { MapPin, Copy, Check, ChevronRight, IdCard, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F9FAFE] pb-28 max-w-md mx-auto">
      {/* Toast Notification */}
      {copied && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#000000] text-white text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>¡Correo copiado al portapapeles!</span>
        </div>
      )}

      {/* Top Banner with Campus Background and Spec Illustration Tint #B6C0F6 */}
      <div className="relative w-full h-[140px] bg-[#B6C0F6] overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}assets/campus-bg.png`}
          alt="Campus UPC"
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B6C0F6]/30 to-[#F9FAFE]/80" />
      </div>

      {/* Profile Photo */}
      <div className="flex justify-center -mt-[56px] relative z-10 mb-3">
        <div className="w-[100px] h-[100px] rounded-full p-1 bg-white shadow-[0_2px_8px_rgba(30,40,80,0.12)]">
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
      </div>

      {/* Profile Details */}
      <div className="text-center space-y-1.5 px-[18px]">
        {/* Name in Profile: Display font, 24sp, red-text #D3101E */}
        <h1 className="display font-extrabold text-[24px] text-[#D3101E] tracking-normal uppercase leading-tight">
          {profile.maskedName}
        </h1>

        {/* Carrera: Roboto Bold 16sp text-secondary #4A5364 */}
        <p className="font-bold text-[16px] text-[#4A5364] uppercase tracking-normal">
          {profile.career}
        </p>

        {/* Campus Location */}
        <div className="flex items-center justify-center gap-1 text-[#4A5364] text-[14px]">
          <MapPin className="w-3.5 h-3.5 text-[#E40A18] fill-[#E40A18]" />
          <span>{profile.campus}</span>
        </div>

        {/* Chip del correo: chip-bg #E6EDF3, chip-text #545E6A, radius ~8dp, padding ~8x12dp, icon red-primary #E40A18 */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2.5 bg-[#E6EDF3] hover:bg-[#D9E3EC] text-[#545E6A] text-[14px] font-normal px-3 py-2 rounded-[8px] transition-colors cursor-pointer active:scale-95"
            title="Copiar correo"
          >
            <span>{profile.email}</span>
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            ) : (
              <Copy className="w-4 h-4 text-[#E40A18] stroke-[2.5]" />
            )}
          </button>
        </div>

        {/* Código de alumno y Banner ID: Regular / Bold 14sp text-secondary #4A5364 */}
        <div className="pt-2 text-[14px] text-[#4A5364] space-y-0.5">
          <p>
            <span className="font-normal">Código de alumno: </span>
            <span className="font-bold">{profile.studentCode}</span>
          </p>
          <p>
            <span className="font-normal">ID Banner: </span>
            <span className="font-bold">{profile.bannerId}</span>
          </p>
        </div>

        {/* Divider: #D6D9E2 */}
        <div className="w-full h-[1px] bg-[#D6D9E2] my-5" />

        {/* TIU VIRTUAL Card: surface #FFFFFF, radius 16dp, shadow, chevron red-primary #E40A18 */}
        <div
          onClick={onOpenTiu}
          className="bg-[#FFFFFF] rounded-[16px] p-[18px] shadow-[0_2px_8px_rgba(30,40,80,0.12)] flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl border border-[#D6D9E2] flex items-center justify-center text-[#000000]">
              <IdCard className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="display font-extrabold text-[20px] text-[#000000] tracking-wide uppercase">
              TIU VIRTUAL
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#E40A18] stroke-[3]" />
        </div>

        {/* Legal Disclaimer: text-tertiary #6D7687, links in #3F2E9E */}
        <div className="pt-6 px-2 text-[14px] text-[#6D7687] leading-relaxed">
          Revisa los{' '}
          <a href="#terminos" className="text-[#3F2E9E] font-medium underline underline-offset-2">
            Términos y condiciones
          </a>
          ,{' '}
          <a href="#privacidad" className="text-[#3F2E9E] font-medium underline underline-offset-2">
            Política de privacidad
          </a>{' '}
          y el{' '}
          <a href="#arco" className="text-[#3F2E9E] font-medium underline underline-offset-2">
            Portal PDP y Derechos ARCO
          </a>{' '}
          de la aplicación.
        </div>

        {/* Botón "Cerrar Sesión": alto ~44dp, borde ~2dp red-primary #E40A18, radio ~20dp, fondo blanco, texto red-text #D3101E SemiBold 16sp */}
        <div className="pt-5 pb-2">
          <button
            onClick={onLogout}
            className="w-full h-[44px] rounded-[20px] border-[2px] border-[#E40A18] bg-white text-[#D3101E] font-semibold text-[16px] flex items-center justify-center hover:bg-red-50/40 transition-colors cursor-pointer active:scale-[0.98]"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
