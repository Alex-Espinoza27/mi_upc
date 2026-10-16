import React from 'react';
import { UpcHeaderLogo } from './UpcLogo';
import { MessageSquare, PhoneCall, ChevronRight, HelpCircle } from 'lucide-react';

export const AyudaScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFE] pb-28 max-w-md mx-auto">
      <header className="px-[18px] pt-3 pb-2 flex items-center justify-between border-b border-[#D6D9E2]/60 bg-white">
        <UpcHeaderLogo />
        <span className="display font-extrabold text-[20px] text-[#000000]">CANALES DE AYUDA</span>
      </header>

      <div className="pt-4 space-y-4">
        {/* Screen Title from Specification: ¿NECESITAS AYUDA? (26sp, red-text #D3101E) */}
        <div className="px-[18px]">
          <h2 className="display font-extrabold text-[26px] text-[#D3101E] tracking-tight">
            ¿NECESITAS AYUDA?
          </h2>
          <p className="text-[15px] font-normal text-[#4A5364] mt-0.5">
            Elige el medio de contacto de tu preferencia:
          </p>
        </div>

        {/* ALMA WHATSAPP Card */}
        <div className="card-standard flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="display font-extrabold text-[18px] text-[#000000] tracking-wide uppercase leading-tight">
                ALMA WHATSAPP
              </h3>
              <p className="text-[15px] text-[#4A5364]">Atención digital inmediata 24/7</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#E40A18] stroke-[3]" />
        </div>

        {/* CANAL TELEFÓNICO Card */}
        <div className="card-standard flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3F2E9E] flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="display font-extrabold text-[18px] text-[#000000] tracking-wide uppercase leading-tight">
                CANAL TELEFÓNICO
              </h3>
              <p className="text-[15px] text-[#4A5364]">Central de consultas y trámites</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#E40A18] stroke-[3]" />
        </div>

        {/* PREGUNTAS FRECUENTES Card */}
        <div className="card-standard">
          <h4 className="display font-extrabold text-[20px] text-[#000000] mb-3">
            PREGUNTAS FRECUENTES
          </h4>
          <div className="divide-y divide-[#D6D9E2]/60 text-[14px]">
            <div className="py-2.5 flex items-center justify-between cursor-pointer text-[#4A5364] hover:text-[#000000]">
              <span>¿Cómo validar mi TIU Virtual al ingresar al campus?</span>
              <ChevronRight className="w-4 h-4 text-[#2E0EC5]" />
            </div>
            <div className="py-2.5 flex items-center justify-between cursor-pointer text-[#4A5364] hover:text-[#000000]">
              <span>¿Qué hacer si no visualizo mis cursos matriculados?</span>
              <ChevronRight className="w-4 h-4 text-[#2E0EC5]" />
            </div>
            <div className="py-2.5 flex items-center justify-between cursor-pointer text-[#4A5364] hover:text-[#000000]">
              <span>Recuperación de contraseña de correo UPC</span>
              <ChevronRight className="w-4 h-4 text-[#2E0EC5]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
