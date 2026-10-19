import React from 'react';

/**
 * Logotipo oficial de la llama UPC adjuntado
 */
export const UpcFlame: React.FC<{ className?: string }> = ({ className = "w-[26px] h-[26px]" }) => {
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/upc-logo.png`}
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
      <UpcFlame className="w-[26px] h-[26px]" />
    </div>
  );
};

/**
 * Icono de chincheta roja / pin redondo (chupetín) para Campus Villa
 */
export const UpcPinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Esfera roja (chupetín) con brillo sutil */}
      <circle cx="12" cy="7" r="5.5" fill="#D3101E" />
      <circle cx="10.2" cy="5.2" r="1.6" fill="#FFA5AC" />
      {/* Aguja / vástago hacia abajo */}
      <path d="M12 12.5V20.5" stroke="#717D96" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};
