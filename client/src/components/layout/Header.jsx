import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import logoImg from '../../assets/Array Minds_edited_edited.avif';

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
    <header className="sticky top-0 z-50 shadow-md bg-gradient-to-r from-[#4E2F94] via-[#5B3BA8] to-[#6C4AB6] text-white border-b border-white/10 backdrop-blur-md">
      {/* Full-width wrapper with wide padding */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group">
            <img 
              src={logoImg} 
              alt="Array Minds" 
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] drop-shadow-sm"
            />
          </Link>

          {/* Right: Desktop Navigation + Contact Us Button */}
          <div className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            <nav className="flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-[15px] font-medium tracking-wide py-2 transition-all duration-200 ${
                      isActive
                        ? 'text-[#FFD1DE] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-[#EC1557] after:rounded-full'
                        : 'text-white/90 hover:text-white hover:opacity-100'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* High-end "Contact Us" CTA Button */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 shadow-md transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0070D2] hover:bg-[#005fb2] ring-2 ring-white/60 shadow-lg shadow-[#0070D2]/50'
                    : 'bg-[#EC1557] hover:bg-[#d0104a] shadow-md shadow-[#EC1557]/30 hover:shadow-lg hover:shadow-[#EC1557]/50'
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
              className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 focus:outline-none transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#EC1557]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#4E2F94]/98 backdrop-blur-xl border-t border-white/10 px-5 pt-4 pb-7 space-y-2.5 shadow-2xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-white/20 text-[#FFD1DE] font-bold border border-white/20'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
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
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 w-full py-3 rounded-full text-base font-bold text-white transition-all ${
                  isActive
                    ? 'bg-[#0070D2] shadow-lg shadow-[#0070D2]/40 ring-2 ring-white/50'
                    : 'bg-[#EC1557] hover:bg-[#d0104a] shadow-lg shadow-[#EC1557]/30'
                }`
              }
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
