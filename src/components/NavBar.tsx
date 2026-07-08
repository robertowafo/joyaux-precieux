import { useState, useEffect, useRef } from 'react';
import { Menu, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';

interface NavBarProps {
  currentPage: 'accueil' | 'articles' | 'accompagnements' | 'ressources' | 'plan' | 'rdv';
  setCurrentPage: (page: 'accueil' | 'articles' | 'accompagnements' | 'ressources' | 'plan' | 'rdv') => void;
}

export function NavBar({ currentPage, setCurrentPage }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const menuItems = [
    { id: 'accueil', label: 'Accueil', icon: '🏠' },
    { id: 'plan', label: 'Standard Divin', icon: '💎' },
    { id: 'articles', label: 'Articles', icon: '📝' },
    { id: 'accompagnements', label: 'Accompagnements', icon: '🤝' },
    { id: 'ressources', label: 'Ressources', icon: '📚' }
  ];

  const handleNavClick = (pageId: any) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // GSAP animation on mount - bouncy slide down
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: 'elastic.out(1.05, 0.75)', delay: 0.15 }
      );
    }
  }, []);

  // GSAP scroll effect - shrink, darken border & add heavy glow/shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      const scrollY = window.scrollY;
      
      if (scrollY > 30) {
        gsap.to(navRef.current, {
          paddingTop: '10px',
          paddingBottom: '10px',
          boxShadow: '0 20px 25px -5px rgb(31 74 56 / 0.12), 0 8px 10px -6px rgb(31 74 56 / 0.12)',
          borderColor: 'rgba(31, 74, 56, 0.15)',
          backgroundColor: 'rgba(250, 248, 242, 0.95)',
          scale: 0.97,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        gsap.to(navRef.current, {
          paddingTop: '14px',
          paddingBottom: '14px',
          boxShadow: '0 10px 15px -3px rgb(31 74 56 / 0.08), 0 4px 6px -4px rgb(31 74 56 / 0.08)',
          borderColor: 'rgba(31, 74, 56, 0.08)',
          backgroundColor: 'rgba(250, 248, 242, 0.85)',
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize current scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 sm:px-6 md:px-8">
      <nav 
        ref={navRef}
        className="pointer-events-auto w-full max-w-6xl flex items-center justify-between px-4 sm:px-6 py-3.5 bg-bg/85 backdrop-blur-xl border border-lead-green/10 rounded-full shadow-lg"
      >
        <div className="flex items-center gap-3 z-50">
          <button onClick={() => handleNavClick('accueil')} className="flex items-center gap-3 group text-left cursor-pointer border-none bg-transparent p-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-md border border-lead-green/5 group-hover:scale-110 transition-transform duration-300 overflow-hidden shrink-0">
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain p-0.5" referrerPolicy="no-referrer" />
            </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-extrabold tracking-tight text-lg sm:text-xl text-lead-green">joyaux précieux</span>
              <span className="text-coral text-xs">✦</span>
            </div>
            <span className="text-[8px] sm:text-[9.5px] uppercase tracking-wider font-extrabold text-lead-green/70 font-sans leading-tight mt-0.5">
              Lina NGUERELESSIO <span className="hidden sm:inline">• Psychologie du Développement & Guidance</span>
            </span>
          </div>
        </button>
      </div>

      {/* Desktop Main Navigation Links */}
      <div className="hidden lg:flex items-center gap-1 font-semibold text-xs font-display uppercase tracking-wider">
        {menuItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-5 py-2.5 rounded-full relative transition-all cursor-pointer font-extrabold ${
                isActive ? 'text-coral' : 'text-lead-green/70 hover:text-[#ff9d00]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-mint/55 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          );
        })}
      </div>
      
      {/* Appointment CTA Button and Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => handleNavClick('rdv')}
          className="hidden md:flex items-center gap-2 px-5 py-3 bg-[#e05a47] text-white text-[10px] font-extrabold tracking-[0.15em] shadow-md uppercase rounded-full hover:bg-lead-green transition-all transform hover:-translate-y-0.5 duration-300 font-display border-none cursor-pointer"
        >
          <Heart size={12} className="fill-current" />
          Prendre RDV
        </button>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-lead-green/10 bg-white shadow-sm rounded-full text-lead-green hover:bg-lead-green hover:text-white transition-all duration-300 cursor-pointer"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile Menu Slide In Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Content Sidebar Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-bg border-l border-lead-green/10 p-8 z-50 flex flex-col justify-between shadow-2xl font-display"
            >
              <div>
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-lead-green/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-lead-green/50">Menu Navigation</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full border border-lead-green/10 flex items-center justify-center text-lead-green"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {menuItems.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all uppercase text-xs font-extrabold tracking-wider cursor-pointer ${
                          isActive 
                            ? 'bg-[#e05a47] text-white border-[#e05a47] shadow-md scale-101' 
                            : 'bg-white text-lead-green border-lead-green/5 hover:border-lead-green/20'
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <button 
                  onClick={() => handleNavClick('rdv')}
                  className="w-full py-4 bg-[#e05a47] text-white font-extrabold text-center uppercase tracking-wider text-xs rounded-xl shadow-md cursor-pointer hover:bg-lead-green transition-colors flex items-center justify-center gap-2 border-none"
                >
                  <Heart size={14} className="fill-current" /> Prendre RDV
                </button>
                <p className="text-[10px] text-center opacity-45 mt-4 leading-normal font-sans">
                  Joyaux Précieux par Lina NGUERELESSIO<br />Tous droits réservés • &copy; 2026
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  </div>
  );
}
