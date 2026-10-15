import React from 'react';
import { UpcHeaderLogo } from './UpcLogo';
import { GraduationCap, Award, BookCheck, Calendar, ArrowUpRight } from 'lucide-react';
import { StudentProfile } from '../types';

export const AcademicoScreen: React.FC<{ profile: StudentProfile }> = ({ profile }) => {
  return (
    <div className="min-h-screen bg-[#F6F7FA] pb-24 max-w-md mx-auto">
      <header className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-gray-100 bg-white">
        <UpcHeaderLogo />
        <span className="font-condensed font-bold text-lg text-gray-700">ACADÉMICO</span>
      </header>

      <div className="p-5 space-y-4">
        {/* Performance Summary Card */}
        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white p-5 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400">Ciclo Académico Actual</p>
              <h3 className="font-condensed font-extrabold text-2xl tracking-wide">2026-02</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-yellow-400">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs">
            <div>
              <span className="text-gray-400">Créditos Matriculados:</span>
              <p className="font-bold text-base">21.0</p>
            </div>
            <div>
              <span className="text-gray-400">Promedio Ponderado:</span>
              <p className="font-bold text-base text-emerald-400">16.85</p>
            </div>
          </div>
        </div>

        {/* Academic Modules */}
        <div className="space-y-2.5">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E30613] flex items-center justify-center">
                <BookCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">Notas y Asistencias</p>
                <p className="text-xs text-gray-500">Evaluaciones continuas del ciclo</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1A56DB] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">Malla Curricular</p>
                <p className="text-xs text-gray-500">Avance de créditos y requisitos</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">Prematrícula y Matrícula</p>
                <p className="text-xs text-gray-500">Inscripción de asignaturas</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
