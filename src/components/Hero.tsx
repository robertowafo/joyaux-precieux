import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Compass, Star } from 'lucide-react';
import { gsap } from 'gsap';

export function Hero({ onNavigate }: { onNavigate?: (page: 'accueil' | 'articles' | 'accompagnements' | 'ressources' | 'plan' | 'rdv') => void }) {
  const titleContainerRef = useRef<HTMLHeadingElement>(null);
  const flowerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!titleContainerRef.current) return;

    // Select all split character spans
    const chars = titleContainerRef.current.querySelectorAll('.gsap-hero-char');
    
    // Set wild starting configurations (exactly what a playful kids app deserves!)
    gsap.set(chars, {
      opacity: 0,
      scale: 0,
      y: () => gsap.utils.random(-140, 140),
      x: () => gsap.utils.random(-60, 60),
      rotate: () => gsap.utils.random(-180, 180),
    });

    const tl = gsap.timeline({ delay: 0.1 });

    // 1. Elastic bouncy entrance for each single character
    tl.to(chars, {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      rotate: 0,
      duration: 1.6,
      stagger: {
        each: 0.02,
        from: 'center',
      },
      ease: 'elastic.out(1.15, 0.45)',
    });

    // 2. Playful scale-and-spin on the custom flower element
    if (flowerRef.current) {
      tl.fromTo(flowerRef.current, {
        scale: 0,
        rotate: -360,
      }, {
        scale: 1,
        rotate: 12,
        duration: 1.4,
        ease: 'elastic.out(1.2, 0.4)',
      }, '-=1.1');

      // Infinite breathing slow rotation to make it feel alive!
      gsap.to(flowerRef.current, {
        rotate: 372,
        duration: 18,
        repeat: -1,
        ease: 'none',
        delay: 1.5
      });
    }

    // 3. Hover bouncy dynamics on characters (popping upward, rotating, and changing color!)
    const onCharEnter = (e: MouseEvent) => {
      const char = e.currentTarget as HTMLElement;
      gsap.to(char, {
        scale: 1.35,
        y: -18,
        rotate: gsap.utils.random(-22, 22),
        color: '#ff9d00', // Highlight orange
        duration: 0.45,
        ease: 'elastic.out(1.2, 0.38)',
        overwrite: 'auto'
      });
    };

    const onCharLeave = (e: MouseEvent) => {
      const char = e.currentTarget as HTMLElement;
      const isAltColor = char.classList.contains('is-alt-color');
      gsap.to(char, {
        scale: 1,
        y: 0,
        rotate: 0,
        color: isAltColor ? '#e05a47' : '#1f4a38', // Base brand colors
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    const onCharClick = (e: MouseEvent) => {
      const char = e.currentTarget as HTMLElement;
      // Satisfying elastic 360 loop flip!
      gsap.timeline()
        .to(char, {
          y: -35,
          rotate: 360,
          scale: 1.5,
          duration: 0.35,
          ease: 'power2.out'
        })
        .to(char, {
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.55,
          ease: 'bounce.out'
        });
    };

    // Bind event listeners
    chars.forEach((char) => {
      char.addEventListener('mouseenter', onCharEnter as any);
      char.addEventListener('mouseleave', onCharLeave as any);
      char.addEventListener('click', onCharClick as any);
    });

    return () => {
      chars.forEach((char) => {
        char.removeEventListener('mouseenter', onCharEnter as any);
        char.removeEventListener('mouseleave', onCharLeave as any);
        char.removeEventListener('click', onCharClick as any);
      });
    };
  }, []);

  // Collapse and elastic rearrange of all letters when clicking the cute flower!
  const handleRescramble = () => {
    if (!titleContainerRef.current) return;
    const chars = titleContainerRef.current.querySelectorAll('.gsap-hero-char');
    
    gsap.timeline()
      .to(chars, {
        scale: 0.15,
        y: () => gsap.utils.random(-120, 120),
        x: () => gsap.utils.random(-60, 60),
        rotate: () => gsap.utils.random(-180, 180),
        duration: 0.45,
        stagger: {
          each: 0.01,
          from: 'center'
        },
        ease: 'power3.in'
      })
      .to(chars, {
        scale: 1,
        y: 0,
        x: 0,
        rotate: 0,
        duration: 1.4,
        stagger: {
          each: 0.02,
          from: 'random'
        },
        ease: 'elastic.out(1.1, 0.45)'
      });

    if (flowerRef.current) {
      gsap.to(flowerRef.current, {
        rotate: '+=720',
        scale: 1.45,
        duration: 0.8,
        yoyo: true,
        repeat: 1,
        ease: 'back.out(1.6)'
      });
    }
  };

  const renderInteractiveText = (text: string, isAltColor: boolean = false, idPrefix: string) => {
    const words = text.split(/(\s+)/);
    return words.map((word, wordIdx) => {
      if (/^\s+$/.test(word)) {
        return (
          <span 
            key={`${idPrefix}-space-${wordIdx}`} 
            className="inline-block"
            style={{ width: `${0.26 * word.length}em` }}
          >
            &nbsp;
          </span>
        );
      }
      return (
        <span key={`${idPrefix}-word-${wordIdx}`} className="inline-block whitespace-nowrap">
          {word.split('').map((char, index) => {
            return (
              <span
                key={`${idPrefix}-${wordIdx}-${index}`}
                className={`gsap-hero-char inline-block font-friendly transition-colors duration-150 relative cursor-pointer ${
                  isAltColor 
                    ? 'text-coral is-alt-color' 
                    : 'text-lead-green'
                }`}
                style={{ 
                  display: 'inline-block',
                  transformOrigin: 'center bottom'
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      );
    });
  };

  const SVGFlower = () => (
    <svg 
      ref={flowerRef}
      viewBox="0 0 100 100" 
      onClick={handleRescramble}
      className="inline-block w-11 h-11 md:w-16 md:h-16 mx-1 cursor-pointer select-none pointer-events-auto transform-gpu absolute md:relative -top-2 md:top-0 scale-100 hover:scale-110"
      style={{ verticalAlign: 'middle' }}
      title="Cliquez pour secouer les lettres !"
    >
      {/* Petal 1 Top (Coral) */}
      <ellipse cx="50" cy="27" rx="15" ry="21" fill="#e05a47" />
      {/* Petal 2 Right (Highlight Yellow) */}
      <ellipse cx="73" cy="50" rx="21" ry="15" fill="#ff9d00" />
      {/* Petal 3 Bottom (Mint) */}
      <ellipse cx="50" cy="73" rx="15" ry="21" fill="#e8f1ec" fillOpacity="0.85" />
      {/* Petal 4 Left (Lead Green) */}
      <ellipse cx="27" cy="50" rx="21" ry="15" fill="#1f4a38" />
      
      {/* Central disk */}
      <circle cx="50" cy="50" r="11" fill="#ff9d00" stroke="#FAF8F2" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="4.5" fill="#1f4a38" />
    </svg>
  );

  const cards = [
    { 
      title: "Conception à la Naissance", 
      rot: "-9deg",  
      y: 0, 
      img: "/images/target_2_newborn_feet.jpg",
      color: "border-[6px] border-[#e8f1ec]",
      badge: "🤰 Conception à Naissance"
    },
    { 
      title: "Enfance (2 à 10 ans)", 
      rot: "-4deg",  
      y: -18, 
      img: "/images/hero_1_mother_child_playing.jpg",
      color: "border-[6px] border-[#fdf6e2]",
      badge: "👶 Enfance (2 à 10 ans)"
    },
    { 
      title: "Adolescents (10-12 à 18)", 
      rot: "1deg",    
      y: -10, 
      img: "/images/target_3_teenager_sunrise.jpg",
      color: "border-[6px] border-coral/10",
      badge: "🧑 Adolescents (10-18 ans)"
    },
    { 
      title: "Adulte (18 ans et plus)", 
      rot: "6deg",   
      y: 10, 
      img: "/images/hero_3_family_hugging.jpg",
      color: "border-[6px] border-lead-green/10",
      badge: "👪 Adulte (18 ans et plus)"
    },
    { 
      title: "Communautés & Écoles", 
      rot: "11deg",   
      y: 22, 
      img: "/images/african_children_playing.jpg",
      color: "border-[6px] border-[#e3f2fd]",
      badge: "⛪ Églises & Éducateurs"
    }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 flex flex-col items-center text-center overflow-hidden min-h-screen bg-bg">
      {/* Playful Colorful Rainbow in the background */}
      <div className="absolute top-[32%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-15 pointer-events-none -z-10 select-none hidden md:block">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Red ring */}
          <path d="M 10,50 A 40,40 0 0,1 90,50" fill="none" stroke="#e05a47" strokeWidth="6" strokeLinecap="round" />
          {/* Orange ring */}
          <path d="M 18,50 A 32,32 0 0,1 82,50" fill="none" stroke="#ff9d00" strokeWidth="6" strokeLinecap="round" />
          {/* Green ring */}
          <path d="M 26,50 A 24,24 0 0,1 74,50" fill="none" stroke="#e8f1ec" strokeWidth="6" strokeLinecap="round" />
          {/* Lead green ring */}
          <path d="M 34,50 A 16,16 0 0,1 66,50" fill="none" stroke="#1f4a38" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>

      {/* Floating Smiling Star */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[28%] left-[10%] pointer-events-auto cursor-pointer drop-shadow-md select-none hidden md:block"
        whileHover={{ scale: 1.3, rotate: 45 }}
      >
        <span className="text-5xl">⭐</span>
      </motion.div>

      {/* Playful Floating elements animated with physics-based floating keyframes */}
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[12%] left-[8%] pointer-events-none opacity-80"
      >
        <div className="w-16 h-16 rounded-full bg-highlight flex items-center justify-center text-white text-2xl shadow-lg relative">
          ✨
          <div className="absolute -inset-1 rounded-full border border-dashed border-highlight/50 animate-spin"></div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ 
          y: [-10, 10, -10],
          scale: [1, 1.03, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[18%] right-[10%] pointer-events-none opacity-80"
      >
        <div className="bg-mint text-lead-green text-xs font-bold px-4 py-2.5 rounded-full shadow-md flex items-center gap-2 border border-lead-green/10">
          🌱 Éveiller les Joyaux Précieux
        </div>
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, -25, 0],
          rotate: [12, 18, 6, 12]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[20%] left-[3%] opacity-40 pointer-events-none hidden md:block"
      >
        <div className="text-coral text-6xl">🎈</div>
      </motion.div>

      {/* Small badge header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full bg-mint border border-lead-green/10 text-lead-green font-friendly font-semibold text-xs md:text-sm shadow-sm"
      >
        <Sparkles size={14} className="text-[#ff9d00] fill-current" />
        ✨ ACCOMPAGNEMENT PSYCHO-ÉDUCATIF • LINA NGUERELESSIO
      </motion.div>

      {/* Main Title - Deluxe Text Reveal with GSAP and Rotating Flower Key */}
      <h1 
        ref={titleContainerRef}
        className="text-[8.5vw] sm:text-6xl md:text-7xl lg:text-[4.8rem] xl:text-[5.8rem] font-friendly font-bold tracking-tight leading-[1.1] max-w-[85rem] text-lead-green flex flex-col items-center pb-4 text-center"
        id="gsap-hero-title-interactive"
      >
        <span className="block py-1 leading-none select-none">
          {renderInteractiveText("Contribuer à la restauration", false, "line1")}
        </span>
        <span className="block py-1 leading-none select-none flex items-center justify-center flex-wrap gap-y-1.5 gap-x-1 md:gap-x-0">
          {renderInteractiveText("de la famille selon le", false, "line2")}
          <SVGFlower />
          <span className="inline-block relative">
            {renderInteractiveText("Standard Divin", true, "line3")}
          </span>
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 text-lg sm:text-xl md:text-xl text-lead-green/75 max-w-3xl font-medium leading-relaxed font-friendly"
      >
        Des repères bienveillants axés sur le développement et une approche ancrée dans l'écoute et la foi pour aider chaque enfant, adolescent et parent à s'épanouir.
      </motion.p>

      {/* Cute buttons block */}
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
         className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <button 
          onClick={() => {
            if (onNavigate) {
              onNavigate('rdv');
            } else {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="px-8 py-5 bg-[#e05a47] text-white text-xs font-bold tracking-[0.2em] shadow-lg hover:shadow-xl uppercase rounded-full hover:bg-lead-green hover:scale-[1.04] transition-all duration-300 font-sans cursor-pointer border-none"
        >
          Prendre rendez-vous
        </button>
        <a 
          href="#diagnostic" 
          className="px-8 py-5 bg-white text-lead-green border-2 border-lead-green/10 text-xs font-bold tracking-[0.2em] shadow-md hover:shadow-lg uppercase rounded-full hover:bg-[#ff9d00] hover:text-white hover:border-[#ff9d00] hover:scale-[1.04] transition-all duration-300 font-sans cursor-pointer"
        >
          Faire le Diagnostic interactif
        </a>
      </motion.div>

      {/* Responsive cards with warm illustrations/photos */}
      <div className="mt-20 md:mt-28 w-full max-w-[95rem] mx-auto flex flex-wrap justify-center items-center gap-4 md:gap-5 relative z-10">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 80, rotate: parseFloat(card.rot) * 0.5 }}
            animate={{ opacity: 1, y: card.y, rotate: card.rot }}
            transition={{ delay: 0.3 + idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
             <div 
               className={`w-[70vw] h-[90vw] sm:w-[38vw] sm:h-[50vw] md:w-[13.5rem] md:h-[18rem] lg:w-[17.5rem] lg:h-[23.5rem] rounded-3xl p-3.5 bg-white shadow-xl flex flex-col hover:-translate-y-6 hover:scale-105 transition-all duration-500 cursor-pointer ${card.color}`}
             >
                <div className="w-full flex-grow rounded-2xl overflow-hidden mb-3.5 relative bg-mint">
                  <img 
                    src={card.img} 
                    alt={card.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/95 text-lead-green px-2.5 py-1 rounded-full font-bold text-[10px] shadow-sm flex items-center gap-1 font-friendly">
                    {card.badge}
                  </div>
                </div>
                <div className="text-center font-friendly font-bold text-base lg:text-lg text-lead-green tracking-tight pb-0.5 flex justify-center items-center gap-1">
                  {card.title}
                  {idx % 2 === 0 ? <Heart size={13} className="text-coral fill-current" /> : <Star size={13} className="text-highlight fill-current" />}
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
