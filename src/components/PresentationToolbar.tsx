import React, { useState, useEffect } from 'react';
import { Smartphone, Users, Settings, X, Sparkles, Download, CheckCircle, ChevronDown } from 'lucide-react';
import { StudentProfile } from '../types';

interface PresentationToolbarProps {
  visible?: boolean;
  currentProfile: StudentProfile;
  profiles: StudentProfile[];
  onSelectProfile: (profile: StudentProfile) => void;
  onUpdateProfile: (updated: StudentProfile) => void;
  statusBarMode: 'android' | 'ios' | 'hidden';
  onStatusBarModeChange: (mode: 'android' | 'ios' | 'hidden') => void;
}

export const PresentationToolbar: React.FC<PresentationToolbarProps> = ({
  visible = true,
  currentProfile,
  profiles,
  onSelectProfile,
  onUpdateProfile,
  statusBarMode,
  onStatusBarModeChange
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Edit fields
  const [editName, setEditName] = useState(currentProfile.name);
  const [editMasked, setEditMasked] = useState(currentProfile.maskedName);
  const [editCode, setEditCode] = useState(currentProfile.studentCode);
  const [editBanner, setEditBanner] = useState(currentProfile.bannerId);
  const [editCareer, setEditCareer] = useState(currentProfile.career);

  useEffect(() => {
    // Listen for PWA beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      onStatusBarModeChange('hidden');
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        'Para instalar en tu celular:\n\n' +
        '• En Android (Chrome): Toca el menú de 3 puntos (⋮) y selecciona "Instalar aplicación" o "Agregar a pantalla principal".\n\n' +
        '• En iPhone (Safari): Toca el botón Compartir (icono cuadrado con flecha hacia arriba) y selecciona "Agregar a inicio".'
      );
    }
  };

  const handleSaveCustomProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...currentProfile,
      name: editName,
      maskedName: editMasked,
      studentCode: editCode,
      bannerId: editBanner,
      career: editCareer
    });
    setIsEditing(false);
  };

  return (
    <>
      {/* Floating Presentation Pill (Oculto en Perfil y TIU) */}
      {!isOpen && visible && (
        <div className="fixed top-2 right-2 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 bg-[#1E293B]/90 backdrop-blur-md text-white text-[11px] font-semibold py-1.5 px-3 rounded-full shadow-lg border border-white/20 hover:bg-[#0F172A] active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Panel IA</span>
          </button>
        </div>
      )}

      {/* Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-[#E30613]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Control de Presentación IA</h3>
                  <p className="text-[11px] text-gray-500">Demuestra la reactividad y tecnología PWA</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Install PWA Section */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">📱 Instalar como App en Celular</p>
                  <p className="text-xs text-white/90 mt-0.5">Sin Google Play ni App Store</p>
                </div>
                <button
                  onClick={handleInstallClick}
                  className="bg-white text-[#E30613] font-bold text-xs py-2 px-3.5 rounded-xl shadow-sm hover:bg-gray-50 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isInstalled ? 'Instalada' : 'Instalar'}</span>
                </button>
              </div>

              {/* QR Code Section for easy mobile scan */}
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-3 bg-black/10 p-2.5 rounded-xl">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=http://${window.location.hostname}:3000/`}
                  alt="QR para celular"
                  className="w-16 h-16 rounded-lg bg-white p-1"
                />
                <div className="text-xs">
                  <p className="font-bold">Escanear con tu celular:</p>
                  <p className="text-[11px] text-white/80 select-all">
                    http://{window.location.hostname}:3000/
                  </p>
                  <p className="text-[10px] text-yellow-200 mt-1">
                    (Conectado a la misma red Wi-Fi)
                  </p>
                </div>
              </div>
            </div>

            {/* Switch Profiles */}
            <div className="mt-5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                Seleccionar Alumno (Muestras):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProfile(p);
                      setEditName(p.name);
                      setEditMasked(p.maskedName);
                      setEditCode(p.studentCode);
                      setEditBanner(p.bannerId);
                      setEditCareer(p.career);
                    }}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      currentProfile.id === p.id
                        ? 'border-[#E30613] bg-red-50/50 shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={p.avatarUrl}
                      alt={p.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="truncate">
                      <p className="font-bold text-xs text-gray-900 truncate">{p.name}</p>
                      <p className="text-[10px] text-gray-500">{p.studentCode}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Student Live Edit */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold text-[#1A56DB] flex items-center justify-between w-full cursor-pointer hover:underline"
              >
                <span>✏️ Personalizar datos para tu presentación</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isEditing ? 'rotate-180' : ''}`} />
              </button>

              {isEditing && (
                <form onSubmit={handleSaveCustomProfile} className="mt-3 space-y-2.5 text-xs">
                  <div>
                    <label className="text-gray-600 block mb-0.5">Nombre Alumno (Saludo):</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:border-[#E30613] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-0.5">Nombre en Carnet (Masked):</label>
                    <input
                      type="text"
                      value={editMasked}
                      onChange={(e) => setEditMasked(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:border-[#E30613] outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-gray-600 block mb-0.5">Código Alumno:</label>
                      <input
                        type="text"
                        value={editCode}
                        onChange={(e) => setEditCode(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:border-[#E30613] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-600 block mb-0.5">ID Banner:</label>
                      <input
                        type="text"
                        value={editBanner}
                        onChange={(e) => setEditBanner(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:border-[#E30613] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600 block mb-0.5">Carrera:</label>
                    <input
                      type="text"
                      value={editCareer}
                      onChange={(e) => setEditCareer(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:border-[#E30613] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1A1F2C] text-white py-2 rounded-xl font-bold hover:bg-black transition-colors"
                  >
                    Guardar y Aplicar al Instante
                  </button>
                </form>
              )}
            </div>

            {/* Status Bar Mode */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                Barra de Estado Superior:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onStatusBarModeChange('android')}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center cursor-pointer ${
                    statusBarMode === 'android'
                      ? 'border-[#E30613] bg-red-50 text-[#E30613]'
                      : 'border-gray-200 text-gray-700'
                  }`}
                >
                  Android
                </button>
                <button
                  onClick={() => onStatusBarModeChange('ios')}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center cursor-pointer ${
                    statusBarMode === 'ios'
                      ? 'border-[#E30613] bg-red-50 text-[#E30613]'
                      : 'border-gray-200 text-gray-700'
                  }`}
                >
                  iOS (iPhone)
                </button>
                <button
                  onClick={() => onStatusBarModeChange('hidden')}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center cursor-pointer ${
                    statusBarMode === 'hidden'
                      ? 'border-[#E30613] bg-red-50 text-[#E30613]'
                      : 'border-gray-200 text-gray-700'
                  }`}
                >
                  Ocultar
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Cerrar Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
