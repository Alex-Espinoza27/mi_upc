import React from 'react';

export const UpcFlame: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 8C50 8 72 26 72 54C72 78 52 92 50 92C48 92 28 78 28 54C28 35 40 22 50 8Z"
        fill="#E40A18"
      />
      <path
        d="M50 92C50 92 64 78 64 60C64 48 57 38 50 32C50 32 58 46 58 58C58 70 50 78 50 78Z"
        fill="#B8000B"
      />
      <path
        d="M50 78C50 78 40 68 40 56C40 45 46 36 50 32C44 38 36 48 36 60C36 76 50 78 50 78Z"
        fill="#FFFFFF"
      />
    </svg>
  );
};

export const UpcHeaderLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="display font-extrabold text-[20px] text-[#000000] tracking-tight">
        MI UPC
      </span>
      <span className="text-[#CCD9EC] text-lg font-light leading-none">|</span>
      <UpcFlame className="w-6 h-6" />
    </div>
  );
};
