import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, ArrowUpRight, Sparkles } from 'lucide-react';

export function Features() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive tracker to adjust the 3D cube's dimensions perfectly
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    { 
      num: "01", 
      title: "Accompagnement psycho-éducatif", 
      desc: "Suivi individuel et familial spécialement conçu pour les enfants, adolescents et parents d'après la Psychologie du Développement. Nous analysons les dynamiques relationnelles, identifions les freins de communication et apportons un soutien ciblé.",
      color: "hover:bg-mint/80", 
      accent: "text-lead-green",
      badge: "🌱 Accompagnement",
      img: "/images/01. Accompagnement psycho-éducatif.jpeg"
    },
    { 
      num: "02", 
      title: "Campagnes & Sensibilisation", 
      desc: "Interventions d’utilité publique au sein des écoles, collèges, églises locales et organisations communautaires pour sensibiliser à la santé mentale infantile et l'impact de la foi.",
      color: "hover:bg-yellow-bg/85", 
      accent: "text-[#ff9d00]",
      badge: "📢 Sensibilisation",
      img: "/images/02. Campagnes & Sensibilisation.jpeg"
    },
    { 
      num: "03", 
      title: "Ateliers & Formations", 
      desc: "Modules hautement pratiques destinés aux parents, moniteurs d’églises et éducateurs : autorité saine, écoute active, décryptage des émotions, détection précoce du mal-être.",
      color: "hover:bg-[#fbebeb]/90", 
      accent: "text-coral",
      badge: "🎓 Apprentissage",
      img: "/images/03. Ateliers & Formations.jpeg"
    },
    { 
      num: "04", 
      title: "Ressources & Réflexions", 
      desc: "Mise à disposition continue de documents psycho-éducatifs téléchargeables, études de thématiques de cas de développement vulgarisés, podcasts et articles approfondis pour s’informer chez soi.",
      color: "hover:bg-[#e3f2fd]/85", 
      accent: "text-blue-500",
      badge: "📖 Outils Pratiques",
      img: "/images/04. Ressources & Réflexions.jpeg"
    },
    { 
      num: "05", 
      title: "Espaces d’écoute active", 
      desc: "Cellules d'écoute hautement confidentielles, accueillantes et exemptes de tout jugement moral ou religieux, ouvertes à toute personne cherchant un soutien ponctuel ou d'orientation.",
      color: "hover:bg-emerald-50/60",
      accent: "text-emerald-700",
      badge: "🤫 Écoute Sûre",
      img: "/images/05. Espaces d’écoute active.jpeg"
    }
  ];

  return (
    <section id="services" className="relative py-24 md:py-36 px-6 lg:px-12 max-w-[90rem] mx-auto border-t border-lead-green/10 bg-bg">
       <div className="text-center mb-20 flex flex-col items-center">
          <span className="uppercase text-[11px] font-bold tracking-[0.2em] text-[#ff9d00] mb-4 font-friendly">✨ Nos Axes d'Expertise</span>
          <h2 className="text-4xl md:text-6xl font-friendly font-bold tracking-tight max-w-[55rem] leading-[1.05] text-lead-green">
             Des services conçus pour guérir et guider le foyer
          </h2>
          <p className="mt-4 text-sm md:text-base text-lead-green/70 max-w-xl font-medium font-friendly">
             Une alliance de la Psychologie du Développement et de la foi pour accompagner l'épanouissement harmonieux de vos joyaux précieux.
          </p>
       </div>

       {/* Interactive 3D Cubes List representing each Service */}
       <div 
         className="flex flex-col gap-6 relative"
         onMouseLeave={() => setHoveredIdx(null)}
       >
          {services.map((svc, index) => {
            const isHovered = hoveredIdx === index;
            const cardHeight = isMobile ? 200 : 135;
            const halfH = cardHeight / 2;
            
            // Custom-tailored themed background for each top-face of the cube
            const activeBgClass = index === 0 
              ? 'bg-[#e8f1ec] border-[#1f4a38]/15 shadow-md' 
              : index === 1 
                ? 'bg-[#fdf6e2] border-[#ff9d00]/15 shadow-md' 
                : index === 2 
                  ? 'bg-[#fbebeb] border-[#e05a47]/15 shadow-md' 
                  : index === 3 
                    ? 'bg-[#e3f2fd] border-blue-500/15 shadow-md' 
                    : 'bg-[#e8f5e9] border-emerald-700/15 shadow-md';

            // Targeted aesthetic text headings on cube roll
            const hoverTextColor = index === 0 
              ? 'text-[#1f4a38]' 
              : index === 1 
                ? 'text-[#a16207]' 
                : index === 2 
                  ? 'text-[#e05a47]' 
                  : index === 3 
                    ? 'text-[#1e3a8a]' 
                    : 'text-emerald-800';

            return (
              <div
                key={svc.num}
                className="w-full relative transition-[margin] duration-500"
                style={{ 
                  perspective: '2000px',
                  height: `${cardHeight}px`,
                  zIndex: isHovered ? 30 : 10
                }}
                onMouseEnter={() => setHoveredIdx(index)}
              >
                <motion.div
                  className="w-full h-full relative"
                  style={{ 
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{ 
                    rotateX: isHovered ? -90 : 0,
                    z: isHovered ? 15 : 0
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 140, 
                    damping: 22, 
                    mass: 0.85
                  }}
                >
                  {/* FRONT FACE (Rest State) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-[2rem] border border-lead-green/10 flex items-center px-6 md:px-10 bg-[#faf8f2] shadow-sm transition-colors duration-300 ${svc.color}`}
                    style={{
                      transform: `rotateX(0deg) translateZ(${halfH}px)`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 items-center justify-between w-full">
                      {/* Left: Metadata, Title */}
                      <div className="flex items-center gap-6 lg:w-[45%]">
                        <span className="text-lead-green/30 text-xl md:text-2xl font-friendly font-bold tracking-widest shrink-0">{svc.num}</span>
                        <div className="flex flex-col gap-1 text-left">
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${svc.accent} font-friendly`}>
                            {svc.badge}
                          </span>
                          <h3 className="text-lg md:text-xl lg:text-2xl font-friendly font-bold tracking-tight text-lead-green leading-snug">
                            {svc.title}
                          </h3>
                        </div>
                      </div>

                      {/* Center: Description */}
                      <div className="lg:w-[42%] text-left">
                        <p className="text-xs md:text-sm text-lead-green/75 font-medium font-friendly leading-relaxed line-clamp-2 lg:line-clamp-3">
                          {svc.desc}
                        </p>
                      </div>

                      {/* Right indicator */}
                      <div className="lg:w-[13%] hidden lg:flex lg:justify-end items-center shrink-0">
                        <div className="w-9 h-9 rounded-full border border-lead-green/10 flex items-center justify-center bg-white text-lead-green shadow-xs">
                          <Plus size={14} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TOP FACE (Hover state rotating down into view) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-[2rem] border flex items-center justify-between px-6 md:px-10 overflow-hidden shadow-lg ${activeBgClass}`}
                    style={{
                      transform: `rotateX(90deg) translateZ(${halfH}px)`,
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="flex items-center justify-between w-full h-full gap-4">
                      {/* Left: detailed thematic copy */}
                      <div className="flex items-center gap-4 md:gap-8 text-left">
                        <span className={`text-3xl md:text-4.5xl font-friendly font-extrabold tracking-wider ${hoverTextColor} opacity-15 hidden sm:inline`}>{svc.num}</span>
                        <div className="flex flex-col gap-1 md:gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e05a47] animate-pulse" />
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${svc.accent} font-friendly`}>
                              {svc.badge}
                            </span>
                          </div>
                          <h4 className={`text-base md:text-lg lg:text-xl font-friendly font-bold ${hoverTextColor} leading-tight`}>
                            {svc.title}
                          </h4>
                          <span className="text-[10px] md:text-[11px] font-semibold font-friendly text-lead-green/60 uppercase tracking-wider flex items-center gap-1">
                            <Sparkles size={10} className="text-[#ff9d00]" /> Science du développement & engagement biblique
                          </span>
                        </div>
                      </div>

                      {/* Right: perfectly sized elegant service image + action indicator */}
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="relative">
                          <img 
                            src={svc.img} 
                            alt={svc.title} 
                            className="h-16 w-24 sm:h-20 sm:w-30 md:h-24 md:w-36 lg:h-24 lg:w-40 object-cover rounded-2xl border-2 border-white shadow-md select-none pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        
                        <div className="w-9 h-9 rounded-full bg-lead-green text-white flex items-center justify-center shadow-md border border-white/20 hidden sm:flex shrink-0">
                          <ArrowUpRight size={14} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
       </div>
    </section>
  );
}
