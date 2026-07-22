import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, BookOpen, Clock, Users, Calendar, ArrowRight, Bell, Video, Film, FileDown, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import { publicApi } from '../lib/publicApi';

interface MethodologyProps {
  onNavigate?: (page: 'accueil' | 'articles' | 'accompagnements' | 'ressources' | 'plan') => void;
}

interface FeaturedResource {
  icon: React.ReactNode;
  type: string;
  title: string;
  duration: string;
  desc: string;
  actionText: string;
}

const STATIC_FEATURED: FeaturedResource[] = [
  {
    icon: <Video size={20} className="text-[#ff9d00]" />,
    type: "🎥 Capsule Vidéo",
    title: "Désamorcer une crise de colère en public",
    duration: "4 min • Petite Enfance",
    desc: "Des repères psycho-éducatifs immédiats pour calmer le débordement émotionnel sans utiliser la violence ou les cris devant les regards extérieurs.",
    actionText: "Voir la capsule"
  },
  {
    icon: <Film size={20} className="text-coral" />,
    type: "🎬 Vidéos & Conférences",
    title: "Gestion saine de l'autorité parentale",
    duration: "12:45 • Parentalité",
    desc: "Une mini-conférence psycho-éducative sur les neurosciences cognitives appliquées et la mise en place d'un protocole d'autorité positive au foyer.",
    actionText: "Regarder la vidéo"
  },
  {
    icon: <FileDown size={20} className="text-lead-green" />,
    type: "📥 Fiche Pratique (PDF)",
    title: "La Boussole des Émotions",
    duration: "2 min • PDF Gratuit",
    desc: "Une fiche psycho-éducative basée sur les Psaumes pour aider l'enfant à nommer sa colère, sa tristesse et sa joie devant Dieu.",
    actionText: "Télécharger le PDF"
  },
  {
    icon: <BookOpen size={20} className="text-[#a16207]" />,
    type: "📖 Livre Recommandé",
    title: "Parler pour que les enfants écoutent, écouter pour qu'ils parlent",
    duration: "Adèle Faber & Elaine Mazlish",
    desc: "Une oeuvre phare offrant des outils visuels et extrêmement pratiques pour surmonter l'opposition infantile sans heurts ni humiliations répétées.",
    actionText: "Découvrir l'ouvrage"
  }
];

