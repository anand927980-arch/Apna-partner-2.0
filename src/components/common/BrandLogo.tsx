import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-13 h-13',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Unique Heart-Flame original emblem */}
      <div
        className={`relative ${iconSizes[size]} rounded-2xl flex items-center justify-center p-1.5 shadow-md shadow-rose-500/20 bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 shrink-0 transform transition-transform hover:scale-105`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white filter drop-shadow"
        >
          {/* Outer glowing flame shape merging into loving heart curves */}
          <path
            d="M24 5C24 5 13 16 13 27C13 34.5 18 40 24 43C30 40 35 34.5 35 27C35 16 24 5 24 5Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          {/* Central intersecting intertwined double heart-flame */}
          <path
            d="M24 10C21 16 15 20.5 15 28C15 33 19 37 24 39C29 37 33 33 33 28C33 20.5 27 16 24 10Z"
            fill="currentColor"
          />
          <path
            d="M24 19C22.2 22.5 19 25 19 29.5C19 32.5 21.2 35 24 36.5C26.8 35 29 32.5 29 29.5C29 25 25.8 22.5 24 19Z"
            fill="#FFE4E6"
          />
          {/* Inner spark */}
          <circle cx="24" cy="27" r="2.5" fill="#E11D48" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className={`font-black tracking-tight ${titleSizes[size]} leading-none flex items-center gap-1`}>
          <span className="bg-gradient-to-r from-rose-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            Apna Partner
          </span>
          <span className="text-rose-500 text-sm animate-pulse">❤️</span>
        </div>
        {showTagline && (
          <span className="text-xs text-rose-500/90 font-medium tracking-normal mt-0.5">
            Apno se milne ka naya tareeka
          </span>
        )}
      </div>
    </div>
  );
};
