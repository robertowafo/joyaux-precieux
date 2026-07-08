import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle, Download, Calendar } from 'lucide-react';

export function DiagnosticFoyer() {
  const [step, setStep] = useState(1);
  const [ageRange, setAgeRange] = useState('');
  const [problemTheme, setProblemTheme] = useState('');

  const ageOptions = [
    { value: 'conception-naissance', label: 'De la conception à la naissance', icon: '🤰' },
    { value: 'enfant', label: 'Enfance (2 à 10 ans)', icon: '👦' },
    { value: 'adolescent', label: 'Adolescence (10-12 ans à 18 ans)', icon: '🧑' },
    { value: 'adulte', label: 'Adulte (18 ans et plus)', icon: '🧍' }
  ];

  const problemOptions = [
    { value: 'emotions', label: 'Gestion des émotions (Colère, Tristesse)', icon: '🎭' },
    { value: 'conflits', label: 'Conflits de communication & Fratrie', icon: '🗣️' },
    { value: 'sommeil-ecrans', label: 'Régulation Sommeil, Écrans & Routines', icon: '📱' },
    { value: 'confiance', label: 'Confiance en soi & Anxiété', icon: '🌟' }
  ];

  const getResult = () => {
    // Determine custom tailored advice based on age + theme
    let title = "Plan d'Action Précieux de Lina NGUERELESSIO";
    let desc = "Voici vos orientations psycho-éducatives personnalisées pour apaiser et consolider votre foyer.";
    let tips = [
      "Instaurez un rituel d'écoute active de 10 minutes chaque soir.",
      "Fixez des limites claires et formulées positivement sans crier.",
      "Valorisez les efforts émotionnels plutôt que les résultats scolaires."
    ];
    let resourceTitle = "Kit Psycho-Éducatif des Joyaux";
    let downloadLink = "#";

    if (ageRange === 'conception-naissance') {
      tips = [
        "Préparez l’écosystème du nouveau-né avec des temps de communication active in utero (parler au bébé, douceur).",
        "Évitez l'anxiété prénatale par de saines routines psycho-corporelles et une atmosphère spirituelle apaisante.",
        "Anticipez sereinement le retour au foyer en structurant un cadre d’accueil clair et bienveillant."
      ];
      resourceTitle = "Guide d'Harmonie Conception à Naissance.pdf";
    } else if (ageRange === 'enfant') {
      if (problemTheme === 'emotions') {
        tips = [
          "Introduisez le 'tableau des émotions' hebdomadaire pour l'enfant (2 à 10 ans).",
          "Faites de courtes pauses de respiration ventrale lente (inspirez 4s, expirez 4s) avec lui.",
          "Ancrez la certitude qu'une émotion est saine et requiert d'être verbalisée calmement."
        ];
        resourceTitle = "La Boussole des Émotions de l'Enfance.pdf";
      } else if (problemTheme === 'conflits') {
        tips = [
          "Mettez en place un petit 'Conseil de Paix' familial pour résoudre les conflits sans cris.",
          "Bannissez les comparaisons directes (ex: 'Regarde ton frère') qui alimentent la jalousie.",
          "Pratiquez le pardon restaurateur fondé sur la réparation positive des bêtises."
        ];
        resourceTitle = "Protocole de Résolution des Conflits de l'Enfance.pdf";
      } else {
        tips = [
          "Zéro écran dans la chambre à coucher et limitez fortement l'exposition après l'école.",
          "Planifiez des routines de coucher chaleureuses et stables (histoire, gratitude).",
          "Encouragez l'affirmation de soi et la confiance à travers de petites tâches gratifiantes."
        ];
        resourceTitle = "Routines & Confiance chez l'Enfant (2-10 ans).pdf";
      }
    } else if (ageRange === 'adolescent') {
      if (problemTheme === 'emotions' || problemTheme === 'confiance') {
        tips = [
          "Évitez les jugements hâtifs sur les notes ou le style ; écoutez l'adolescent (10-12 à 18 ans) en premier lieu.",
          "Validez l'expression de ses doutes ou de sa quête de repères sans minimiser sa sensibilité.",
          "Soutenez son besoin d'autonomie tout en maintenant un lien de parole inconditionnel."
        ];
        resourceTitle = "Rétablir le Dialogue avec mon Adolescent.pdf";
      } else {
        tips = [
          "Pas de smartphone ou de console dans la chambre après 21h30 pour préserver le sommeil.",
          "Co-construisez un pacte familial d'utilisation des écrans pour toute la maison.",
          "Offrez-lui des espaces sains d'implication sociale, créative ou spirituelle à sa mesure."
        ];
        resourceTitle = "Pacte d'Écran pour Adolescents Équilibrés.pdf";
      }
    } else if (ageRange === 'adulte') {
      tips = [
        "Analysez les dynamiques de votre foyer de manière objective pour désamorcer les conflits de couple.",
        "Restaurez l'harmonie par des temps de qualité partagés sans parler de logistique du foyer.",
        "Renforcez votre posture parentale (éducation, spiritualité) pour devenir un repère rassurant."
      ];
      resourceTitle = "Équilibre et Harmonie pour Adultes.pdf";
    }

    return { title, desc, tips, resourceTitle };
  };

  const handleReset = () => {
    setAgeRange('');
    setProblemTheme('');
    setStep(1);
  };

  const result = getResult();

  return (
    <section id="diagnostic" className="py-24 md:py-36 px-6 lg:px-12 max-w-[90rem] mx-auto bg-yellow-bg/30 border-t border-lead-green/10 rounded-[3rem] my-12">
      <div className="flex flex-col xl:flex-row gap-16 items-center">
        
        {/* Left explanation block */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                staggerChildren: 0.12,
                duration: 0.6
              }
            }
          }}
          className="xl:w-2/5 flex flex-col items-start text-left"
        >
          <motion.span 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-4 flex items-center gap-1.5 font-friendly"
          >
            <Sparkles size={12} className="fill-current text-[#ff9d00] animate-pulse" />
            Widget Interactif d'Engagement
          </motion.span>
          
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            className="text-4xl md:text-5xl font-friendly font-bold tracking-tight text-lead-green leading-[1.1] mb-6"
          >
            Faire le point <br />
            sur mon <span className="text-[#ff9d00] underline decoration-[#e05a47] decoration-wavy">foyer</span>
          </motion.h2>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            className="text-base text-lead-green/80 font-medium font-friendly leading-relaxed mb-8 max-w-md"
          >
            La majorité des parents viennent chercher des solutions mais ne savent pas par où commencer. Ce mini-diagnostic rapide de 30 secondes cerne vos enjeux et vous propose un plan d'action immédiat.
          </motion.p>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 border border-lead-green/5 p-4 rounded-2xl w-full flex items-center gap-3.5 shadow-sm max-w-sm transition-all"
          >
            <div className="text-2xl animate-bounce">💡</div>
            <p className="text-xs text-lead-green/70 font-semibold font-friendly">
              Aucune coordonnée requise pour commencer. Résultat 100% anonyme.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Step Widget */}
        <div className="xl:w-3/5 w-full bg-white rounded-[3rem] p-4.5 sm:p-8 md:p-12 shadow-xl border border-lead-green/5 min-h-[460px] flex flex-col justify-between relative overflow-hidden">
          {/* Wave background decor inside widget */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-coral/5 rounded-full filter blur-2xl"></div>
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Age option */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold tracking-widest text-lead-green/50 uppercase font-friendly">Étape 1 sur 3</span>
                    <span className="text-xs font-bold text-coral bg-coral/10 py-1 px-2.5 rounded-full font-friendly">Âge de l'enfant</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-friendly font-bold text-lead-green mb-8">
                     Quel est l'âge de l'enfant ou adolescent concerné ?
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {ageOptions.map((opt, i) => (
                      <motion.button
                        key={opt.value}
                        onClick={() => {
                          setAgeRange(opt.value);
                          setStep(2);
                        }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        className={`p-6 border rounded-3xl text-left font-friendly cursor-pointer transition-all duration-300 flex flex-col justify-between h-36 ${
                          ageRange === opt.value
                            ? 'bg-lead-green text-white border-lead-green shadow-md'
                            : 'bg-bg text-lead-green border-lead-green/10 hover:border-lead-green/30 hover:bg-mint/40'
                        }`}
                      >
                        <span className="text-3xl mb-4">{opt.icon}</span>
                        <span className="font-bold text-sm tracking-tight">{opt.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    disabled={!ageRange}
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-6 py-3.5 bg-lead-green text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-highlight cursor-pointer disabled:opacity-40 disabled:hover:bg-lead-green shadow-md transition-colors font-friendly"
                  >
                    Suivant <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Problem chosen */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <button 
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-lead-green/60 hover:text-lead-green font-friendly border-b border-transparent hover:border-lead-green/60 cursor-pointer"
                    >
                      ← Retour
                    </button>
                    <span className="text-[10px] font-bold tracking-widest text-lead-green/50 uppercase font-friendly">Étape 2 sur 3</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-friendly font-bold text-lead-green mb-8">
                     Quelle est l'impasse ou la thématique principale actuelle ?
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {problemOptions.map((opt, i) => (
                      <motion.button
                        key={opt.value}
                        onClick={() => {
                          setProblemTheme(opt.value);
                          setStep(3);
                        }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ scale: 1.03, x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        className={`p-5 border rounded-3xl text-left font-friendly cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                          problemTheme === opt.value
                            ? 'bg-[#e05a47] text-white border-[#e05a47] shadow-md'
                            : 'bg-bg text-lead-green border-lead-green/10 hover:border-lead-green/30 hover:bg-[#fbebeb]/50'
                        }`}
                      >
                        <span className="text-2.5xl block shrink-0">{opt.icon}</span>
                        <span className="font-bold text-xs md:text-sm tracking-tight leading-snug">{opt.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between items-center">
                  <button 
                    onClick={() => setStep(1)}
                    className="text-xs font-bold font-friendly text-lead-green/60 hover:text-lead-green decoration-dotted underline cursor-pointer"
                  >
                    Précédent
                  </button>
                  <button
                    disabled={!problemTheme}
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 px-6 py-3.5 bg-lead-green text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-highlight hover:scale-[1.04] cursor-pointer disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-lead-green shadow-md transition-all font-friendly"
                  >
                    Analyser <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Customized Results */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] text-green-700 bg-green-50 px-2.5 py-1.5 rounded-full font-bold uppercase tracking-widest font-friendly flex items-center gap-1">
                      <CheckCircle size={12} className="text-green-600 fill-current" /> Analyse Terminée
                    </span>
                    <button 
                      onClick={handleReset}
                      className="text-xs font-bold text-lead-green/60 hover:text-lead-green font-friendly flex items-center gap-1.5"
                    >
                      <RefreshCw size={12} /> Recommencer
                    </button>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-friendly font-bold text-lead-green mb-2">
                     {result.title}
                  </h3>
                  <p className="text-xs md:text-sm font-friendly text-lead-green/70 mb-6 font-semibold">
                    {result.desc}
                  </p>

                  {/* Bullet tips */}
                  <div className="space-y-3.5 my-6">
                     {result.tips.map((tip, idx) => (
                       <div key={idx} className="flex gap-3 bg-mint/40 p-3.5 rounded-2xl border border-lead-green/5">
                          <span className="text-highlight text-sm">✦</span>
                          <p className="text-xs md:text-sm font-friendly font-semibold text-lead-green leading-relaxed">
                            {tip}
                          </p>
                       </div>
                     ))}
                  </div>

                  {/* Free resource recommendation */}
                  <div className="mt-8 border-t border-dashed border-lead-green/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-yellow-bg/40 p-5 rounded-3xl">
                     <div>
                        <span className="text-[9px] font-bold text-[#ff9d00] tracking-widest uppercase block mb-1">Ressource Recommandée :</span>
                        <span className="font-friendly text-xs font-bold text-lead-green">{result.resourceTitle}</span>
                     </div>
                     <button
                        onClick={() => alert("Votre téléchargement de ressource commencera dans un instant. (Simulation)")}
                        className="px-4 py-2.5 bg-[#e05a47] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-lead-green transition-all flex items-center gap-1.5 shadow-sm cursor-pointer font-sans"
                     >
                        <Download size={11} /> Télécharger
                     </button>
                  </div>
                </div>

                {/* Booking Call to action */}
                <div className="mt-10 pt-6 border-t border-lead-green/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-left">
                     <h4 className="font-friendly font-bold text-sm text-lead-green">Besoin d'aller plus loin ?</h4>
                     <p className="text-[11px] font-friendly font-semibold text-lead-green/60">Une séance d'écoute de 15 min gratuite par WhatsApp.</p>
                  </div>
                  <a
                    href="#contact"
                    className="flex items-center gap-2 px-6 py-3.5 bg-lead-green text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-highlight transition-all shadow-md font-friendly"
                  >
                    <Calendar size={13} /> Prendre Rendez-vous ↗
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
