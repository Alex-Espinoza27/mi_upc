import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { TiuScreen } from './components/TiuScreen';
import { AcademicoScreen } from './components/AcademicoScreen';
import { AyudaScreen } from './components/AyudaScreen';
import { BottomNav } from './components/BottomNav';
import { TopStatusBar } from './components/TopStatusBar';
import { PresentationToolbar } from './components/PresentationToolbar';
import { PROFILES } from './data/mockData';
import { StudentProfile, TabType } from './types';

const STORAGE_KEY = 'mi_upc_student_profile_v2';

export function App() {
  const [profiles, setProfiles] = useState<StudentProfile[]>(PROFILES);
  const [currentProfile, setCurrentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...PROFILES[0], ...parsed };
      }
    } catch (e) {
      console.warn('Error reading stored profile', e);
    }
    return PROFILES[0];
  });
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [isTiuOpen, setIsTiuOpen] = useState<boolean>(false);
  const [statusBarMode, setStatusBarMode] = useState<'android' | 'ios' | 'hidden'>('android');

  const handleUpdateProfile = (updated: StudentProfile) => {
    setCurrentProfile(updated);
    setProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Error saving profile to localStorage', e);
    }
  };

  const handleResetProfile = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setCurrentProfile(PROFILES[0]);
  };

  const handleLogout = () => {
    if (window.confirm('¿Deseas cerrar sesión en MI UPC?')) {
      alert('Sesión cerrada. (Simulación de cierre de sesión exitosa).');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFE] text-[#1A1F2C] flex flex-col justify-between max-w-md mx-auto shadow-2xl relative font-sans overflow-x-hidden">
      {/* Top Status Bar (Simulated or hidden in standalone) */}
      {statusBarMode !== 'hidden' && (
        <TopStatusBar
          mode={statusBarMode}
          showNativeBar={true}
        />
      )}

      {/* Floating AI Presentation Toolbar (Oculto en Perfil y TIU Virtual) */}
      <PresentationToolbar
        visible={!isTiuOpen && currentTab !== 'perfil'}
        currentProfile={currentProfile}
        profiles={profiles}
        onSelectProfile={(p) => {
          setCurrentProfile(p);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
          } catch (e) {}
        }}
        onUpdateProfile={handleUpdateProfile}
        onResetProfile={handleResetProfile}
        statusBarMode={statusBarMode}
        onStatusBarModeChange={setStatusBarMode}
      />

      {/* Main Screens or TIU Virtual */}
      {isTiuOpen ? (
        <TiuScreen
          profile={currentProfile}
          onBack={() => setIsTiuOpen(false)}
        />
      ) : (
        <>
          <div className="flex-1">
            {currentTab === 'inicio' && (
              <HomeScreen
                profile={currentProfile}
                onOpenTiu={() => setIsTiuOpen(true)}
              />
            )}

            {currentTab === 'academico' && (
              <AcademicoScreen profile={currentProfile} />
            )}

            {currentTab === 'ayuda' && (
              <AyudaScreen />
            )}

            {currentTab === 'perfil' && (
              <ProfileScreen
                profile={currentProfile}
                onOpenTiu={() => setIsTiuOpen(true)}
                onLogout={handleLogout}
              />
            )}
          </div>

          {/* Bottom Navigation Bar */}
          <BottomNav
            currentTab={currentTab}
            onTabChange={(tab) => setCurrentTab(tab)}
          />
        </>
      )}
    </div>
  );
}

export default App;
