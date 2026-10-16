import React from 'react';
import { Home, GraduationCap, MessageSquare, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'academico', label: 'Académico', icon: GraduationCap },
    { id: 'ayuda', label: 'Ayuda', icon: MessageSquare },
    { id: 'perfil', label: 'Perfil', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#FFFFFF] border-t border-[#D6D9E2]/60 shadow-[0_-2px_10px_rgba(30,40,80,0.08)] z-40 safe-bottom">
      <div className="flex items-center justify-around h-[64px]">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center w-full h-full cursor-pointer transition-all active:scale-95 pt-1.5"
            >
              {/* Barra superior activa de ~20×4 dp con esquinas redondeadas sobre el icono */}
              {isActive && (
                <span className="absolute top-0 w-[20px] h-[4px] bg-[#E40A18] rounded-full" />
              )}
              <Icon
                className={`w-[22px] h-[22px] transition-colors ${
                  isActive ? 'text-[#D3101E] stroke-[2.4]' : 'text-[#000000] stroke-[1.8]'
                }`}
              />
              <span
                className={`text-[14px] mt-1 transition-colors leading-tight ${
                  isActive
                    ? 'text-[#D3101E] font-bold'
                    : 'text-[#000000] font-normal'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
