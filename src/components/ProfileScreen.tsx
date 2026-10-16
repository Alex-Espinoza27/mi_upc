import React, { useState } from 'react';
import { Copy, Check, ChevronRight, IdCard, CheckCircle2 } from 'lucide-react';
import { UpcPinIcon } from './UpcLogo';
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

      {/* Top Banner with Clean Campus Background (SIN rostro en el fondo) */}
      <div className="relative w-full h-[140px] bg-[#E9EEFC] overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}assets/campus-bg.png`}
          alt="Campus UPC"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Soft bottom blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9FAFE]" />
      </div>

      {/* Profile Photo: Solo la foto en modo círculo SIN borde ni margen blanco */}
      <div className="flex justify-center -mt-[48px] relative z-10 mb-2.5">
        <div className="w-[94px] h-[94px] rounded-full overflow-hidden shadow-[0_4px_14px_rgba(30,40,80,0.15)] bg-transparent">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="text-center space-y-1 px-[18px]">
        {/* Nombre del alumno: grosor moderado (font-bold) */}
        <h1 className="display font-bold text-[24px] text-[#D3101E] tracking-normal uppercase leading-tight">
          {profile.maskedName}
        </h1>

        {/* Carrera: Roboto Bold 16sp text-secondary #4A5364 */}
        <p className="font-bold text-[15.5px] text-[#4A5364] uppercase tracking-normal">
          {profile.career}
        </p>

        {/* Campus Location con el icono de chincheta roja / chupetín */}
        <div className="flex items-center justify-center gap-1 text-[#4A5364] text-[14px] pt-0.5">
          <UpcPinIcon className="w-4 h-4 flex-shrink-0" />
          <span>{profile.campus}</span>
        </div>

        {/* Chip del correo */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2.5 bg-[#E6EDF3] hover:bg-[#D9E3EC] text-[#545E6A] text-[14px] font-normal px-3 py-1.5 rounded-[8px] transition-colors cursor-pointer active:scale-95"
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

        {/* Código de alumno y Banner ID */}
        <div className="pt-2 text-[14px] text-[#4A5364] space-y-0.5">
          <p>
            <span className="font-normal">Código de alumno: </span>
            <span className="font-bold text-[#1E293B]">{profile.studentCode}</span>
          </p>
          <p>
            <span className="font-normal">ID Banner: </span>
            <span className="font-bold text-[#1E293B]">{profile.bannerId}</span>
          </p>
        </div>

        {/* Divider: #D6D9E2 */}
        <div className="w-full h-[1px] bg-[#D6D9E2] my-4" />

        {/* TIU VIRTUAL Card */}
        <div
          onClick={onOpenTiu}
          className="bg-[#FFFFFF] rounded-[16px] p-[18px] shadow-[0_2px_8px_rgba(30,40,80,0.12)] flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl border border-[#D6D9E2] flex items-center justify-center text-[#000000]">
              <IdCard className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="display font-bold text-[20px] text-[#000000] tracking-wide uppercase">
              TIU VIRTUAL
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#E40A18] stroke-[3]" />
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-5 px-2 text-[13.5px] text-[#6D7687] leading-relaxed">
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

        {/* Botón "Cerrar Sesión" */}
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
