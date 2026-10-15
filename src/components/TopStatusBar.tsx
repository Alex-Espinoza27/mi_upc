import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface TopStatusBarProps {
  mode?: 'android' | 'ios';
  showNativeBar?: boolean;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({ mode = 'android', showNativeBar = true }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      if (mode === 'android') {
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        setTimeStr(`${formattedHours}:${minutes} ${ampm}`);
      } else {
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setTimeStr(`${hours}:${minutes}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [mode]);

  if (!showNativeBar) return <div className="h-2" />;

  if (mode === 'ios') {
    return (
      <div className="w-full flex items-center justify-between px-7 pt-2.5 pb-1 text-black text-xs font-semibold select-none z-30">
        <span>{timeStr || '10:14'}</span>
        <div className="flex items-center gap-1.5">
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 h-1.5 bg-black rounded-full" />
            <span className="w-0.5 h-2 bg-black rounded-full" />
            <span className="w-0.5 h-2.5 bg-black rounded-full" />
            <span className="w-0.5 h-3 bg-black rounded-full" />
          </div>
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center gap-1 bg-[#FDE047] text-black px-1.5 py-0.5 rounded-full text-[10px] font-bold">
            <span>37</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-between px-4 pt-1.5 pb-1 text-[#2B303A] text-xs font-medium select-none z-30">
      <div className="flex items-center gap-2">
        <span className="font-semibold">{timeStr || '10:24 PM'}</span>
      </div>
      <div className="flex items-center gap-1.5 text-[11px]">
        <span className="text-[9px] font-bold tracking-tight">VoLTE</span>
        <span className="text-[9px] font-bold tracking-tight">4.5G</span>
        <div className="flex items-center gap-1 border border-gray-400 px-1 py-0.2 rounded text-[10px] font-bold bg-[#E7F8EC]">
          <span>49</span>
        </div>
      </div>
    </div>
  );
};
