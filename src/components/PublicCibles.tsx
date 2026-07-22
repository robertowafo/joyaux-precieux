import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface TargetItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: string;
  details: string[];
  color: string;
  textColor: string;
  badgeBg: string;
  avatarGlow: string;
  accentColor: string;
  illustrations: string;
}

export function PublicCibles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);

  const [activeCard, setActiveCard] = useState<number>(0);
  const [stations, setStations] = useState<{ x: number; y: number }[]>([]);
  const [pathD, setPathD] = useState<string>('');

  const targets: TargetItem[] = [
    {
      id: "families",
      title: "L'Adulte, Couples & Familles",
      subtitle: "Adulte : 18 ans et plus • Parents, Couples & Foyers",
      desc: "Nous accompagnons individuellement les adultes, les couples mariés ou en crise, et les parents monoparentaux désireux de redéfinir une autorité bienveillante, de restaurer l'harmonie des liens familiaux et d'asseoir leur foyer sur le standard Divin de grâce.",
      icon: "💝",
      details: [
        "Guidance face aux ruptures, crises et fractures du dialogue intergénérationnel.",
        "Renforcement des compétences de coparentalité des pères et mères.",
        "Médiation positive pour guider les adultes vers des foyers sereins."
      ],
      color: "bg-[#fbebeb]",
      textColor: "text-[#e05a47]",
      badgeBg: "bg-[#e05a47]/10 text-[#e05a47]",
      avatarGlow: "shadow-[0_0_40px_rgba(224,90,71,0.24)]",
      accentColor: "#e05a47",
      illustrations: "/images/target_4_spiritual_prayer.jpg"
    },
    {
      id: "children-teens",
      title: "L'Enfance",
      subtitle: "Enfance : 2 à 10 ans",
      desc: "Soutien psycho-éducatif ciblé pour les enfants confrontés aux colères, angoisses infantiles, retards légers ou troubles du sommeil. Nous aidons à pacifier les interactions quotidiennes.",
      icon: "👶",
      details: [
        "Gestion saine des décharges émotionnelles et opposition de 2 à 10 ans.",
        "Mise en place de rituels sécurisants et routines d'autodiscipline bienveillantes.",
        "Orientation clinique pour parents face aux caprices et blocages relationnels."
      ],
      color: "bg-[#e8f1ec]",
      textColor: "text-[#1f4a38]",
      badgeBg: "bg-[#1f4a38]/10 text-[#1f4a38]",
      avatarGlow: "shadow-[0_0_40px_rgba(31,74,56,0.18)]",
      accentColor: "#1f4a38",
      illustrations: "/images/target_1_gentle_parenting.jpg"
    },
    {
      id: "adolescence",
      title: "L'Adolescence",
      subtitle: "Adolescence : 10-12 ans à 18 ans",
      desc: "Sas sécurisés d'écoute active pour les adolescents et préadolescents en situation de repli sur soi, d'addiction aux écrans, ou en questionnement d'identité profonde.",
      icon: "🧑",
      details: [
        "Soutien psychologique face aux fragilités psycho-affectives pubertaires.",
        "Aide à l'intégration des valeurs spirituelles et de foi face au doute adolescent.",
        "Médiation de crise pour restaurer un dialogue parent-ado autrefois rompu."
      ],
      color: "bg-[#e3f2fd]",
      textColor: "text-[#1e3a8a]",
      badgeBg: "bg-blue-600/10 text-[#1e3a8a]",
      avatarGlow: "shadow-[0_0_40px_rgba(30,58,138,0.18)]",
      accentColor: "#2563eb",
      illustrations: "/images/target_3_teenager_sunrise.jpg"
    },
    {
      id: "future-parents",
      title: "Conception à la Naissance",
      subtitle: "De la conception à la naissance • Futurs parents",
      desc: "Accompagnement prénatal personnalisé et conseils éclairés pour préparer l'arrivée de bébé. Poser les repères affectifs et spirituels de la communication in utero.",
      icon: "🤰",
      details: [
        "Éveil de la communication prénatale avec bébé durant la grossesse.",
        "Soutien psychologique des futurs parents pour anticiper les transitions du couple.",
        "Aide à l'équilibre et préparation spirituelle active pour l'accouchement."
      ],
      color: "bg-[#fdf6e2]",
      textColor: "text-[#a16207]",
      badgeBg: "bg-[#ff9d00]/10 text-[#a16207]",
      avatarGlow: "shadow-[0_0_40px_rgba(255,157,0,0.22)]",
      accentColor: "#ff9d00",
      illustrations: "/images/target_2_newborn_feet.jpg"
    }
  ];

  // Helper function to plot and draw the smooth connecting spline between target stations
  const recalculatePath = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const stationEls = containerRef.current.querySelectorAll('.flower-station');
    
    const pts: { x: number; y: number }[] = [];
    stationEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      pts.push({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2
      });
    });

    if (pts.length < 2) return;

    // Create a beautiful sinuous spline connection using Cubic Beziers
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const dy = p1.y - p0.y;
      
      // Control points pull horizontally and push down to form gorgeous loops
      const cp1x = p0.x;
      const cp1y = p0.y + dy * 0.45;
      const cp2x = p1.x;
      const cp2y = p1.y - dy * 0.45;
      
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }

    setStations(pts);
    setPathD(d);

    // Refresh ScrollTrigger to account for updated/settled mobile page heights
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  // Recalculate on mounts & sizing adjustments
  useEffect(() => {
    recalculatePath();
    window.addEventListener('resize', recalculatePath);
    
    // Tiny delay to tolerate dynamic images / layout settling
    const timer = setTimeout(recalculatePath, 600);

    return () => {
      window.removeEventListener('resize', recalculatePath);
      clearTimeout(timer);
    };
  }, []);

  // Set up GSAP timeline when coords are solved
  useEffect(() => {
    if (!pathD || !pathRef.current || !flowerRef.current || !containerRef.current) return;

    // Discard any previous triggers connected specifically to this section to avoid build-up
    const targetsTriggers = ScrollTrigger.getAll().filter(t => {
      return t.trigger === containerRef.current || 
             (t.trigger && (
               (t.trigger as HTMLElement).classList?.contains('narrative-row') ||
               (t.trigger as HTMLElement).classList?.contains('flower-station')
             ));
    });
    targetsTriggers.forEach(t => t.kill());

    const stationsList = containerRef.current.querySelectorAll('.flower-station');
    if (stationsList.length < 2) return;

    const firstStation = stationsList[0];
    const lastStation = stationsList[stationsList.length - 1];

    // Pre-align the flower exactly at Station 1 center positions
    const isMobile = window.innerWidth < 768;
    const baseScale = isMobile ? 0.75 : 1.5;

    if (stations.length > 0) {
      gsap.set(flowerRef.current, {
        x: stations[0].x,
        y: stations[0].y,
        xPercent: -50,
        yPercent: -50,
        scale: baseScale,
        rotation: 0
      });
    }

    // 1. Precise stepwise gliding along the exact visual path string (Ease: none creates perfect consistency)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: firstStation,
        endTrigger: lastStation,
        start: 'center center',
        end: 'center center',
        scrub: 0.1, // Highly responsive tracking companion
        onUpdate: (self) => {
          const p = self.progress;
          let activeIdx = 0;
          if (p < 0.166) activeIdx = 0;
          else if (p < 0.50) activeIdx = 1;
          else if (p < 0.833) activeIdx = 2;
          else activeIdx = 3;

          setActiveCard((current) => {
            if (current !== activeIdx) {
              // Pulse the flower nicely on waypoint transition
              if (flowerRef.current) {
                const isMob = window.innerWidth < 768;
                const bScale = isMob ? 0.75 : 1.5;
                const pScale = isMob ? 0.95 : 1.8;
                gsap.timeline()
                  .to(flowerRef.current, { scale: pScale, duration: 0.2, ease: 'back.out(2)' })
                  .to(flowerRef.current, { scale: bScale, duration: 0.3, ease: 'bounce.out' });
              }
              return activeIdx;
            }
            return current;
          });
        }
      }
    });

    tl.to(flowerRef.current, {
      motionPath: {
        path: pathD, // Use the literal SVG coordinate path to prevent any divergence
      },
      rotation: 1440, // Beautiful continuous rolling wheel behavior as we navigate down
      ease: 'none'
    });

    return () => {
      const activeTriggers = ScrollTrigger.getAll().filter(t => {
        return t.trigger === containerRef.current || 
               (t.trigger && (
                 (t.trigger as HTMLElement).classList?.contains('narrative-row') ||
                 (t.trigger as HTMLElement).classList?.contains('flower-station')
               ));
      });
      activeTriggers.forEach(t => t.kill());
    };
  }, [pathD, stations]);

  return (
    <section 
      id="targets" 
      ref={containerRef}
      className="py-24 md:py-36 px-4 sm:px-6 lg:px-12 max-w-[85rem] mx-auto bg-[#faf8f2] border-t border-lead-green/10 relative overflow-hidden"
    >
      {/* Decorative environment items */}
      <div className="absolute top-[5%] left-[2%] pointer-events-none text-2xl opacity-30 select-none animate-pulse">✨</div>
      <div className="absolute bottom-[8%] right-[2%] pointer-events-none text-2xl opacity-30 select-none">🪵</div>

      {/* Intro Header */}
      <div className="flex flex-col items-center text-center mb-20 md:mb-28">
        <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-4 flex items-center gap-1.5 font-friendly">
          <Users size={12} className="fill-current text-coral animate-pulse" />
          Accompagnement Narratif
        </span>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-friendly font-bold tracking-tight text-lead-green leading-[1.12]">
          À qui s'adresse notre{" " }
          <span className="text-[#ff9d00] underline decoration-wavy decoration-coral block sm:inline-block">
            accompagnement
          </span>{" "}?
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg text-lead-green/70 font-medium font-friendly max-w-2xl mt-4">
          Un cheminement dynamique à travers le foyer. La fleur Joyaux Précieux se déplace au fil de votre lecture pour vous accompagner étape par étape.
        </p>
      </div>

      {/* Dynamic Sinuous Connecting Tracks on Background */}
      {pathD && (
        <svg 
          className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          {/* Neon track glow layer */}
          <path 
            ref={pathRef}
            d={pathD}
            fill="none" 
            stroke="url(#connectingTrackGradient)"
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeDasharray="8 6" 
          />
          <path 
            d={pathD}
            fill="none" 
            stroke="#1f4a38"
            strokeWidth="1" 
            opacity="0.1" 
          />
          <defs>
            <linearGradient id="connectingTrackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1f4a38" stopOpacity="0.4" />
              <stop offset="33%" stopColor="#ff9d00" stopOpacity="0.4" />
              <stop offset="66%" stopColor="#e05a47" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* INTERACTIVE COMPANION FLOWER GLIDER */}
      <div 
        ref={flowerRef}
        className="absolute w-28 h-28 md:w-64 md:h-64 origin-center pointer-events-auto cursor-pointer drop-shadow-[0_12px_24px_rgba(224,90,71,0.22)] md:drop-shadow-[0_20px_45px_rgba(224,90,71,0.32)] flex items-center justify-center z-20"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
        onClick={() => {
          const isMob = window.innerWidth < 768;
          const bScale = isMob ? 0.75 : 1.5;
          const pScale = isMob ? 0.95 : 1.9;
          gsap.timeline()
            .to(flowerRef.current, { rotate: '+=360', scale: pScale, duration: 0.7, ease: 'back.out(2)' })
            .to(flowerRef.current, { scale: bScale, duration: 0.45, ease: 'bounce.out' });
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full select-none">
          {/* Bigger, thicker, premium stylized petals for outstanding visibility */}
          <ellipse cx="50" cy="22" rx="18" ry="24" fill={targets[activeCard].accentColor} />
          <ellipse cx="78" cy="50" rx="24" ry="18" fill="#ff9d00" />
          <ellipse cx="50" cy="78" rx="18" ry="24" fill="#e8f1ec" />
          <ellipse cx="22" cy="50" rx="24" ry="18" fill="#e05a47" />
          
          <circle cx="50" cy="50" r="18" fill="#ffffff" stroke={targets[activeCard].accentColor} strokeWidth="3.5" />
          <circle cx="50" cy="50" r="10" fill="#faf8f2" opacity="0.9" />
          
          <text 
            x="50" 
            y="55" 
            textAnchor="middle" 
            fontSize="16" 
            fontWeight="bold" 
            fill={targets[activeCard].accentColor}
            className="animate-pulse"
          >
            💎
          </text>
        </svg>
      </div>

      {/* Alternating Story/Card blocks */}
      <div className="flex flex-col gap-24 md:gap-36 relative z-10">
        {targets.map((tgt, index) => {
          const isEven = index % 2 === 0;
          const isActive = activeCard === index;

          return (
            <div 
              key={tgt.id}
              className={`narrative-row flex flex-col items-center gap-10 md:gap-16 w-full ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Card (55% width) */}
              <div 
                className={`narrative-card-box p-8 md:p-12 rounded-[2.5rem] border transition-all duration-700 flex flex-col gap-6 md:gap-8 w-full md:w-[55%] ${
                  isActive 
                    ? `${tgt.color} border-lead-green/15 scale-[1.035] shadow-lg` 
                    : 'bg-white border-lead-green/5 opacity-50 contrast-75'
                }`}
                style={{
                  boxShadow: isActive ? '0 24px 50px -12px rgba(31, 74, 56, 0.08)' : 'none'
                }}
              >
                {/* Active Indicator Top Crown */}
                {isActive && (
                  <div className="absolute -top-4 -left-4 w-9 h-9 bg-[#ff9d00] text-white rounded-full flex items-center justify-center text-sm shadow-md animate-bounce">
                    🌟
                  </div>
                )}

                {/* Card Header Info */}
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-xs">
                      {tgt.icon}
                    </span>
                    <div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase font-friendly ${tgt.badgeBg}`}>
                        {tgt.subtitle}
                      </span>
                      <h3 className={`text-2xl md:text-3xl font-friendly font-bold mt-0.5 ${tgt.textColor}`}>
                        {tgt.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-lead-green/40 uppercase tracking-widest">
                    CIBLE 0{index + 1}
                  </div>
                </div>

                {/* Main Desc text */}
                <p className="text-sm md:text-base font-friendly font-medium text-lead-green/90 leading-relaxed">
                  {tgt.desc}
                </p>

                {/* Bullet details check */}
                <div className="flex flex-col gap-4 border-t border-lead-green/5 pt-6">
                  <span className="text-xs uppercase font-bold tracking-wider text-lead-green/40 font-friendly">
                    Axes prioritaires d'intervention :
                  </span>
                  <ul className="space-y-2.5">
                    {tgt.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs md:text-sm font-friendly font-bold text-lead-green/85">
                        <span className="text-[#ff9d00] text-base shrink-0 mt-0.5">✦</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Zoomable Image frame */}
                <div className="w-full h-44 md:h-56 rounded-3xl overflow-hidden relative shadow-inner group bg-white/40 cursor-pointer">
                  <img 
                    src={tgt.illustrations} 
                    alt={tgt.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lead-green/15 into-transparent"></div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[9px] font-bold text-lead-green uppercase shadow-xs">
                    Savoir-faire clinique 🤍
                  </div>
                </div>
              </div>

              {/* Station landing box (45% width) - Target for custom curves on Desktop */}
              <div className="w-full md:w-[45%] flex justify-center items-center py-6">
                <div 
                  className={`flower-station w-24 h-24 md:w-36 md:h-36 rounded-full border-2 border-dashed flex flex-col justify-center items-center relative transition-all duration-700 ${
                    isActive 
                      ? 'border-coral/60 bg-white/50 scale-110 drop-shadow-[0_12px_24px_rgba(224,90,71,0.1)]' 
                      : 'border-lead-green/10 bg-transparent scale-95'
                  }`}
                >
                  {/* Subtle inner rotating guides */}
                  <div className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full border border-dotted transform transition-transform duration-[6s] linear repeat-infinite ${
                    isActive ? 'border-[#ff9d00]/50 animate-spin' : 'border-lead-green/10'
                  }`} />
                  
                  {/* Outer active floating dots */}
                  {isActive && (
                    <span className="absolute -top-2 animate-bounce text-sm">🎈</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
