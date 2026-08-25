import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import logoImg from '../../assets/array_minds_logo_FOR_DARK_NAVY_SITE-removebg-preview.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    // { name: 'Industries', path: '/industries' },
    { name: 'Team', path: '/team' },
    // { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A1128]/80 bg-gradient-to-r from-[#0A1128]/90 via-[#0D1B3E]/85 to-[#1B3B6F]/90 backdrop-blur-xl text-white border-b border-white/[0.08] shadow-md transition-all duration-300">
      {/* Full-width wrapper with wide padding */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group py-1">
            <img 
              src={logoImg} 
              alt="Array Minds" 
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.05]"
            />
            <div className="flex flex-col justify-center">
              <span className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white leading-none group-hover:text-[#7FE4EA] transition-colors">
                Array
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.28em] text-[#C7CDDA] uppercase leading-tight mt-0.5">
                MINDS
              </span>
            </div>
          </Link>

          {/* Right: Desktop Navigation + Contact Us Button */}
          <div className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            <nav className="flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-[15px] tracking-wide py-2 transition-all duration-200 ${
                      isActive
                        ? 'text-white font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-[#00C2CB] after:rounded-full shadow-cyan'
                        : 'text-[#C7CDDA] hover:text-white font-medium'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* High-end "Contact Us" Pill CTA Button */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-300 shadow-md shadow-[#00C2CB]/30 transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap ${
                  isActive
                    ? 'ring-2 ring-white/60 shadow-lg shadow-[#00C2CB]/50'
                    : ''
                }`
              }
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-xl bg-white/[0.08] text-white hover:bg-white/[0.15] border border-white/[0.1] focus:outline-none transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#00C2CB]" />
              ) : (
                <Menu className="w-6 h-6 text-[#C7CDDA]" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1128]/95 backdrop-blur-2xl border-t border-white/[0.08] px-5 pt-4 pb-7 space-y-2.5 shadow-2xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-base transition-all ${
                  isActive
                    ? 'bg-white/[0.08] text-[#7FE4EA] font-bold border border-[#00C2CB]/40'
                    : 'text-[#C7CDDA] hover:bg-white/[0.05] hover:text-white font-medium'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-3">
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-base font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] shadow-lg shadow-[#00C2CB]/30 transition-all"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
