import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Globe, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/Array Minds_edited_edited.avif';

const AdminHeader = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#2D1B54] via-[#381D66] to-[#4E2F94] text-white border-b border-white/10 shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-white shadow-xs">
                <img src={logoImg} alt="Array Minds" className="h-7 w-auto object-contain" />
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-extrabold text-white">Array Minds</span>
                <span className="text-[10px] font-mono text-[#FFD1DE] block">Admin Console</span>
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-purple-100 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Website</span>
            </Link>

            {/* Admin User Info */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/15">
              <div className="w-8 h-8 rounded-full bg-[#EC1557] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-white leading-tight">
                  {admin?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-purple-200 font-mono">
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
