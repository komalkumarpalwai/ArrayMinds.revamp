import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/array_minds_logo_FOR_DARK_NAVY_SITE-removebg-preview.png';
import salesforceLogo from '../../assets/salesforce-logo2.png';
import databricksLogo from '../../assets/databricks-logo2.png';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFade(true), 250);
          setTimeout(() => setLoading(false), 850);
          return 100;
        }
        const step = Math.max(1, Math.floor((100 - prev) / 6));
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070D1E] overflow-hidden select-none transition-all duration-700 ease-in-out ${
        fade ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Gradient Canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1128] via-[#0D1B3E] to-[#1B3B6F] opacity-95"></div>

      {/* Cybernetic Ambient Glows */}
      <div className="absolute w-[600px] h-[600px] bg-[#00C2CB]/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
      <div className="absolute w-[450px] h-[450px] bg-[#1B3B6F]/30 rounded-full blur-[100px] pointer-events-none -bottom-20 -right-20"></div>

      {/* Main Experience Container */}
      <div className="relative z-10 flex flex-col items-center max-w-xl w-full px-6 space-y-9 text-center">
        
        {/* Official Brand Logo */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute -inset-10 bg-gradient-to-r from-[#00C2CB]/30 via-[#7FE4EA]/20 to-[#6C4AB6]/30 rounded-full blur-3xl animate-pulse-gentle pointer-events-none"></div>
          
          <div className="flex items-center gap-3.5 sm:gap-4 relative z-10 animate-pulse-gentle">
            <img
              src={logoImg}
              alt="Array Minds"
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_20px_rgba(0,194,203,0.4)]"
            />
            <div className="flex flex-col text-left">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-none">
                array
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-[0.3em] text-[#C7CDDA] uppercase leading-tight mt-1">
                MINDS
              </span>
            </div>
          </div>
        </div>

        {/* Enterprise Brand Quote */}
        <div className="space-y-2.5 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[11px] font-semibold tracking-wider text-[#7FE4EA] backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-[#00C2CB]" />
            <span>Next-Gen Enterprise Architecture</span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
            Where <span className="text-[#7FE4EA]">Retail & Enterprise</span> Meet <br />
            <span className="bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-[#00C2CB] bg-clip-text text-transparent">
              Autonomous AI & Cloud Automation
            </span>
          </h2>
        </div>

        {/* Partner Ecosystem Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          {/* Salesforce Partner Badge */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-md shadow-sm hover:border-[#00C2CB]/50 transition-all">
            <img src={salesforceLogo} alt="Salesforce" className="h-5 w-auto object-contain" />
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#8A99B5] block uppercase leading-none">Official</span>
              <span className="text-xs font-bold text-white leading-tight">Salesforce Partner</span>
            </div>
          </div>

          {/* Databricks Partner Badge */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-md shadow-sm hover:border-[#00C2CB]/50 transition-all">
            <img src={databricksLogo} alt="Databricks" className="h-5 w-auto object-contain brightness-0 invert" />
            <div className="text-left">
              <span className="text-[10px] font-mono text-[#8A99B5] block uppercase leading-none">Certified</span>
              <span className="text-xs font-bold text-white leading-tight">Databricks Partner</span>
            </div>
          </div>
        </div>

        {/* Progress Bar & Telemetry Readout */}
        <div className="w-full max-w-xs space-y-3 mx-auto pt-2">
          <div className="relative w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden border border-white/[0.1]">
            <div
              className="h-full bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-[#00C2CB] rounded-full shadow-[0_0_12px_#00C2CB] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A99B5] px-1">
            <span className="flex items-center gap-1.5 text-[#00C2CB]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB] animate-ping"></span>
              <span>
                {progress < 35 ? 'INITIALIZING ARCHITECTURE...' : progress < 75 ? 'CONNECTING ECOSYSTEMS...' : 'SYSTEM READY'}
              </span>
            </span>
            <span className="font-bold text-white tracking-widest">{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
