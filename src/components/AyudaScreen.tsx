import React from 'react';
import { UpcHeaderLogo } from './UpcLogo';
import { MessageSquare, PhoneCall, HelpCircle, FileQuestion, ChevronRight } from 'lucide-react';

export const AyudaScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F6F7FA] pb-24 max-w-md mx-auto">
      <header className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-gray-100 bg-white">
        <UpcHeaderLogo />
        <span className="font-condensed font-bold text-lg text-gray-700">CANALES DE AYUDA</span>
      </header>

      <div className="p-5 space-y-4">
        {/* Contact Banner */}
        <div className="bg-[#E30613] text-white p-5 rounded-3xl shadow-lg">
          <h3 className="font-condensed font-extrabold text-2xl tracking-wide mb-1">
            ¿NECESITAS ORIENTACIÓN?
          </h3>
          <p className="text-xs text-red-100 mb-4">
            Estamos disponibles para resolver tus consultas académicas y técnicas.
          </p>
          <button className="bg-white text-[#E30613] font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center gap-2 cursor-pointer active:scale-95">
            <MessageSquare className="w-4 h-4" />
            <span>Iniciar Chat con Asesor UPC</span>
          </button>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-3">
          <h4 className="font-condensed font-bold text-xl text-gray-800">Preguntas Frecuentes</h4>
          
          <div className="divide-y divide-gray-100 text-xs">
            <div className="py-2.5 flex items-center justify-between cursor-pointer text-gray-700 hover:text-gray-900">
              <span>¿Cómo validar mi TIU Virtual en el ingreso al campus?</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="py-2.5 flex items-center justify-between cursor-pointer text-gray-700 hover:text-gray-900">
              <span>¿Qué hacer si no visualizo mis cursos matriculados?</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="py-2.5 flex items-center justify-between cursor-pointer text-gray-700 hover:text-gray-900">
              <span>Recuperación de contraseña de correo institucional</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