export function Methodology({ onNavigate }: MethodologyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [featured, setFeatured] = useState<FeaturedResource[]>(STATIC_FEATURED);

  useEffect(() => {
    Promise.all([
      publicApi.videoCapsules(),
      publicApi.videos(),
      publicApi.resources(),
      publicApi.books(),
    ]).then(([capsules, videos, resources, books]) => {
      const next = [...STATIC_FEATURED];
      const cap = capsules[0] as Record<string, unknown> | undefined;
      if (cap) {
        const category = String(cap.badge ?? '').replace(/^\S+\s/, '').split('•')[0].trim();
        next[0] = { ...next[0], title: String(cap.title), duration: `${cap.duration} • ${category}`, desc: String(cap.desc) };
      }
      const vid = videos[0] as Record<string, unknown> | undefined;
      if (vid) next[1] = { ...next[1], title: String(vid.title), duration: `${vid.duration} • ${vid.category}`, desc: String(vid.desc) };
      const res = resources[0] as Record<string, unknown> | undefined;
      if (res) next[2] = { ...next[2], title: String(res.title), duration: String(res.badge ?? 'PDF Gratuit'), desc: String(res.desc) };
      const book = books[0] as Record<string, unknown> | undefined;
      if (book) next[3] = { ...next[3], title: String(book.title), duration: `Par ${book.author}`, desc: String(book.desc) };
      setFeatured(next);
    });
  }, []);

  const handleAnnouncementClick = (targetId: string) => {
    if (onNavigate) {
      if (targetId === 'plan') {
        onNavigate('plan');
        return;
      }
      if (targetId === 'ressources') {
        onNavigate('ressources');
        return;
      }
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all character roll wrappers
    const charWrappers = containerRef.current.querySelectorAll('.gsap-roll-char-wrapper');

    charWrappers.forEach((wrapper) => {
      const source = wrapper.querySelector('.gsap-roll-char-source');
      const target = wrapper.querySelector('.gsap-roll-char-target');

      if (!source || !target) return;

      // Set initial states for 3D cylinders
      gsap.set(target, { yPercent: 100, rotateX: 90, opacity: 0 });
      gsap.set(source, { yPercent: 0, rotateX: 0, opacity: 1 });

      const onEnter = () => {
        // Source rolls up and out of view
        gsap.to(source, {
          yPercent: -100,
          rotateX: -90,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          overwrite: 'auto'
        });
        // Target rolls up from bottom into central focus
        gsap.to(target, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      };

      const onLeave = () => {
        // Return original source letter to center
        gsap.to(source, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'elastic.out(1.1, 0.45)',
          overwrite: 'auto'
        });
        // Return target letter to bottom orientation
        gsap.to(target, {
          yPercent: 100,
          rotateX: 90,
          opacity: 0,
          duration: 0.75,
          ease: 'elastic.out(1.1, 0.45)',
          overwrite: 'auto'
        });
      };

      wrapper.addEventListener('mouseenter', onEnter);
      wrapper.addEventListener('mouseleave', onLeave);

      // Save references on element for cleanup
      (wrapper as any)._onEnter = onEnter;
      (wrapper as any)._onLeave = onLeave;
    });

    // Staggered sequence slide-in rolling entrance for all letters
    const allSources = containerRef.current.querySelectorAll('.gsap-roll-char-source');
    gsap.fromTo(allSources, 
      { yPercent: 120, rotateX: 85, opacity: 0 },
      { 
        yPercent: 0, 
        rotateX: 0, 
        opacity: 1, 
        duration: 1.25, 
        stagger: 0.02, 
        ease: 'elastic.out(1.15, 0.5)' 
      }
    );

    return () => {
      charWrappers.forEach((wrapper) => {
        const w = wrapper as any;
        if (w._onEnter) wrapper.removeEventListener('mouseenter', w._onEnter);
        if (w._onLeave) wrapper.removeEventListener('mouseleave', w._onLeave);
      });
    };
  }, []);

  const renderRollingWord = (text: string, isHighlighted: boolean = false) => {
    // Split into words so we can keep each word as a non-breaking inline-block group!
    const words = text.split(/(\s+)/);
    return words.map((word, wordIdx) => {
      if (/^\s+$/.test(word)) {
        return (
          <span key={`space-${wordIdx}`} className="inline-block" style={{ width: `${0.28 * word.length}em` }}>
            &nbsp;
          </span>
        );
      }
      return (
        <span key={`word-${wordIdx}`} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIdx) => {
            return (
              <span
                key={charIdx}
                className="gsap-roll-char-wrapper inline-block overflow-hidden relative cursor-pointer select-none"
                style={{
                  height: '1.24em',
                  perspective: '120px',
                  transformStyle: 'preserve-3d',
                  verticalAlign: 'bottom',
                  marginRight: '-0.02em'
                }}
              >
                <span 
                  className={`gsap-roll-char-source block origin-center-bottom ${
                    isHighlighted ? 'text-coral' : 'text-lead-green'
                  }`}
                >
                  {char}
                </span>
                <span 
                  className={`gsap-roll-char-target block absolute inset-0 origin-center-top ${
                    isHighlighted ? 'text-[#ff9d00]' : 'text-coral font-bold'
                  }`}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <>
      <section id="about" ref={containerRef} className="py-24 md:py-36 px-6 lg:px-12 max-w-[90rem] mx-auto flex flex-col xl:flex-row gap-16 md:gap-24 items-center border-t border-lead-green/10 bg-bg">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.1
            }
          }
        }}
        className="xl:w-1/2 flex flex-col items-start text-left"
      >
        <motion.span 
          variants={{
            hidden: { opacity: 0, x: -15 },
            visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80 } }
          }}
          className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-4 flex items-center gap-1.5 font-friendly"
        >
          <Heart size={12} className="fill-current text-coral animate-pulse" />
          Une approche clinique au service des familles
        </motion.span>
        
        <h2 className="text-4xl md:text-5xl lg:text-[3.8rem] font-friendly font-bold tracking-tight leading-[1.12] text-lead-green mb-8">
          <span className="block py-1">
            {renderRollingWord("Écouter, comprendre,")}
          </span>
          <span className="block py-1">
            <span className="underline decoration-[#ff9d00] decoration-wavy mr-2">
              {renderRollingWord("et guider", true)}
            </span>
            {renderRollingWord("avec amour.")}
          </span>
        </h2>

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-base md:text-lg text-lead-green/80 font-medium font-friendly leading-relaxed mb-8 max-w-2xl space-y-4"
        >
          <p>
            En tant qu’<strong>assistante maternelle</strong>, <strong>étudiante en Psychologie du Développement Humain</strong> et <strong>monitrice du culte d’enfant</strong>, je mets mon profil au service des parents, des futurs parents, des enfants et des familles en général.
          </p>
          <p>
            Mon approche lie intimement l’écoute clinique rigoureuse, les repères psycho-éducatifs clairs et la dimension spirituelle essentielle à l'équilibre de chaque foyer.
          </p>
        </motion.div>

        {/* Big styled block citation matching the requested quote exactly */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 15 } }
          }}
          whileHover={{ scale: 1.02 }}
          className="border-l-4 border-[#ff9d00] pl-6 py-4 my-6 bg-[#faf5e6] rounded-r-2xl pr-6 font-friendly text-lead-green italic text-base md:text-lg transition-all shadow-sm"
        >
          "Nous ne cherchons pas la perfection familiale, mais la vérité des liens selon le standard Divin."
        </motion.div>
        
        {/* Avatars segment matching flyer */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ y: -4, shadow: "lg" }}
          className="bg-white/80 border border-lead-green/5 p-5 rounded-3xl w-full flex flex-col sm:flex-row gap-5 items-center shadow-md mb-10 max-w-xl transition-all duration-300"
        >
          <div className="flex -space-x-3 shrink-0">
            <motion.img whileHover={{ scale: 1.1, zIndex: 10 }} src="/images/avatar_1_young_mother.jpg" className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer" referrerPolicy="no-referrer" />
            <motion.img whileHover={{ scale: 1.1, zIndex: 10 }} src="/images/avatar_2_father.jpg" className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer" referrerPolicy="no-referrer" />
            <motion.img whileHover={{ scale: 1.1, zIndex: 10 }} src="/images/avatar_3_grandparent.jpg" className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer" referrerPolicy="no-referrer" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-friendly font-bold text-lead-green text-sm flex items-center justify-center sm:justify-start gap-1">
              Des repères pour chaque foyer <Sparkles size={12} className="text-[#ff9d00] animate-pulse" />
            </h4>
            <p className="text-xs text-lead-green/70 font-medium">Rejoignez de nombreuses familles déjà accompagnées !</p>
          </div>
        </motion.div>

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { tracking: "spring" } }
          }}
          className="flex flex-col sm:flex-row gap-8 items-center w-full max-w-xl"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
             <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-lead-green">
                <Clock size={22} className="animate-pulse" />
             </div>
             <div>
                <h3 className="text-3xl font-friendly font-bold text-lead-green">05 ans</h3>
                <span className="uppercase text-[9px] font-bold tracking-[0.2em] text-lead-green/60">d'expérience d'écoute</span>
             </div>
          </motion.div>
          <div className="w-[1px] h-10 bg-lead-green/10 hidden sm:block"></div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
             <div className="w-12 h-12 rounded-2xl bg-yellow-bg flex items-center justify-center text-[#ff9d00]">
                <Heart size={22} className="fill-current animate-pulse" />
             </div>
             <div>
                <h3 className="text-3xl font-friendly font-bold text-lead-green">98%</h3>
                <span className="uppercase text-[9px] font-bold tracking-[0.2em] text-lead-green/60">de satisfaction parentale</span>
             </div>
          </motion.div>
          <div className="w-[1px] h-10 bg-lead-green/10 hidden sm:block"></div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
             <div className="w-12 h-12 rounded-2xl bg-[#fbebeb] flex items-center justify-center text-coral">
                <Users size={22} className="animate-pulse" />
             </div>
             <div>
                <h3 className="text-3xl font-friendly font-bold text-lead-green">25+</h3>
                <span className="uppercase text-[9px] font-bold tracking-[0.2em] text-lead-green/60">Familles accompagnées</span>
             </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Right Side: Beautifully Framed and Styled Photo of Lina NGUERELESSIO */}
      <div className="xl:w-1/2 w-full flex justify-center items-center relative py-12 px-2 sm:px-6">
        <div className="absolute inset-0 bg-radial-gradient from-[#ff9d00]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Playful layered backgrounds */}
        <div className="absolute top-12 left-12 w-2/3 h-4/5 bg-yellow-bg rounded-[3.5rem] rotate-3 pointer-events-none -z-10"></div>
        <div className="absolute bottom-10 right-8 w-2/3 h-4/5 bg-mint rounded-[3.5rem] -rotate-3 pointer-events-none -z-10"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative w-full max-w-[400px] aspect-[4/5] rounded-[3.5rem] overflow-hidden border-4 border-white shadow-[0_30px_60px_rgba(31,74,56,0.18)]"
        >
          <img 
            src="/images/lina 1.jpeg" 
            alt="Lina NGUERELESSIO - Psychopédagogue & Guidance Parentale"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Glassmorphism Badge */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-white/50 p-4 rounded-[2rem] shadow-lg text-left">
            <span className="uppercase text-[9px] font-bold tracking-[0.2em] text-coral block mb-1">Votre Accompagnatrice</span>
            <h4 className="font-friendly font-extrabold text-lead-green text-base sm:text-lg mb-0.5">Lina NGUERELESSIO</h4>
            <p className="text-xs text-lead-green/85 font-medium">Étudiante en Psychologie & Spécialiste de la Guidance Parentale</p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Section Annonces */}
    <section id="announcements" className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto border-t border-lead-green/10 bg-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-coral/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-3 block font-friendly">
          ✦ Bulletin des Familles
        </span>
        <h2 className="text-3xl md:text-5xl font-friendly font-bold text-lead-green tracking-tight">
          Annonces & Événements
        </h2>
        <p className="text-xs sm:text-sm text-lead-green/75 font-friendly font-semibold mt-4 leading-relaxed">
          Suivez l'actualité de nos ateliers interactifs, de nos conférences à venir, et des opportunités d'accompagnement pour votre foyer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto font-friendly">
        {[
          {
            id: 1,
            badge: "🎥 Atelier Live Zoom",
            badgeColor: "bg-coral/10 text-coral border border-coral/15",
            title: "Discipline positive : Gérer l'opposition",
            date: "Samedi 18 Juillet 2026 à 10h00",
            desc: "Un atelier interactif pour acquérir des clés psycho-éducatives rigoureuses et des méthodes concrètes afin de désamorcer l'opposition tout en préservant le lien d'amour.",
            linkText: "Réserver ma place",
            targetId: "plan"
          },
          {
            id: 2,
            badge: "🎙️ Webinaire Spécial",
            badgeColor: "bg-[#ff9d00]/10 text-[#a16207] border border-[#ff9d00]/15",
            title: "Les écrans de 0 à 6 ans : Enjeux & alternatives",
            date: "Vendredi 24 Juillet 2026 à 18h30",
            desc: "Comment préserver l'attention et stimuler l'acquisition du langage chez les tout-petits face au défi numérique d'aujourd'hui.",
            linkText: "S'inscrire au webinaire",
            targetId: "plan"
          },
          {
            id: 3,
            badge: "🤝 Consultations",
            badgeColor: "bg-[#1f4a38]/10 text-[#1f4a38] border border-[#1f4a38]/15",
            title: "Ouverture des places de Guidance Parentale",
            date: "Réservations ouvertes",
            desc: "Bénéficiez d'un accompagnement individuel clinique et spirituel sur-mesure pour restaurer l'harmonie familiale selon le Standard Divin.",
            linkText: "Prendre rendez-vous",
            targetId: "plan"
          }
        ].map((announcement) => (
          <motion.div
            key={announcement.id}
            whileHover={{ y: -6, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: announcement.id * 0.1 }}
            className="group bg-white/80 backdrop-blur-md hover:bg-white border border-lead-green/10 hover:border-[#ff9d00]/40 p-6 sm:p-8 rounded-[2.5rem] transition-all duration-300 relative flex flex-col justify-between shadow-xs hover:shadow-lg cursor-pointer text-left animate-fade-in"
            onClick={() => handleAnnouncementClick(announcement.targetId)}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-5">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${announcement.badgeColor}`}>
                  {announcement.badge}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-lead-green/55">
                  <Calendar size={12} />
                  {announcement.date}
                </div>
              </div>

              <h4 className="font-friendly font-bold text-lead-green text-base sm:text-lg group-hover:text-[#ff9d00] transition-colors mb-3 leading-snug">
                {announcement.title}
              </h4>

              <p className="text-xs sm:text-sm text-lead-green/70 leading-relaxed">
                {announcement.desc}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-coral group-hover:text-[#ff9d00] transition-colors mt-6 pt-4 border-t border-lead-green/5">
              <span>{announcement.linkText}</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Section dédiée uniquement aux Ressources */}
    <section id="home-resources" className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto border-t border-lead-green/10 bg-[#faf8f2] relative overflow-hidden">
      <div className="absolute top-[20%] right-0 w-80 h-80 bg-mint/25 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-lead-green mb-3 block font-friendly">
          📚 La Boîte à Outils de l'Éveil
        </span>
        <h2 className="text-3xl md:text-5xl font-friendly font-bold text-lead-green tracking-tight">
          Ressources & Guides Utiles
        </h2>
        <p className="text-xs sm:text-sm text-lead-green/75 font-friendly font-semibold mt-4 leading-relaxed">
          Accédez gratuitement à nos fiches pratiques de poche, à nos capsules vidéo d'écoute active et à nos guides d'épanouissement pour soutenir concrètement votre quotidien.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto font-friendly mb-16">
        {featured.map((resource, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white border border-lead-green/10 hover:border-lead-green/30 p-7 rounded-[2.5rem] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer text-left"
            onClick={() => onNavigate?.('ressources')}
          >
            <div>
              <div className="flex items-center gap-3 mb-6 bg-mint/30 w-fit px-4 py-2 rounded-full border border-lead-green/5">
                {resource.icon}
                <span className="text-[10px] font-extrabold text-lead-green uppercase tracking-wider">{resource.type}</span>
              </div>

              <h4 className="font-friendly font-bold text-lead-green text-base mb-2 leading-snug group-hover:text-coral transition-colors line-clamp-2 min-h-[2.6em]">
                {resource.title}
              </h4>

              <span className="text-[10px] font-bold text-[#ff9d00] block mb-4">{resource.duration}</span>

              <p className="text-xs text-lead-green/70 leading-relaxed line-clamp-3">
                {resource.desc}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-lead-green group-hover:text-coral transition-colors mt-6 pt-4 border-t border-lead-green/5">
              <span>{resource.actionText}</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate?.('ressources')}
          className="px-8 py-4 rounded-full bg-lead-green text-white font-friendly font-bold text-sm tracking-wide shadow-md hover:bg-lead-green-dark transition-all cursor-pointer border border-lead-green"
        >
          Accéder à la Bibliothèque Complète des Ressources ✦
        </motion.button>
      </div>
    </section>
    </>
  );
}
