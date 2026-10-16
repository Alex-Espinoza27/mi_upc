import React from 'react';
import { UpcHeaderLogo } from './UpcLogo';
import { GraduationCap, Award, BookCheck, Calendar, ArrowUpRight } from 'lucide-react';
import { StudentProfile } from '../types';

export const AcademicoScreen: React.FC<{ profile: StudentProfile }> = ({ profile }) => {
  return (
    <div className="min-h-screen bg-[#F9FAFE] pb-28 max-w-md mx-auto">
      <header className="px-[18px] pt-3 pb-2 flex items-center justify-between border-b border-[#D6D9E2]/60 bg-white">
        <UpcHeaderLogo />
        <span className="display font-extrabold text-[20px] text-[#000000]">ACADÉMICO</span>
      </header>

      <div className="pt-4 space-y-4">
        {/* Performance Summary Card */}
        <div className="card-featured">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[14px] text-white/80 font-normal">Ciclo Académico Actual</p>
              <h3 className="display font-extrabold text-[28px] tracking-wide text-white">2026-02</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-yellow-300">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/20 text-[14px]">
            <div>
              <span className="text-white/70">Créditos:</span>
              <p className="font-bold text-[18px] text-white">21.0</p>
            </div>
            <div>
              <span className="text-white/70">Ponderado:</span>
              <p className="font-bold text-[18px] text-[#B6FFB3]">16.85</p>
            </div>
          </div>
        </div>

        {/* Academic Modules */}
        <div className="space-y-3">
          <div className="card-standard flex items-center justify-between cursor-pointer hover:bg-gray-50 active:scale-[0.99] transition-transform">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E40A18] flex items-center justify-center">
                <BookCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[15px] text-[#000000]">Notas y Asistencias</p>
                <p className="text-[14px] text-[#4A5364]">Evaluaciones continuas del ciclo</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#2E0EC5]" />
          </div>

          <div className="card-standard flex items-center justify-between cursor-pointer hover:bg-gray-50 active:scale-[0.99] transition-transform">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3F2E9E] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[15px] text-[#000000]">Malla Curricular</p>
                <p className="text-[14px] text-[#4A5364]">Avance de créditos y prerrequisitos</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#2E0EC5]" />
          </div>

          <div className="card-standard flex items-center justify-between cursor-pointer hover:bg-gray-50 active:scale-[0.99] transition-transform">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[15px] text-[#000000]">Prematrícula y Matrícula</p>
                <p className="text-[14px] text-[#4A5364]">Inscripción de asignaturas</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#2E0EC5]" />
          </div>
        </div>
      </div>
    </div>
  );
};
