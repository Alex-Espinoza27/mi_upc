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
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-40 safe-bottom">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center w-full h-full cursor-pointer transition-all active:scale-95"
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-[3px] bg-[#E30613] rounded-full" />
              )}
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-[#E30613] stroke-[2.4]' : 'text-[#8790A0] stroke-[1.8]'
                }`}
              />
              <span
                className={`text-[11px] mt-1 transition-colors ${
                  isActive ? 'text-[#E30613] font-semibold' : 'text-[#8790A0] font-normal'
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
