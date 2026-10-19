import React from 'react';

/**
 * Logotipo oficial vectorial de la llama UPC extraído del APK (logo_upc.svg)
 */
export const UpcFlame: React.FC<{ className?: string }> = ({ className = "w-[24px] h-[24px]" }) => {
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/logo_upc.svg`}
      alt="UPC"
      className={`${className} object-contain select-none`}
    />
  );
};

export const UpcHeaderLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="display font-extrabold text-[20px] text-[#000000] tracking-tight">
        MI UPC
      </span>
      <span className="text-[#CCD9EC] text-lg font-light leading-none">|</span>
      <UpcFlame className="w-[24px] h-[24px]" />
    </div>
  );
};

/**
 * Icono oficial 3D de chincheta roja para Campus Villa extraído del APK (pinned.png)
 */
export const UpcPinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/pinned.png`}
      alt="Ubicación"
      className={`${className} object-contain select-none`}
    />
  );
};
