import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Globe, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/Company Logos/array_minds_logo_FOR_DARK_NAVY_SITE-removebg-preview.png';

const AdminHeader = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white border-b border-white/10 shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <img src={logoImg} alt="Array Minds" className="h-7 w-auto object-contain" />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold text-white leading-none">Array</span>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#C7CDDA] uppercase">MINDS</span>
                </div>
                <span className="text-[10px] font-mono text-[#7FE4EA] block mt-0.5">Admin Console</span>
              </div>
            </Link>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* View Live Public Site */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#C7CDDA] hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Website</span>
            </Link>

            {/* Admin User Info */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/15">
              <div className="w-8 h-8 rounded-full bg-[#00C2CB] text-[#032B2E] flex items-center justify-center text-xs font-bold shadow-xs">
                {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-white leading-tight">
                  {admin?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-[#8A99B5] font-mono">
                  {admin?.email || 'admin@arrayminds.com'}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white text-xs font-semibold border border-red-500/30 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
