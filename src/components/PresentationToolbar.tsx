import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone,
  Users,
  Settings,
  X,
  Sparkles,
  Download,
  CheckCircle,
  ChevronDown,
  Upload,
  Image as ImageIcon,
  RefreshCw,
  Eye,
  EyeOff,
  User,
  Check,
  QrCode,
  ShieldCheck,
  Palette
} from 'lucide-react';
import { StudentProfile } from '../types';

interface PresentationToolbarProps {
  visible?: boolean;
  currentProfile: StudentProfile;
  profiles: StudentProfile[];
  onSelectProfile: (profile: StudentProfile) => void;
  onUpdateProfile: (updated: StudentProfile) => void;
  onResetProfile?: () => void;
  statusBarMode: 'android' | 'ios' | 'hidden';
  onStatusBarModeChange: (mode: 'android' | 'ios' | 'hidden') => void;
}

export const PresentationToolbar: React.FC<PresentationToolbarProps> = ({
  visible = true,
  currentProfile,
  profiles,
  onSelectProfile,
  onUpdateProfile,
  onResetProfile,
  statusBarMode,
  onStatusBarModeChange
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'datos' | 'imagenes' | 'pwa'>('datos');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isMinimizedMode, setIsMinimizedMode] = useState<boolean>(false);

  // Edit fields
  const [editName, setEditName] = useState(currentProfile.name);
  const [editMasked, setEditMasked] = useState(currentProfile.maskedName);
  const [editCode, setEditCode] = useState(currentProfile.studentCode);
  const [editBanner, setEditBanner] = useState(currentProfile.bannerId);
  const [editCareer, setEditCareer] = useState(currentProfile.career);
  const [editCampus, setEditCampus] = useState(currentProfile.campus);
  const [editEmail, setEditEmail] = useState(currentProfile.email);
  const [editAvatar, setEditAvatar] = useState(currentProfile.avatarUrl);
  const [editHomeBanner, setEditHomeBanner] = useState(
    currentProfile.homeBannerUrl || `${import.meta.env.BASE_URL}assets/students-3d.png`
  );
  const [editTiuBg, setEditTiuBg] = useState(
    currentProfile.tiuBgUrl || `${import.meta.env.BASE_URL}assets/nube.gif`
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const tiuBgInputRef = useRef<HTMLInputElement>(null);

  // Sync state when profile changes externally
  useEffect(() => {
    setEditName(currentProfile.name);
    setEditMasked(currentProfile.maskedName);
    setEditCode(currentProfile.studentCode);
    setEditBanner(currentProfile.bannerId);
    setEditCareer(currentProfile.career);
    setEditCampus(currentProfile.campus);
    setEditEmail(currentProfile.email);
    setEditAvatar(currentProfile.avatarUrl);
    setEditHomeBanner(currentProfile.homeBannerUrl || `${import.meta.env.BASE_URL}assets/students-3d.png`);
    setEditTiuBg(currentProfile.tiuBgUrl || `${import.meta.env.BASE_URL}assets/nube.gif`);
  }, [currentProfile]);

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

  // Generic Image file loader to Base64 Data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'avatar' | 'homeBanner' | 'tiuBg') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (target === 'avatar') {
        setEditAvatar(result);
      } else if (target === 'homeBanner') {
        setEditHomeBanner(result);
      } else if (target === 'tiuBg') {
        setEditTiuBg(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const updated: StudentProfile = {
      ...currentProfile,
      name: editName.trim(),
      maskedName: editMasked.trim(),
      studentCode: editCode.trim().toUpperCase(),
      bannerId: editBanner.trim().toUpperCase(),
      career: editCareer.trim().toUpperCase(),
      campus: editCampus.trim(),
      email: editEmail.trim().toLowerCase(),
      avatarUrl: editAvatar,
      homeBannerUrl: editHomeBanner,
      tiuBgUrl: editTiuBg
    };

    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAutoMaskName = () => {
    const parts = editName.trim().toUpperCase().split(/\s+/);
    if (parts.length >= 4) {
      const masked = `${parts[0]} ${parts[1]} ${parts[2][0]}*** ${parts[3][0]}***`;
      setEditMasked(masked);
    } else if (parts.length === 3) {
      const masked = `${parts[0]} ${parts[1]} ${parts[2][0]}***`;
      setEditMasked(masked);
    } else if (parts.length === 2) {
      const masked = `${parts[0]} ${parts[1][0]}***`;
      setEditMasked(masked);
    } else {
      setEditMasked(`${editName.toUpperCase()} E*** V***`);
    }
  };

  const handleAutoEmail = () => {
    if (editCode) {
      setEditEmail(`${editCode.trim().toLowerCase()}@upc.edu.pe`);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed top-2 right-2 z-50">
          {isMinimizedMode ? (
            <button
              onClick={() => {
                setIsMinimizedMode(false);
                setIsOpen(true);
              }}
              title="Abrir Panel IA"
              className="w-8 h-8 rounded-full bg-[#1E293B]/80 hover:bg-[#1E293B] text-yellow-300 flex items-center justify-center shadow-lg border border-white/20 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1.5 bg-[#1E293B]/90 backdrop-blur-md text-white text-[11px] font-semibold py-1.5 px-3 rounded-full shadow-lg border border-white/20 hover:bg-[#0F172A] active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>Panel IA</span>
            </button>
          )}
        </div>
      )}

      {/* Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-[#E40A18] border border-red-100 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    Panel de Administración IA
                    <span className="text-[10px] bg-red-100 text-[#E40A18] font-bold px-1.5 py-0.5 rounded-full">
                      En Vivo
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">Personaliza datos, fotos y fondos al instante</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Switch Profiles */}
            <div className="pt-3 pb-2 flex-shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  Estudiante Activo:
                </span>
                {onResetProfile && (
                  <button
                    onClick={() => {
                      if (window.confirm('¿Restablecer datos originales del carnet?')) {
                        onResetProfile();
                      }
                    }}
                    className="text-[10px] text-gray-500 hover:text-[#E40A18] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Restablecer</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {profiles.map((p) => {
                  const isSelected = currentProfile.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelectProfile(p)}
                      className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#E40A18] bg-red-50/60 shadow-sm'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <img
                        src={p.avatarUrl}
                        alt={p.name}
                        className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="truncate">
                        <p className="font-bold text-[11px] text-gray-900 truncate leading-tight">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-gray-500 leading-tight">{p.studentCode}</p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-3.5 h-3.5 text-[#E40A18] ml-auto flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tabs Bar */}
            <div className="flex border-b border-gray-200 mt-2 flex-shrink-0">
              <button
                onClick={() => setActiveTab('datos')}
                className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'datos'
                    ? 'border-[#E40A18] text-[#E40A18]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Datos</span>
              </button>
              <button
                onClick={() => setActiveTab('imagenes')}
                className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'imagenes'
                    ? 'border-[#E40A18] text-[#E40A18]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Imágenes</span>
              </button>
              <button
                onClick={() => setActiveTab('pwa')}
                className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'pwa'
                    ? 'border-[#E40A18] text-[#E40A18]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>PWA / App</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3.5 pr-1">
              {/* TAB 1: DATOS */}
              {activeTab === 'datos' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-gray-700 font-semibold block mb-1">
                      Nombre Alumno (Saludo Inicio):
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Ej. Clinton Alex"
                      className="w-full border border-gray-300 rounded-xl p-2 text-xs focus:border-[#E40A18] focus:ring-1 focus:ring-[#E40A18] outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-gray-700 font-semibold">
                        Nombre Carnet TIU (Masked):
                      </label>
                      <button
                        type="button"
                        onClick={handleAutoMaskName}
                        className="text-[10px] text-[#E40A18] hover:underline font-medium cursor-pointer"
                      >
                        Auto-generar formato
                      </button>
                    </div>
                    <input
                      type="text"
                      value={editMasked}
                      onChange={(e) => setEditMasked(e.target.value)}
                      placeholder="Ej. CLINTON ALEX E*** V***"
                      className="w-full border border-gray-300 rounded-xl p-2 text-xs uppercase focus:border-[#E40A18] focus:ring-1 focus:ring-[#E40A18] outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-gray-700 font-semibold block mb-1">
                        Código de Alumno:
                      </label>
                      <input
                        type="text"
                        value={editCode}
                        onChange={(e) => setEditCode(e.target.value)}
                        placeholder="Ej. U202120751"
                        className="w-full border border-gray-300 rounded-xl p-2 text-xs uppercase font-mono focus:border-[#E40A18] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-700 font-semibold block mb-1">
                        ID Banner:
                      </label>
                      <input
                        type="text"
                        value={editBanner}
                        onChange={(e) => setEditBanner(e.target.value)}
                        placeholder="Ej. N03885376"
                        className="w-full border border-gray-300 rounded-xl p-2 text-xs uppercase font-mono focus:border-[#E40A18] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-700 font-semibold block mb-1">
                      Carrera:
                    </label>
                    <input
                      type="text"
                      value={editCareer}
                      onChange={(e) => setEditCareer(e.target.value)}
                      placeholder="Ej. ING. SISTEMAS DE INFORMACIÓN"
                      className="w-full border border-gray-300 rounded-xl p-2 text-xs uppercase focus:border-[#E40A18] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 font-semibold block mb-1">
                      Campus / Sede:
                    </label>
                    <input
                      type="text"
                      value={editCampus}
                      onChange={(e) => setEditCampus(e.target.value)}
                      placeholder="Ej. Campus Villa"
                      className="w-full border border-gray-300 rounded-xl p-2 text-xs focus:border-[#E40A18] outline-none"
                    />
                    {/* Campus Quick Chips */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['Campus Villa', 'Campus San Isidro', 'Campus Monterrico', 'Campus San Miguel'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setEditCampus(c)}
                          className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                            editCampus === c
                              ? 'bg-red-50 border-[#E40A18] text-[#E40A18] font-bold'
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-gray-700 font-semibold">
                        Correo Institucional:
                      </label>
                      <button
                        type="button"
                        onClick={handleAutoEmail}
                        className="text-[10px] text-[#E40A18] hover:underline font-medium cursor-pointer"
                      >
                        Auto-completar con código
                      </button>
                    </div>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="Ej. u202120751@upc.edu.pe"
                      className="w-full border border-gray-300 rounded-xl p-2 text-xs lowercase focus:border-[#E40A18] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: IMÁGENES */}
              {activeTab === 'imagenes' && (
                <div className="space-y-4 text-xs">
                  {/* FOTO DEL ALUMNO */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                        <span>👤 Foto del Alumno</span>
                        <span className="text-[10px] font-normal text-gray-500">(TIU y Perfil)</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#E40A18] shadow-sm bg-white flex-shrink-0">
                        <img
                          src={editAvatar}
                          alt="Foto Alumno"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'avatar')}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-1.5 px-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl font-bold text-[11px] text-gray-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#E40A18]" />
                          <span>Subir foto desde tu dispositivo</span>
                        </button>
                        <p className="text-[10px] text-gray-500 leading-tight">
                          Puedes seleccionar cualquier foto de tu galería o cámara
                        </p>
                      </div>
                    </div>

                    {/* Presets rápidas de fotos */}
                    <div className="pt-1.5 border-t border-gray-200/80">
                      <p className="text-[10px] font-medium text-gray-600 mb-1">
                        O elegir foto de muestra:
                      </p>
                      <div className="flex gap-2">
                        {profiles.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setEditAvatar(p.avatarUrl)}
                            className={`flex items-center gap-1.5 py-1 px-2 rounded-lg border text-[10px] cursor-pointer transition-colors ${
                              editAvatar === p.avatarUrl
                                ? 'border-[#E40A18] bg-red-50 text-[#E40A18] font-bold'
                                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <img src={p.avatarUrl} alt={p.name} className="w-4 h-4 rounded-full object-cover" />
                            <span>{p.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ILUSTRACIÓN DE INICIO */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
                    <span className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                      <span>🎨 Ilustración de Saludo</span>
                      <span className="text-[10px] font-normal text-gray-500">(Pantalla Inicio)</span>
                    </span>

                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 rounded-xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center p-1 flex-shrink-0">
                        <img
                          src={editHomeBanner}
                          alt="Ilustración Saludo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <input
                          ref={bannerInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'homeBanner')}
                        />
                        <button
                          type="button"
                          onClick={() => bannerInputRef.current?.click()}
                          className="w-full py-1.5 px-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl font-bold text-[11px] text-gray-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
                        >
                          <Upload className="w-3.5 h-3.5 text-gray-700" />
                          <span>Subir imagen personalizada</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditHomeBanner(`${import.meta.env.BASE_URL}assets/students-3d.png`)}
                          className="text-[10px] text-gray-500 hover:text-[#E40A18] cursor-pointer"
                        >
                          Restablecer a ilustración 3D original
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* FONDO DE TIU VIRTUAL */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
                    <span className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                      <span>☁️ Fondo de TIU Virtual</span>
                      <span className="text-[10px] font-normal text-gray-500">(Campus animado)</span>
                    </span>

                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center flex-shrink-0">
                        <img
                          src={editTiuBg}
                          alt="Fondo TIU"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <input
                          ref={tiuBgInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'tiuBg')}
                        />
                        <button
                          type="button"
                          onClick={() => tiuBgInputRef.current?.click()}
                          className="w-full py-1.5 px-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl font-bold text-[11px] text-gray-800 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
                        >
                          <Upload className="w-3.5 h-3.5 text-gray-700" />
                          <span>Subir fondo propio</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditTiuBg(`${import.meta.env.BASE_URL}assets/nube.gif`)}
                          className="text-[10px] text-gray-500 hover:text-[#E40A18] cursor-pointer"
                        >
                          Restablecer a fondo oficial animado nube.gif
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PWA / CELULAR */}
              {activeTab === 'pwa' && (
                <div className="space-y-3.5 text-xs">
                  {/* Instalar PWA Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm">📱 Instalar como App en Celular</p>
                        <p className="text-xs text-white/90 mt-0.5">Sin Google Play ni App Store</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleInstallClick}
                        className="bg-white text-[#E40A18] font-bold text-xs py-2 px-3.5 rounded-xl shadow-sm hover:bg-gray-50 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isInstalled ? 'Instalada' : 'Instalar'}</span>
                      </button>
                    </div>

                    {/* QR Code Section */}
                    <div className="pt-3 border-t border-white/20 flex items-center gap-3 bg-black/10 p-2.5 rounded-xl">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(window.location.href)}`}
                        alt="QR para celular"
                        className="w-16 h-16 rounded-lg bg-white p-1 flex-shrink-0"
                      />
                      <div className="text-xs">
                        <p className="font-bold">Escanear con tu cámara:</p>
                        <p className="text-[10px] text-white/80 select-all truncate max-w-[200px]">
                          {window.location.href}
                        </p>
                        <p className="text-[10px] text-yellow-200 mt-1">
                          Abre al instante en cualquier teléfono
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Barra de Estado */}
                  <div className="p-3 rounded-2xl border border-gray-200 space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Barra de Estado Superior:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => onStatusBarModeChange('android')}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center cursor-pointer transition-colors ${
                          statusBarMode === 'android'
                            ? 'border-[#E40A18] bg-red-50 text-[#E40A18]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Android
                      </button>
                      <button
                        type="button"
                        onClick={() => onStatusBarModeChange('ios')}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center cursor-pointer transition-colors ${
                          statusBarMode === 'ios'
                            ? 'border-[#E40A18] bg-red-50 text-[#E40A18]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        iOS (iPhone)
                      </button>
                      <button
                        type="button"
                        onClick={() => onStatusBarModeChange('hidden')}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center cursor-pointer transition-colors ${
                          statusBarMode === 'hidden'
                            ? 'border-[#E40A18] bg-red-50 text-[#E40A18]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Ocultar
                      </button>
                    </div>
                  </div>

                  {/* Modo Captura */}
                  <div className="p-3 rounded-2xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-800 text-xs">Modo Captura de Pantalla</p>
                      <p className="text-[10px] text-gray-500">Minimiza el botón flotante a un punto discreto</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMinimizedMode(true);
                        setIsOpen(false);
                      }}
                      className="py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Minimizar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-3 border-t border-gray-100 space-y-2 flex-shrink-0">
              {savedSuccess && (
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 animate-fadeIn">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>¡Cambios guardados y aplicados al instante!</span>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => handleSave()}
                  className="flex-[2] py-2.5 bg-[#E40A18] hover:bg-[#C90815] text-white font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Guardar y Aplicar al Instante</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
