import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronDown, 
  ExternalLink
} from 'lucide-react';
import logoImg from '../../assets/array_minds_logo_FOR_DARK_NAVY_SITE-removebg-preview.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  const isProductsActive = location.pathname.startsWith('/products') || location.pathname.toLowerCase().startsWith('/amerp');

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProductsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 180);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    // { name: 'Industries', path: '/industries' },
    { name: 'Team', path: '/team' },
    // { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A1128]/95 bg-gradient-to-r from-[#0A1128] via-[#0D1B3E] to-[#1B3B6F] backdrop-blur-xl text-white border-b border-white/[0.08] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
            <img 
              src={logoImg} 
              alt="Array Minds" 
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-white leading-none group-hover:text-[#7FE4EA] transition-colors">
                Array
              </span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-[#C7CDDA] uppercase leading-tight mt-0.5">
                MINDS
              </span>
            </div>
          </Link>

          {/* Right: Desktop Navigation + Contact Us Button */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6 flex-shrink-0">
            <nav className="flex items-center gap-3 xl:gap-6">
              
              {/* Home Link */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative text-[13px] xl:text-[14.5px] tracking-wide py-1.5 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#7FE4EA] font-bold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#00C2CB] after:rounded-full'
                      : 'text-[#C7CDDA] hover:text-white font-medium'
                  }`
                }
              >
                Home
              </NavLink>

              {/* Products Dropdown Menu */}
              <div 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setProductsDropdownOpen((prev) => !prev)}
                  className={`group/btn relative flex items-center gap-1 text-[13px] xl:text-[14.5px] tracking-wide py-1.5 transition-colors focus:outline-none whitespace-nowrap ${
                    isProductsActive
                      ? 'text-[#7FE4EA] font-bold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#00C2CB] after:rounded-full'
                      : 'text-[#C7CDDA] hover:text-white font-medium'
                  }`}
                  aria-expanded={productsDropdownOpen}
                >
                  <span>Products</span>
                  <ChevronDown 
                    className={`w-3.5 h-3.5 transition-transform duration-200 text-[#00C2CB] ${
                      productsDropdownOpen ? 'rotate-180 text-[#7FE4EA]' : 'group-hover/btn:translate-y-0.5'
                    }`} 
                  />
                </button>

                {/* Simple Dropdown Panel */}
                {productsDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-52 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="rounded-xl bg-[#0A1128] border border-white/[0.12] p-1.5 shadow-2xl shadow-black/80 space-y-0.5">
                      
                      {/* Item 1: AppExchange Products */}
                      <Link
                        to="/products"
                        onClick={() => setProductsDropdownOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs xl:text-sm transition-all duration-150 ${
                          location.pathname === '/products'
                            ? 'bg-[#00C2CB]/15 text-[#7FE4EA] font-semibold'
                            : 'text-[#C7CDDA] hover:text-white hover:bg-white/[0.08] font-medium'
                        }`}
                      >
                        <span>AppExchange Products</span>
                      </Link>

                      {/* Item 2: AM ERP (Opens in New Window/Tab) */}
                      <a
                        href="/AMERP"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setProductsDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs xl:text-sm text-[#C7CDDA] hover:text-white hover:bg-white/[0.08] font-medium transition-all duration-150 group"
                      >
                        <span>ERP</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#8A99B5] group-hover:text-[#7FE4EA] transition-colors" />
                      </a>

                    </div>
                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              {navLinks.slice(1).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-[13px] xl:text-[14.5px] tracking-wide py-1.5 transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[#7FE4EA] font-bold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#00C2CB] after:rounded-full'
                        : 'text-[#C7CDDA] hover:text-white font-medium'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* "Contact Us" Button */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs xl:text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-200 shadow-md shadow-[#00C2CB]/25 whitespace-nowrap flex-shrink-0 hover:scale-105 active:scale-95 ${
                  isActive ? 'ring-2 ring-white/60' : ''
                }`
              }
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl bg-white/[0.08] text-white hover:bg-white/[0.15] border border-white/[0.1] focus:outline-none transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#00C2CB]" />
              ) : (
                <Menu className="w-5 h-5 text-[#C7CDDA]" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1128]/98 backdrop-blur-2xl border-t border-white/[0.08] px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {/* Home */}
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3.5 py-2 rounded-xl text-sm transition-all ${
                isActive
                  ? 'bg-white/[0.08] text-[#7FE4EA] font-bold border border-[#00C2CB]/40'
                  : 'text-[#C7CDDA] hover:bg-white/[0.05] hover:text-white font-medium'
              }`
            }
          >
            Home
          </NavLink>

          {/* Mobile Products Accordion */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileProductsOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-sm font-medium transition-all ${
                isProductsActive ? 'text-[#7FE4EA] font-bold' : 'text-[#C7CDDA] hover:text-white'
              }`}
            >
              <span>Products</span>
              <ChevronDown 
                className={`w-4 h-4 text-[#00C2CB] transition-transform duration-200 ${
                  mobileProductsOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {mobileProductsOpen && (
              <div className="px-2.5 pb-2 space-y-1 pt-1 border-t border-white/[0.06]">
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-[#C7CDDA] hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <span>AppExchange Products</span>
                </Link>
                <a
                  href="/AMERP"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-[#C7CDDA] hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <span>ERP</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8A99B5]" />
                </a>
              </div>
            )}
          </div>

          {/* Other Navigation Links */}
          {navLinks.slice(1).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'bg-white/[0.08] text-[#7FE4EA] font-bold border border-[#00C2CB]/40'
                    : 'text-[#C7CDDA] hover:bg-white/[0.05] hover:text-white font-medium'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-2">
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] shadow-lg shadow-[#00C2CB]/30 transition-all"
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
