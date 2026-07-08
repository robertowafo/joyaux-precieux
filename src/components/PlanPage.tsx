import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, Compass, Shield, Users, Globe, MapPin, 
  Smile, Flame, Award, ArrowRight, Check, MessageCircle, Star, Palette
} from 'lucide-react';

export function PlanPage() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<'petiteEnfance' | 'preados' | 'ados'>('petiteEnfance');
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const values = [
    {
      title: "Harmonie",
      badge: "Unité de cœur",
      desc: "Un espace d'amour et d'esprit où chaque membre trouve sa juste place, et où les différences sont valorisées.",
      icon: <Users size={24} className="text-coral" />,
      bg: "bg-coral/5 hover:bg-coral/10 border-coral/15"
    },
    {
      title: "Amour",
      badge: "Base suprême",
      desc: "Un sentiment agapé inconditionnel qui guérit, pardonne sans limite, et recherche constamment le bien d'autrui.",
      icon: <Heart size={24} className="text-coral" />,
      bg: "bg-coral/5 hover:bg-coral/10 border-coral/15"
    },
    {
      title: "Paix",
      badge: "Trésor divin",
      desc: "Un don de grâce et un rempart précieux dont chaque foyer moderne doit être enveloppé au quotidien.",
      icon: <Shield size={24} className="text-[#ff9d00]" />,
      bg: "bg-[#ff9d00]/5 hover:bg-[#ff9d00]/10 border-[#ff9d00]/15"
    },
    {
      title: "Équilibre",
      badge: "Éveil global",
      desc: "L'harmonie globale de toutes les dimensions de la vie familiale : cognitive, affective, sociale et spirituelle.",
      icon: <Compass size={24} className="text-[#ff9d00]" />,
      bg: "bg-[#ff9d00]/5 hover:bg-[#ff9d00]/10 border-[#ff9d00]/15"
    }
  ];

  const impactSteps = [
    {
      level: "Foyer",
      title: "Impact Familial",
      badge: "Racines",
      desc: "Restauration des couples, communication positive parents-enfants, et éducation bienveillante et structurante.",
      icon: "🏠",
      color: "text-coral border-coral/20 bg-coral/5"
    },
    {
      level: "Quartier",
      title: "Impact Communautaire",
      badge: "Réseaux",
      desc: "Diffusion des bonnes pratiques éducatives dans les crèches, écoles et églises locales, avec des groupes d'entraide actifs.",
      icon: "📍",
      color: "text-[#ff9d00] border-[#ff9d00]/20 bg-[#ff9d00]/5"
    },
    {
      level: "Nation",
      title: "Impact National",
      badge: "Politique",
      desc: "Inspirer les programmes d'éducation, former des leaders familiaux inspirants, et réduire les risques d'errance juvénile.",
      icon: "🇨🇲",
      color: "text-lead-green border-lead-green/20 bg-lead-green/5"
    },
    {
      level: "Monde",
      title: "Impact International",
      badge: "Influence",
      desc: "Propager ce modèle d'harmonie au-delà des frontières via le digital et bâtir une génération de citoyens de paix.",
      icon: "🌍",
      color: "text-[#1f4a38] border-mint bg-mint/30"
    }
  ];

  const ageGroups = {
    petiteEnfance: {
      title: "Petite Enfance",
      age: "3-6 ans",
      desc: "Éveiller les sens, apprivoiser les émotions premières et découvrir la foi par le jeu bienveillant.",
      color: "border-coral/20 bg-coral/5 text-coral",
      buttonColor: "bg-coral text-white hover:bg-coral/90",
      activities: [
        { name: "💃 Danse créative", desc: "Motricité et expression rythmée du corps.", icon: "🎨" },
        { name: "📖 Contes interactifs", desc: "Histoires bibliques illustrées avec marionnettes.", icon: "🧸" },
        { name: "🎵 Chants d'éveil", desc: "Mélodies douces pour cultiver la gratitude.", icon: "🎶" },
        { name: "🧩 Mini-ateliers créatifs", desc: "Bricolage sensoriel et dessins de verbalisation.", icon: "✏️" },
        { name: "🎲 Jeux coopératifs", desc: "Apprendre le partage et la socialisation.", icon: "🤝" },
        { name: "🎙️ Écoute active", desc: "Séances courtes d'apaisement des premières peurs.", icon: "💬" }
      ]
    },
    preados: {
      title: "Préadolescents",
      age: "7-12 ans",
      desc: "Forger l'estime de soi, structurer la pensée spirituelle et apprendre l'autonomie et l'organisation.",
      color: "border-[#ff9d00]/20 bg-[#ff9d00]/5 text-[#a16207]",
      buttonColor: "bg-[#ff9d00] text-white hover:bg-[#ff9d00]/90",
      activities: [
        { name: "📖 Études stimulantes", desc: "Réflexion biblique ancrée dans la réalité du quotidien.", icon: "⚡" },
        { name: "🎭 Théâtre d'impro", desc: "Sketchs d'affirmation face au harcèlement ou à la pression.", icon: "🎤" },
        { name: "🛠️ Ateliers d'autonomie", desc: "Savoir s'organiser, ranger et s'impliquer dans le foyer.", icon: "📦" },
        { name: "💬 Talks thématiques", desc: "Échanges libres sur l'amitié, le respect et la parole donnée.", icon: "🗣️" },
        { name: "🎲 Jeux de stratégie", desc: "Jeux de table stimulants pour apprendre à gérer l'échec.", icon: "♟️" },
        { name: "💃 Ateliers de rythme", desc: "Prendre conscience de son corps avec grâce.", icon: "✨" }
      ]
    },
    ados: {
      title: "Adolescents",
      age: "12-18 ans",
      desc: "Se découvrir, affirmer son identité saine, résister aux dérives numériques et libérer son talent.",
      color: "border-lead-green/20 bg-lead-green/5 text-lead-green",
      buttonColor: "bg-lead-green text-white hover:bg-lead-green/90",
      activities: [
        { name: "🛋️ Le Canapé des Ados", desc: "Espace d'échanges sans filtre sur l'identité, l'amitié et l'avenir.", icon: "💬" },
        { name: "🎤 Slam & Écriture", desc: "Exprimer sa foi, ses doutes et ses rêves en poésie urbaine.", icon: "✍️" },
        { name: "♟️ Déconnexion ludique", desc: "Jeux de société passionnants pour rire loin des écrans.", icon: "🎮" },
        { name: "📢 Conférences de vie", desc: "Préparer l'indépendance de demain (budget, hygiène de vie).", icon: "💎" },
        { name: "🎭 Scénarios réels", desc: "Jeux de rôle pour surmonter sereinement les crises adolescentes.", icon: "🤝" }
      ]
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-bg relative overflow-hidden">
      {/* Organic Background Elements and Playful Doodles */}
      <div className="absolute top-[10%] left-0 w-80 h-80 bg-mint/30 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-[20%] right-0 w-80 h-80 bg-yellow-bg/40 rounded-full filter blur-3xl opacity-50 -z-10"></div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f4a38_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none -z-10"></div>

      {/* Left Column Wavy Line */}
      <svg className="absolute left-4 top-48 w-24 h-96 text-[#e05a47]/15 hidden lg:block pointer-events-none -z-10" viewBox="0 0 100 400" fill="none">
        <path d="M10 10 Q 90 80, 50 150 T 10 290 T 50 390" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
        <path d="M20 10 Q 100 80, 60 150 T 20 290 T 60 390" stroke="currentColor" strokeWidth="1" opacity="0.5" strokeDasharray="2 2" />
        <circle cx="50" cy="150" r="4" fill="#e05a47" opacity="0.4" />
        <circle cx="10" cy="290" r="4" fill="#ff9d00" opacity="0.4" />
      </svg>

      {/* Right Column Playful Zigzag */}
      <svg className="absolute right-6 top-96 w-20 h-[500px] text-[#ff9d00]/20 hidden lg:block pointer-events-none -z-10" viewBox="0 0 80 400" fill="none">
        <path d="M10 0 L 70 40 L 10 80 L 70 120 L 10 160 L 70 200 L 10 240 L 70 280 L 10 320" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 5 L 75 45 L 15 85 L 75 125 L 15 165 T 75 205" stroke="#e05a47" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
        {/* Floating Sparkles inside SVG */}
        <path d="M20,350 L25,360 L35,365 L25,370 L20,380 L15,370 L5,365 L15,360 Z" fill="#e05a47" opacity="0.4" />
      </svg>

      {/* Left Floating Loop-de-loop (Child-like playfulness) */}
      <svg className="absolute left-12 bottom-96 w-24 h-48 text-[#1f4a38]/10 hidden xl:block pointer-events-none -z-10" viewBox="0 0 100 200" fill="none">
        <path d="M10 10 C 60 10, 80 50, 40 80 C 10 100, 30 140, 80 150 C 110 160, 50 190, 20 190" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="40" cy="80" r="5" fill="#1f4a38" opacity="0.3" />
      </svg>

      {/* Additional top decoration blobs / shapes */}
      <div className="absolute top-12 right-[10%] w-16 h-16 border-2 border-dashed border-coral/10 rounded-full animate-spin pointer-events-none -z-10" style={{ animationDuration: '25s' }}></div>
      <div className="absolute bottom-48 left-[8%] w-12 h-12 border-4 border-[#ff9d00]/10 rounded-[1.2rem] rotate-12 pointer-events-none -z-10 animate-pulse"></div>

      {/* 1. Header Minimaliste & Poétique */}
      <section className="py-12 md:py-20 px-6 text-center max-w-4xl mx-auto font-friendly">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-mint border border-lead-green/10 text-lead-green font-semibold text-xs mb-4"
        >
          <Sparkles size={12} className="text-[#ff9d00] animate-pulse" />
          <span>Une Plateforme Inspirée pour Rebâtir l'Harmonie</span>
        </motion.div>

        <div className="relative inline-block">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-friendly font-extrabold text-lead-green tracking-tight leading-[1.1] mb-5">
            Le Standard Divin <span className="text-coral underline decoration-[#ff9d00] decoration-wavy">Joyaux Précieux</span>
          </h1>
          {/* Floating spinning Unicorn */}
          <motion.div 
            className="absolute -top-12 -right-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.3 }}
          >
            🦄
          </motion.div>
          {/* Floating spinning Crown */}
          <motion.div 
            className="absolute -bottom-6 -left-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.3, rotate: -360 }}
          >
            👑
          </motion.div>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-lead-green/80 max-w-2xl mx-auto font-medium leading-relaxed">
          Parce que chaque enfant est un diamant brut. Notre boussole spirituelle et clinique accompagne les familles vers un foyer uni, solide et ancré dans l'amour.
        </p>
      </section>

      {/* 2. Bento Grid des 4 Piliers de Valeur */}
      <section className="px-6 pb-20 max-w-6xl mx-auto font-friendly text-center">
        <div className="mb-10">
          <span className="uppercase text-[9px] font-bold tracking-[0.25em] text-[#ff9d00] block mb-1">Nos Semences de Vie</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-lead-green">Les 4 Valeurs Fondamentales</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setHoveredValue(idx)}
              onMouseLeave={() => setHoveredValue(null)}
              className={`border p-6 rounded-[2rem] text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-56 bg-white shadow-xs ${val.bg}`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/40 rounded-bl-[4rem] pointer-events-none"></div>
              
              <div>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-2xs">
                  {val.icon}
                </div>
                <span className="text-[9px] font-bold text-coral uppercase tracking-wider block mb-1">{val.badge}</span>
                <h3 className="font-extrabold text-lead-green text-lg mb-1">{val.title}</h3>
                <p className="text-[11px] sm:text-xs text-lead-green/75 font-semibold leading-relaxed line-clamp-3">
                  {val.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-bold text-lead-green/45 group-hover:text-[#ff9d00]">
                <span>Standard Divin</span>
                <Check size={10} className="text-[#ff9d00]" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. L'Espace Interactif d'Activités par Âges (UX Centered Card Deck) */}
      <section className="px-6 pb-24 max-w-5xl mx-auto font-friendly text-center">
        <div className="mb-8">
          <span className="uppercase text-[9px] font-bold tracking-[0.25em] text-coral block mb-1">Programme Pédagogique</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-lead-green">Nos Ateliers & Éveil Clinique</h2>
          <p className="text-xs sm:text-sm text-lead-green/70 font-semibold mt-2 max-w-xl mx-auto">
            Découvrez comment nous traduisons notre vision en actions concrètes et adaptées selon l'âge neurologique et émotionnel de vos enfants.
          </p>
        </div>

        {/* 3D-styled Interactive Selector */}
        <div className="inline-flex p-1.5 rounded-[2rem] bg-white border border-lead-green/10 shadow-xs mb-10 gap-1">
          {(Object.keys(ageGroups) as Array<keyof typeof ageGroups>).map((groupKey) => {
            const grp = ageGroups[groupKey];
            const isActive = selectedAgeGroup === groupKey;
            return (
              <button
                key={groupKey}
                onClick={() => setSelectedAgeGroup(groupKey)}
                className={`px-5 py-3 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex flex-col items-center sm:flex-row gap-1.5 ${
                  isActive 
                    ? 'bg-lead-green text-white shadow-sm' 
                    : 'text-lead-green/75 hover:bg-bg'
                }`}
              >
                <span>{grp.title}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-lead-green/5'}`}>
                  {grp.age}
                </span>
              </button>
            );
          })}
        </div>

        {/* Current Active Group Activities Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAgeGroup}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`border rounded-[3rem] p-6 sm:p-10 shadow-xs text-left relative overflow-hidden bg-[#faf8f2] ${ageGroups[selectedAgeGroup].color}`}
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/20 rounded-bl-[10rem] pointer-events-none"></div>
            
            <div className="mb-8 border-b border-lead-green/5 pb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-lead-green">
                Espace {ageGroups[selectedAgeGroup].title} • {ageGroups[selectedAgeGroup].age}
              </h3>
              <p className="text-xs sm:text-sm text-lead-green/75 mt-1.5 font-semibold">
                {ageGroups[selectedAgeGroup].desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ageGroups[selectedAgeGroup].activities.map((act, actIdx) => (
                <motion.div
                  key={actIdx}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white p-5 rounded-[1.8rem] border border-lead-green/5 shadow-2xs flex items-start gap-3"
                >
                  <span className="text-xl p-2 rounded-xl bg-bg border border-lead-green/5 shrink-0 block">{act.icon}</span>
                  <div>
                    <h4 className="font-bold text-lead-green text-xs sm:text-sm mb-1">{act.name}</h4>
                    <p className="text-[11px] text-lead-green/70 leading-relaxed font-semibold">{act.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 4. Timeline Visuelle de la "Moisson d'Impact" (UX Roadmap) */}
      <section className="px-6 pb-24 max-w-5xl mx-auto font-friendly text-center relative">
        <div className="mb-14">
          <span className="uppercase text-[9px] font-bold tracking-[0.25em] text-[#ff9d00] block mb-1">La Moisson du Projet</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-lead-green">Feuille de Route & Portée de l'Impact</h2>
          <p className="text-xs sm:text-sm text-lead-green/70 font-semibold mt-2 max-w-lg mx-auto">
            Nous mesurons l'influence du Standard Divin par cercles concentriques, du cœur d'un seul enfant jusqu'aux nations.
          </p>
        </div>

        {/* Visual Roadmap connector timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          {impactSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-white p-6 rounded-[2.2rem] border border-lead-green/10 shadow-3xs relative h-full flex flex-col justify-between"
            >
              {/* Circle Index floating */}
              <div className="absolute -top-3 -left-2 w-8 h-8 rounded-full bg-lead-green text-[#faf8f2] flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                0{idx + 1}
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${step.color}`}>
                    {step.level}
                  </span>
                  <span className="text-xl">{step.icon}</span>
                </div>

                <h3 className="font-extrabold text-lead-green text-sm sm:text-base mb-1.5">{step.title}</h3>
                <p className="text-[11px] sm:text-xs text-lead-green/75 font-semibold leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-lead-green/5 text-[9px] font-bold text-[#ff9d00] uppercase tracking-wider">
                Moisson • {step.badge}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Section d'Action Interactive (CTA) */}
      <section className="bg-lead-green text-[#faf8f2] py-16 px-6 sm:px-12 rounded-t-[3.5rem] text-center relative overflow-hidden font-friendly">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ff9d00]/5 rounded-tl-full"></div>
        
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-[10px] font-bold text-coral uppercase tracking-widest block mb-2">Rebâtir Ensemble</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4 text-white">
            Envie d'implanter le Standard Divin Joyaux Précieux au sein de votre foyer ou structure ?
          </h2>
          <p className="text-xs sm:text-sm text-[#faf8f2]/80 leading-relaxed mb-8 font-semibold">
            Que vous représentiez une école, une église, une crèche ou que vous soyez simplement un parent engagé, collaborons avec Lina NGUERELESSIO pour mettre en place ces ateliers d'amour et de paix.
          </p>

          <div className="flex justify-center">
            <a
              href="#contact"
              onClick={(e) => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-3.5 bg-[#e05a47] hover:bg-[#e05a47]/90 text-white text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center gap-2 shadow-md transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <MessageCircle size={13} className="fill-current" /> Dialoguer avec Lina NGUERELESSIO
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
