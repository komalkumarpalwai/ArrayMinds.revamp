import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, Globe2, Sparkles, Building } from 'lucide-react';
import logoImg from '../../assets/Company Logos/array_minds_logo_FOR_DARK_NAVY_SITE-removebg-preview.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const offices = [
    {
      city: 'London',
      country: 'United Kingdom',
      flag: '🇬🇧',
      address: '25 South Park Hill Road, South Croydon CR2 7DZ, UK',
      phone: '+44 7447 917 183',
      telLink: '+447447917183',
    },
    {
      city: 'Coimbatore',
      country: 'India',
      flag: '🇮🇳',
      address: 'INDIALAND Tech Park CHIL SEZ Campus Saravanampatti Coimbatore, Tamil Nadu 641035',
      phone: '+91 8754 380 969',
      telLink: '+918754380969',
    },
    {
      city: 'Hyderabad',
      country: 'India',
      flag: '🇮🇳',
      address: '7-96/5, Heeba Villa, Shankar Nagar Colony, Uppal Depot, Hyderabad, Telangana 500039',
      phone: '+91 8754 380 969',
      telLink: '+918754380969',
    },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'AppExchange Products', path: '/products' },
    { name: 'AM ERP', path: '/AMERP', external: true },
    { name: 'Services', path: '/services' },
    { name: 'AI Implementations', path: '/ai-implementations' },
    // { name: 'Industries', path: '/industries' },
    { name: 'Team', path: '/team' },
    // { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/arrayminds/',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 1.63 1.63A1.63 1.63 0 0 0 7.86 6.7z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@ArrayMinds-he8hm',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61564422908197',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/arrayminds',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative z-30 w-full bg-[#070D1E] bg-gradient-to-b from-[#0A1128] via-[#0D1B3E] to-[#070D1E] text-white pt-16 pb-8 border-t border-white/[0.08] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 3-Column Enterprise Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/[0.08]">
          
          {/* Column 1: Company Profile & Direct Contact (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img 
                src={logoImg} 
                alt="Array Minds" 
                className="h-8 sm:h-9 w-auto object-contain hover:opacity-95 transition-opacity"
              />
              <div className="flex flex-col justify-center">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none group-hover:text-[#7FE4EA] transition-colors">
                  Array
                </span>
                <span className="text-[10px] font-bold tracking-[0.28em] text-[#C7CDDA] uppercase leading-tight mt-0.5">
                  MINDS
                </span>
              </div>
            </Link>
            
            <p className="text-[#C7CDDA] text-sm leading-relaxed pr-3 font-normal">
              Empowering global enterprises with next-generation Salesforce architecture, Custom Cloud Engineering, and Autonomous AI Solutions.
            </p>

            {/* Contact Details */}
            <div className="space-y-3 pt-1 text-sm text-[#C7CDDA]">
              <a 
                href="mailto:info@arrayminds.com" 
                className="flex items-center gap-3 hover:text-[#7FE4EA] group transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center text-[#00C2CB] group-hover:bg-[#00C2CB] group-hover:text-[#032B2E] transition-all shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-medium group-hover:underline">info@arrayminds.com</span>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center text-[#00C2CB]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-[#8A99B5] block">London Direct</span>
                  <a href="tel:+447447917183" className="font-semibold text-sm hover:text-[#7FE4EA] hover:underline transition-colors text-white">
                    +44 7447 917 183
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center text-[#00C2CB]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-[#8A99B5] block">India Direct</span>
                  <a href="tel:+918754380969" className="font-semibold text-sm hover:text-[#7FE4EA] hover:underline transition-colors text-white">
                    +91 8754 380 969
                  </a>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="pt-2">
              <div className="flex space-x-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-[#00C2CB] hover:text-[#032B2E] flex items-center justify-center text-[#C7CDDA] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md hover:shadow-[#00C2CB]/30 border border-white/[0.08]"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links in 2 Columns (3.5 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#00C2CB] border-b border-white/[0.08] pb-2.5">
              Navigation
            </h3>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-1 text-sm text-[#C7CDDA]">
              {quickLinks.map((link) => 
                link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#7FE4EA] hover:translate-x-0.5 py-0.5 transition-all text-[13.5px] font-medium inline-flex items-center gap-1"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#00C2CB]" />
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="hover:text-[#7FE4EA] hover:translate-x-0.5 py-0.5 transition-all text-[13.5px] font-medium"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Column 3: Global Hubs (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#00C2CB] border-b border-white/[0.08] pb-2.5">
              Global Office Locations
            </h3>
            
            <div className="space-y-3 pt-1">
              {offices.map((office) => (
                <div 
                  key={office.city} 
                  className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all duration-300 shadow-sm group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{office.flag}</span>
                      <span className="text-sm font-semibold text-white tracking-wide">
                        {office.city}, {office.country}
                      </span>
                    </div>
                    <a 
                      href={`tel:${office.telLink}`} 
                      className="text-xs text-[#8A99B5] group-hover:text-[#7FE4EA] font-medium flex items-center gap-1 hover:underline transition-colors"
                    >
                      <span>{office.phone}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#00C2CB]" />
                    </a>
                  </div>
                  <p className="text-xs text-[#C7CDDA]/80 leading-relaxed pl-5">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A99B5] gap-2">
          <p>© {currentYear} Array Minds. All rights reserved.</p>
          <p className="text-[#C7CDDA] text-[11px] sm:text-xs font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]"></span>
            <span>Official Salesforce & Databricks Partner</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
