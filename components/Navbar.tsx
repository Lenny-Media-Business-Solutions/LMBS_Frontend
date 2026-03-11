import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { NAV_LINKS } from '../constants';

import logo from '../assets/images/Lmbs_logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    // Passive listener improves scroll performance by not blocking the main thread
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${isScrolled || location.pathname.includes('dashboard')
          ? 'bg-navy-900/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-4 border-b border-white/10'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3 shrink-0">
              <div className="relative flex items-center justify-center w-14 h-14 transform transition-transform group-hover:scale-110 -translate-y-1">
                <img
                  src={logo}
                  alt="LMBS Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col -mt-1">
                <span className={`text-xl lg:text-2xl font-heading font-bold leading-none tracking-tight transform -translate-y-1 group-hover:-translate-y-1.5 transition-all duration-300 ${isScrolled || location.pathname.includes('dashboard')
                    ? 'text-white'
                    : 'text-navy-900'
                  } group-hover:text-gold-400`}>
                  LMBS
                </span>
                <span className={`text-[8px] lg:text-[10px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap mt-1.5 transition-all duration-300 ${isScrolled || location.pathname.includes('dashboard')
                    ? 'text-white/60'
                    : 'text-navy-900/60'
                  } group-hover:text-gold-400/80`}>
                  Lenny Media Business Solutions
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1 2xl:gap-2">
              <div className="flex items-center bg-navy-950/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 mr-2 2xl:mr-4 shadow-xl">
                {NAV_LINKS.map((link) => {
                  const isDashboard = link.path.includes('dashboard');
                  let linkClasses = "relative px-3 2xl:px-4 py-2 text-[11px] lg:text-[13px] 2xl:text-sm transition-all rounded-full whitespace-nowrap font-heading font-semibold tracking-wide flex items-center gap-1.5 ";

                  if (location.pathname === link.path) {
                    linkClasses += "text-navy-900 bg-gold-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] transform scale-105";
                  } else {
                    linkClasses += isDashboard
                      ? "text-gold-400/80 hover:text-gold-400 hover:bg-white/5"
                      : "text-gray-100 hover:text-gold-400 hover:bg-white/10";
                  }

                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={linkClasses}
                    >
                      {link.name === 'Client Portal' && <User size={12} />}
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <Link
                to="/quote"
                className="relative overflow-hidden bg-gradient-to-r from-gold-500 to-orange-500 text-white px-5 py-2.5 rounded-full font-heading font-bold text-[12px] lg:text-[13px] 2xl:text-sm transition-all hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] transform hover:scale-105 shrink-0 border border-white/20"
              >
                <span className="relative z-10">Get a Quote</span>
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full hover:translate-x-0 transition-transform duration-300"></div>
              </Link>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              className="xl:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`xl:hidden absolute top-full left-0 w-full bg-navy-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl transition-all duration-300 ease-in-out origin-top overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="flex flex-col px-6 py-6 space-y-1.5 overflow-y-auto max-h-[85vh]">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-1">Navigation</p>
            {NAV_LINKS.map((link) => {
              const isDashboard = link.path.includes('dashboard');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base py-3 px-4 rounded-xl transition-all font-heading flex items-center gap-3 ${location.pathname === link.path
                    ? 'font-bold bg-gold-500 text-navy-900 shadow-lg'
                    : isDashboard
                      ? 'font-semibold text-gold-400 bg-gold-500/5 hover:bg-gold-500/10'
                      : 'font-semibold text-gray-200 hover:bg-white/5 hover:text-gold-400'
                    }`}
                >
                  {link.name === 'Client Portal' && <User size={18} />}
                  {link.name}
                </Link>
              );
            })}
            <div className="h-4"></div>
            <Link
              to="/quote"
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 text-center py-4 rounded-xl font-heading font-bold shadow-lg transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;