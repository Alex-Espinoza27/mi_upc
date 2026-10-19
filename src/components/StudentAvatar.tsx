import React, { useState, useEffect } from 'react';

interface StudentAvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  iconClassName?: string;
}

/**
 * Avatar oficial del estudiante.
 * Si no tiene imagen o si falla al cargar:
 * Muestra fondo blanco con un icono convencional de persona en color plomo (#8B96A5),
 * manteniendo la armonía visual de la aplicación.
 */
export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  src,
  alt = 'Foto del estudiante',
  className = 'w-full h-full object-cover',
  iconClassName = 'w-[64%] h-[64%]'
}) => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center select-none overflow-hidden">
        <svg
          className={`${iconClassName} text-[#8B96A5]`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Cabeza circular proporcional */}
          <circle cx="12" cy="7.5" r="4.25" />
          {/* Torso y hombros redondeados convencionales */}
          <path d="M4.5 19.8c0-3.3 3.36-6 7.5-6s7.5 2.7 7.5 6v0.7H4.5v-0.7Z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`${className} select-none`}
    />
  );
};
