import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Shield, HelpCircle, ArrowRight, CheckCircle2, PhoneCall, Calendar, Users, Flame, Globe, MessageSquare, Compass, Smile } from 'lucide-react';
import { DiagnosticFoyer } from './DiagnosticFoyer';
import { HopscotchParentalite } from './HopscotchParentalite';

export function AccompagnementsPage() {
  const pillars = [
    {
      title: "Consultations en Psychologie du Développement de l'enfant",
      desc: "Prise en charge spécialisée pour identifier les blocages cognitifs, les peurs infantiles, la gestion de la colère divine et les troubles légers du développement ou du sommeil.",
      icon: "🌱",
      badge: "Individuel • Enfants",
      time: "45 min par séance"
    },
    {
      title: "Guidance Parentale & Cellules de Médiation",
      desc: "Sessions destinées aux parents pour redéfinir une autorité bienveillante et ferme, désamorcer les conflits, et harmoniser la foi avec les règles de vie de la maison.",
      icon: "👪",
      badge: "Famille & Couple",
      time: "60 min par séance"
    },
    {
      title: "Écoute Active CONFIDENTIELLE pour Adolescents",
      desc: "Sas d'échanges sécurisés pour les préadolescents et adolescents confrontés au repli sur soi, à l'addiction aux écrans ou à de profondes interrogations identitaires.",
      icon: "🤫",
      badge: "Soutien Confidentiel",
      time: "50 min par séance"
    }
  ];

  const methodologySteps = [
    {
      ref: "01",
      title: "Premier entretien d'orientation",
      desc: "Nous faisons le point en profondeur sur l'historique du foyer de manière globale, sans jugement, pour poser les bases de la confiance."
    },
    {
      ref: "02",
      title: "Analyse psychologique fine",
      desc: "Nous identifions les freins de communication à la lumière de la Psychologie du Développement positive et de l'équilibre spirituel."
    },
    {
      ref: "03",
      title: "Plan d'action restaurateur",
      desc: "Mise en place de rituels de transition, fiches de routines, cadres réparateurs à tester et réévaluer ensemble en séances régulières."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg relative overflow-hidden">
      {/* Background Graphic Elements and Playful Doodles */}
      <div className="absolute top-[20%] left-0 w-80 h-80 bg-yellow-bg/40 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute top-[45%] right-0 w-96 h-96 bg-mint/40 rounded-full filter blur-3xl opacity-45 -z-10"></div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f4a38_0.8px,transparent_0.8px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none -z-10"></div>

      {/* Decorative Wavy Lines */}
      <svg className="absolute left-6 top-64 w-28 h-96 text-coral/10 hidden xl:block pointer-events-none -z-10" viewBox="0 0 100 300" fill="none">
        <path d="M10 20 Q 80 100, 20 180 T 90 280" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 5" />
        <circle cx="20" cy="180" r="3" fill="#e05a47" opacity="0.3" />
      </svg>

      <svg className="absolute right-8 top-[35%] w-24 h-96 text-lead-green/10 hidden xl:block pointer-events-none -z-10" viewBox="0 0 100 300" fill="none">
        <path d="M90 20 Q 20 100, 80 180 T 10 280" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 6" />
        <path d="M10 10 Q 90 90, 30 170 T 80 270" stroke="#ff9d00" strokeWidth="1" opacity="0.3" />
      </svg>

      {/* Zigzag decoration */}
      <svg className="absolute left-[5%] bottom-[25%] w-16 h-40 text-[#ff9d00]/25 hidden lg:block pointer-events-none -z-10" viewBox="0 0 60 200" fill="none">
        <path d="M10 10 L 50 30 L 10 50 L 50 70 L 10 90 L 50 110 L 10 130" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Intro Header Section */}
      <section className="py-20 md:py-28 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint border border-lead-green/10 text-lead-green font-friendly font-semibold text-xs mb-6 shadow-xs"
        >
          <Heart size={13} className="text-coral fill-current animate-pulse" />
          <span>Accompagnement Clinique et Guidance des Foyers</span>
        </motion.div>
        
        <div className="relative inline-block">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-friendly font-bold text-lead-green tracking-tight mb-6 leading-tight">
            Guérir la relation, <br />
            <span className="text-[#ff9d00] underline decoration-coral decoration-wavy">rebâtir le dialogue</span>.
          </h1>
          {/* Floating spinning Lamb */}
          <motion.div 
            className="absolute -top-12 -right-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.3 }}
          >
            🐑
          </motion.div>
          {/* Floating spinning Dove */}
          <motion.div 
            className="absolute -bottom-6 -left-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.3, rotate: 360 }}
          >
            🕊️
          </motion.div>
        </div>
        
        <p className="text-base sm:text-lg text-lead-green/75 max-w-2xl mx-auto font-friendly font-semibold leading-relaxed">
          Un soutien sur-mesure combinant écoute clinique approfondie des processus familiaux et repères spirituels sains de la grâce pour accompagner l'éveil de vos précieux enfants.
        </p>
      </section>

      {/* Main Services Pillars List Section */}
      <section className="px-6 lg:px-12 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pil, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, shadow: "2xl" }}
              className="bg-white border border-lead-green/5 p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between group h-full transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff9d00]/5 rounded-bl-[4rem] -z-10"></div>
              
              <div>
                <div className="w-14 h-14 rounded-2xl bg-mint flex items-center justify-center text-2xl mb-6 shadow-xs group-hover:bg-[#ff9d00] group-hover:text-white transition-colors">
                  {pil.icon}
                </div>
                
                <span className="text-[10px] font-bold text-coral uppercase tracking-widest block mb-1 font-friendly">
                  {pil.badge}
                </span>
                
                <h3 className="text-xl md:text-2xl font-friendly font-bold text-lead-green leading-snug mb-4">
                  {pil.title}
                </h3>
                
                <p className="text-sm text-lead-green/70 font-semibold font-friendly leading-relaxed">
                  {pil.desc}
                </p>
              </div>

              <div className="border-t border-lead-green/5 pt-5 mt-8 flex justify-between items-center text-xs font-bold text-[#ff9d00] font-friendly">
                <span>✦ Tarif Concessionnaire Libre</span>
                <span className="text-lead-green/50 bg-bg px-3 py-1 rounded-full text-[10px]">{pil.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bio of Lina with lina 2.jpeg */}
      <section className="px-6 lg:px-12 pb-24 max-w-7xl mx-auto">
        <div className="bg-[#faf8f2] rounded-[3rem] p-8 md:p-12 border border-lead-green/10 flex flex-col md:flex-row items-center gap-10 md:gap-16 shadow-lg relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-coral/5 rounded-bl-[8rem] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-mint/50 rounded-tr-[6rem] filter blur-xl pointer-events-none"></div>

          {/* Left Column: Image */}
          <div className="w-full md:w-2/5 flex justify-center shrink-0">
            <motion.div 
              whileHover={{ rotate: -2, scale: 1.02 }}
              className="relative w-64 h-80 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-[0_20px_40px_rgba(31,74,56,0.12)] rotate-2 bg-white"
            >
              <img 
                src="/images/lina 2.jpeg" 
                alt="Lina NGUERELESSIO" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-coral text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-friendly shadow-xs">
                Directrice ✦
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio */}
          <div className="w-full md:w-3/5 text-left font-friendly">
            <span className="text-[10px] font-bold text-coral uppercase tracking-widest block mb-1">
              À propos de votre guide
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-lead-green mb-4 tracking-tight leading-tight">
              Lina NGUERELESSIO • Psychopédagogue clinicienne & Accompagnatrice des foyers
            </h2>
            <p className="text-sm text-lead-green/80 font-medium leading-relaxed mb-6">
              "Mon but à travers chaque consultation et atelier est d'apporter aux parents des repères scientifiques solides sur le développement de l'enfant tout en honorant la singularité et la dimension spirituelle de chaque foyer. Avec bienveillance, écoute active et rigueur clinique, construisons le chemin vers un dialogue apaisé."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Approche sur-mesure", desc: "Adaptée au rythme et aux besoins uniques de votre enfant." },
                { label: "Soutien confidentiel", desc: "Un espace d'expression totalement sécurisé et sans jugement." },
                { label: "Équilibre Foi & Science", desc: "La psychologie positive éclairée par des valeurs saines." },
                { label: "Outils concrets", desc: "Fiches de routines, diagnostics et plans d'action pragmatiques." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <span className="text-[#ff9d00] text-sm mt-0.5">✦</span>
                  <div>
                    <h4 className="text-xs font-bold text-lead-green">{item.label}</h4>
                    <p className="text-[11px] text-lead-green/70 font-semibold">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 Axes d'Action section (distributed from the main PDF to keep page cognitive load light) */}
      <section className="px-6 lg:px-12 pb-24 max-w-7xl mx-auto text-center font-friendly relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl mx-auto"
        >
          <span className="text-[9px] font-bold text-coral uppercase tracking-widest block mb-1">
            Standard d'Action Joyaux Précieux
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-lead-green">
            Les 6 Axes d’Intervention de la Plateforme
          </h2>
          <p className="text-xs sm:text-sm text-lead-green/75 mt-2 font-semibold">
            Un accompagnement multidimensionnel, clinique et spirituel, conçu pour restaurer l'harmonie des foyers en profondeur.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Éducation & Guidance",
              desc: "Former les parents et futurs parents à l'éducation bienveillante via des ateliers, conférences et diagnostics cliniques.",
              icon: <Users size={20} className="text-coral" />,
              badge: "Ateliers & Conférences"
            },
            {
              title: "Écoute & Soutien Clinique",
              desc: "Espaces d'écoute individuels et confidentiels pour apaiser les blessures émotionnelles et restaurer le dialogue.",
              icon: <Heart size={20} className="text-coral" />,
              badge: "Soutien Confidentiel"
            },
            {
              title: "Épanouissement des Jeunes",
              desc: "Mentorat personnalisé et programmes de vie pratique pour aider les adolescents à se structurer et à s'épanouir.",
              icon: <Smile size={20} className="text-[#ff9d00]" />,
              badge: "Clubs & Mentorat"
            },
            {
              title: "Renforcement Spirituel",
              desc: "Retraites de couples, cercles de prière familiaux et enseignements centrés sur le Standard Divin du foyer.",
              icon: <Flame size={20} className="text-[#ff9d00]" />,
              badge: "Foi & Valeurs"
            },
            {
              title: "Partenariats Éducatifs",
              desc: "Collaboration étroite avec les crèches, écoles et structures chrétiennes pour harmoniser la chaîne éducative.",
              icon: <Globe size={20} className="text-lead-green" />,
              badge: "Impact Réseau"
            },
            {
              title: "Communication & Médias",
              desc: "Diffusion de messages inspirants, fiches rituelles de routines et podcasts de sensibilisation sur la famille.",
              icon: <MessageSquare size={20} className="text-lead-green" />,
              badge: "Sensibilisation"
            }
          ].map((axe, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white p-6 rounded-[2rem] border border-lead-green/10 shadow-3xs flex flex-col justify-between h-52 hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-bg border border-lead-green/5 flex items-center justify-center">
                    {axe.icon}
                  </div>
                  <span className="text-[9px] font-bold text-lead-green/50 uppercase tracking-wider font-mono">
                    Axe 0{idx + 1}
                  </span>
                </div>
                
                <h3 className="font-extrabold text-lead-green text-sm sm:text-base mb-1.5">{axe.title}</h3>
                <p className="text-[11px] sm:text-xs text-lead-green/75 leading-relaxed font-semibold">
                  {axe.desc}
                </p>
              </div>

              <div className="text-[9px] font-bold text-coral uppercase tracking-widest mt-3">
                ✦ {axe.badge}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Embedded Diagnostic Interactive Tool */}
      <section className="bg-white/40 border-y border-lead-green/10 py-12">
        <div className="max-w-[90rem] mx-auto">
          {/* We import the perfected diagnostic module */}
          <DiagnosticFoyer />
        </div>
      </section>

      {/* Hopscotch interactive roadmap to bring back childhood joy */}
      <HopscotchParentalite />

      {/* Methodology Pathway */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="uppercase text-[11px] font-bold tracking-[0.2em] text-[#ff9d00] mb-3 block font-friendly">✦ Méthodes de guidance</span>
          <h2 className="text-3xl md:text-5xl font-friendly font-bold text-lead-green tracking-tight">Le chemin de la restauration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-lead-green/10 -translate-y-1/2 -z-10"></div>
          
          {methodologySteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white border border-lead-green/10 p-8 rounded-[2.5rem] relative flex flex-col justify-between shadow-xs"
            >
              <div className="absolute top-6 right-8 text-4xl font-extrabold tracking-widest text-lead-green/10 font-friendly">
                {step.ref}
              </div>
              
              <div>
                <h3 className="text-lg md:text-xl font-friendly font-bold text-lead-green mb-4 pr-10">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-lead-green/70 font-semibold leading-relaxed font-friendly">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Appointment Section */}
      <section className="bg-lead-green text-white py-20 px-6 lg:px-12 rounded-t-[4rem] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl mb-6 shadow-sm border border-white/10">
            🤝
          </div>
          
          <h2 className="text-3xl md:text-5xl font-friendly font-bold tracking-tight mb-4">
            Commençons à avancer ensemble dès aujourd'hui
          </h2>
          
          <p className="text-sm md:text-base text-white/85 max-w-xl mb-10 font-friendly font-semibold leading-relaxed">
            Chaque pas posé pour le bien d'un enfant est béni. Contactez-nous pour réserver votre créneau de consultation gratuit ou dialoguer sereinement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="https://wa.me/237621479061" 
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4.5 bg-[#e05a47] hover:bg-[#e05a47]/90 text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2 border border-[#e05a47] cursor-pointer shadow-md transform hover:scale-105 transition-all duration-300"
            >
              <PhoneCall size={14} /> Prendre contact via WhatsApp
            </a>
            <a
              href="#contact"
              className="px-8 py-4.5 bg-white text-lead-green hover:bg-[#ff9d00] hover:text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2 cursor-pointer shadow-md transform hover:scale-105 transition-all duration-300"
            >
              <Calendar size={14} /> Réserver par Email (Formulaire)
            </a>
          </div>
          
          <p className="text-[11px] text-white/60 font-friendly font-bold mt-6">
            Confidentialité absolue assurée • Libre participation selon le budget familial
          </p>
        </div>
      </section>
    </div>
  );
}
