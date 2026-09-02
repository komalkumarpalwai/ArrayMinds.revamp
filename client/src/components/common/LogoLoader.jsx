import React from 'react';
import logoImg from '../../assets/Company Logos/array_minds_logo_FOR_DARK_NAVY_SITE-removebg-preview.png';

const LogoLoader = ({ text = "Loading...", size = "md" }) => {
  const sizeClasses = {
    sm: {
      logo: "h-5",
      orbit1: "w-20 h-20",
      orbit2: "w-24 h-24",
      dot1: "w-2 h-2",
      dot2: "w-1.5 h-1.5",
      text: "text-xs",
      bar: "w-32 h-1",
    },
    md: {
      logo: "h-7",
      orbit1: "w-28 h-28",
      orbit2: "w-36 h-36",
      dot1: "w-2.5 h-2.5",
      dot2: "w-2 h-2",
      text: "text-xs sm:text-sm",
      bar: "w-40 h-1.5",
    },
    lg: {
      logo: "h-10",
      orbit1: "w-36 h-36",
      orbit2: "w-44 h-44",
      dot1: "w-3 h-3",
      dot2: "w-2.5 h-2.5",
      text: "text-sm sm:text-base",
      bar: "w-48 h-1.5",
    }
  };

  const s = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6 animate-fade-in">
      {/* Logo & Orbiting Rings */}
      <div className="relative flex items-center justify-center">
        
        {/* Outer Orbiting Ring 1 */}
        <div className={`absolute ${s.orbit1} rounded-full border-2 border-dashed border-[#00C2CB]/40 animate-spin-slow`}></div>
        
        {/* Outer Orbiting Ring 2 */}
        <div className={`absolute ${s.orbit2} rounded-full border border-dotted border-[#1B3B6F]/30 animate-spin-reverse`}></div>

        {/* Aura Glow */}
        <div className="absolute w-24 h-24 bg-[#00C2CB]/25 rounded-full blur-xl animate-pulse pointer-events-none"></div>

        {/* Pure Floating Official Brand Logo */}
        <div className="relative flex items-center justify-center gap-2.5 p-2 z-10">
          <img
            src={logoImg}
            alt="Array Minds"
            className={`${s.logo} w-auto object-contain animate-pulse-gentle`}
          />
          <div className="flex flex-col text-left">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-none">
              Array
            </span>
            <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.22em] text-[#C7CDDA] uppercase leading-tight mt-0.5">
              MINDS
            </span>
          </div>
        </div>

        {/* Satellite Particle 1 */}
        <div className={`absolute ${s.orbit1} animate-spin-slow pointer-events-none`}>
          <span className={`absolute top-0 left-1/2 -translate-x-1/2 ${s.dot1} bg-[#00C2CB] rounded-full shadow-md shadow-[#00C2CB]`}></span>
        </div>

        {/* Satellite Particle 2 */}
        <div className={`absolute ${s.orbit2} animate-spin-reverse pointer-events-none`}>
          <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${s.dot2} bg-[#7FE4EA] rounded-full shadow-md shadow-[#7FE4EA]`}></span>
        </div>
      </div>

      {/* Loading Text & Animated Bar */}
      <div className="text-center space-y-2.5">
        {text && (
          <p className={`${s.text} font-semibold text-gray-700`}>
            {text}
          </p>
        )}
        <div className={`${s.bar} bg-gray-200/80 rounded-full overflow-hidden mx-auto`}>
          <div className="h-full bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-[#00C2CB] rounded-full animate-loader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LogoLoader;
