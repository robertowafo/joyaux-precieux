import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, HelpCircle, ArrowUp } from 'lucide-react';

interface HopscotchStep {
  num: number;
  title: string;
  subtitle: string;
  icon: string;
  desc: string;
  insight: string;
  color: string;
  textColor: string;
}

export function HopscotchParentalite() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: HopscotchStep[] = [
    {
      num: 1,
      title: "Écoute Apaisée",
      subtitle: "Terre • Étape de départ",
      icon: "👂",
      desc: "Arrêter le flux de questions anxieuses ou de reproches systématiques, et observer les décharges de l'enfant sans filtre.",
      insight: "Fiche Pratique : Accordez quotidiennement un 'sas' de 10 minutes où l'enfant mène le jeu sans aucune intervention directive de votre part.",
      color: "from-[#fdf6e2] to-[#ff9d00]/10",
      textColor: "text-[#a16207]"
    },
    {
      num: 2,
      title: "Co-Régulation",
      subtitle: "Accueillir l'émotion",
      icon: "🫂",
      desc: "Prêter notre système nerveux d'adulte calme pour apaiser le cerveau limbique submergé de l'enfant.",
      insight: "Le Secret : Un câlin silencieux et profond de 20 secondes désarme chimiquement le circuit du stress en produisant de l'ocytocine.",
      color: "from-[#fbebeb] to-[#e05a47]/10",
      textColor: "text-[#e05a47]"
    },
    {
      num: 3,
      title: "Limites Fermes",
      subtitle: "Le cadre de paix",
      icon: "🚧",
      desc: "Installer des repères sécurisants et constants à la maison. Un enfant sans limites est un enfant en stress permanent.",
      insight: "Astuce : Formulez des règles affirmatives ('Nous marchons doucement') plutôt que négatives ('Ne cours pas dans la maison').",
      color: "from-[#e8f1ec] to-[#1f4a38]/10",
      textColor: "text-[#1f4a38]"
    },
    {
      num: 4,
      title: "Discipline Neutre",
      subtitle: "Réparation positive",
      icon: "🛠️",
      desc: "Remplacer le châtiment humiliant par des conséquences logiques et des rituels de réparation.",
      insight: "Clinique : Si de l'eau est renversée durant une tempête émotionnelle, incitez-le d'un ton chaleureux à nettoyer ensemble.",
      color: "from-[#e3f2fd] to-[#2563eb]/10",
      textColor: "text-[#2563eb]"
    },
    {
      num: 5,
      title: "Temps de Qualité",
      subtitle: "Bulle de parole",
      icon: "🎈",
      desc: "Pratiquer le jeu libre et la communication sans logistique pour nourrir durablement le réservoir affectif.",
      insight: "Régularité : Une bulle parent-enfant hebdomadaire réécrit les liens verbaux et désamorce l'insolence pré-adolescente.",
      color: "from-yellow-100/40 to-yellow-bg/20",
      textColor: "text-yellow-700"
    },
    {
      num: 6,
      title: "Standard Divin",
      subtitle: "Le Ciel • La plénitude",
      icon: "👑",
      desc: "Établir un climat d'amour inconditionnel et de pardon spirituel où chaque membre est accueilli tel un joyau divin précieux.",
      insight: "La Grâce : Savoir dire pardon à son propre enfant lorsqu'on a perdu patience est l'acte de maturité spirituelle suprême.",
      color: "from-[#f5f3ff] to-[#7c3aed]/10",
      textColor: "text-[#7c3aed]"
    }
  ];

  const activeData = steps.find(s => s.num === activeStep) || steps[0];

  return (
    <div className="w-full max-w-5xl mx-auto py-14 px-6 relative z-10 font-friendly">
      <div className="bg-white rounded-[3rem] border border-lead-green/10 p-4.5 sm:p-8 md:p-12 shadow-xl relative overflow-hidden">
        
        {/* Playful Floating elements */}
        <div className="absolute top-4 left-6 text-lead-green/15 text-2xl animate-spin" style={{ animationDuration: '8s' }}>🌀</div>
        <div className="absolute bottom-6 right-6 text-coral/25 text-2xl animate-bounce">🎈</div>

        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mint text-lead-green text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles size={11} className="text-[#ff9d00] animate-pulse" /> EXCLUSIF : LA MARELLE THÉRAPEUTIQUE
          </span>
          <h3 className="text-2xl sm:text-3.5xl font-bold text-lead-green tracking-tight mb-4">
            La Marelle de la Parentalité Positive 👦
          </h3>
          <p className="text-sm font-semibold text-lead-green/75 leading-relaxed">
            Un parcours ludique inspiré du célèbre jeu de cour de récréation ! Sautez de case en case (de la Terre au Ciel) pour décrypter le chemin clinique d'un foyer restauré.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-around gap-12">
          
          {/* THE HOPSCOTCH CANVAS DRAWING */}
          <div className="relative w-80 flex flex-col items-center select-none pt-4 bg-gray-50/50 p-6 rounded-[2.5rem] border border-lead-green/5">
            
            {/* The Hopscotch Grid Layout */}
            <div className="flex flex-col-reverse items-center gap-2 w-full max-w-[200px]">
              
              {/* Box 1 (Single) */}
              <div className="flex justify-center w-full">
                <HopButton stepNum={1} activeStep={activeStep} steps={steps} onClick={setActiveStep} />
              </div>

              {/* Box 2 & 3 (Double Side-by-side) */}
              <div className="flex justify-between w-full gap-2">
                <HopButton stepNum={2} activeStep={activeStep} steps={steps} onClick={setActiveStep} />
                <HopButton stepNum={3} activeStep={activeStep} steps={steps} onClick={setActiveStep} />
              </div>

              {/* Box 4 (Single) */}
              <div className="flex justify-center w-full">
                <HopButton stepNum={4} activeStep={activeStep} steps={steps} onClick={setActiveStep} />
              </div>

              {/* Box 5 & 6 (Double Side-by-side) */}
              <div className="flex justify-between w-full gap-2">
                <HopButton stepNum={5} activeStep={activeStep} steps={steps} onClick={setActiveStep} />
                <HopButton stepNum={6} activeStep={activeStep} steps={steps} onClick={setActiveStep} />
              </div>

            </div>

            {/* Earth Tag bottom */}
            <div className="mt-4 text-[10px] font-extrabold tracking-widest text-[#e05a47] uppercase bg-[#fbebeb] px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-xs border border-[#e05a47]/10">
              🌱 TERRE (Crises, Colère & Cris)
            </div>

            {/* Heaven Tag top */}
            <div className="absolute top-[-10px] text-[10px] font-extrabold tracking-widest text-violet-700 uppercase bg-violet-50 px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-xs border border-violet-700/10 animate-pulse">
              ☁️ CIEL (Harmonie, Douceur & Foi)
            </div>

            {/* The beautiful hopping Kid avatar token */}
            <AnimatePresence>
              {steps.map(s => {
                if (s.num !== activeStep) return null;
                return (
                  <motion.div
                    key="avatarToken"
                    layoutId="hopscotchAvatar"
                    className="absolute z-20 pointer-events-none text-2xl flex flex-col items-center filter drop-shadow-md"
                    // Offset position based on step layout
                    style={getAvatarPositionStyle(activeStep)}
                    initial={{ scale: 0.4, y: -20, opacity: 0 }}
                    animate={{ scale: 1.1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.4, y: 20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  >
                    <div className="bg-white/95 border-2 border-coral rounded-full w-9 h-9 flex items-center justify-center text-lg animate-bounce shadow">
                      👶
                    </div>
                    {/* Tiny arrow */}
                    <div className="w-1.5 h-1.5 bg-coral rotate-45 -mt-0.5" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ACTIVE STEP CARD VIEW (AnimatePresence) */}
          <div className="flex-1 w-full max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`bg-gradient-to-br ${activeData.color} border border-lead-green/10 rounded-[2.5rem] p-7 md:p-9 shadow-inner text-left font-friendly`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-14 h-14 rounded-2xl bg-white border border-lead-green/5 flex items-center justify-center text-4xl shadow-sm">
                    {activeData.icon}
                  </span>
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${activeData.textColor}`}>
                      {activeData.subtitle}
                    </span>
                    <h4 className="text-xl font-bold text-lead-green mt-0.5">
                      {activeData.num}. {activeData.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-lead-green/80 mb-6 leading-relaxed">
                  {activeData.desc}
                </p>

                {/* Clinical advice strip */}
                <div className="bg-white/90 border border-lead-green/5 p-4.5 rounded-2xl flex items-start gap-3.5 shadow-sm text-xs md:text-sm">
                  <Heart size={16} className="text-coral shrink-0 mt-0.5 fill-current animate-pulse" />
                  <p className="font-semibold text-lead-green leading-relaxed">
                    {activeData.insight}
                  </p>
                </div>

                {/* Helpful direction helper */}
                {activeStep < 6 && (
                  <button 
                    onClick={() => setActiveStep(prev => prev + 1)}
                    className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#ff9d00] hover:text-[#ff9d00]/80 cursor-pointer text-center mx-auto uppercase tracking-wide group"
                  >
                    Hoper à la case suivante ({activeStep + 1}) <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}

// Hop button reusable element
interface HopButtonProps {
  stepNum: number;
  activeStep: number;
  steps: HopscotchStep[];
  onClick: (n: number) => void;
}
function HopButton({ stepNum, activeStep, steps, onClick }: HopButtonProps) {
  const current = steps.find(s => s.num === stepNum) || steps[0];
  const isSelected = activeStep === stepNum;
  return (
    <motion.button
      onClick={() => onClick(stepNum)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-18 h-18 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
        isSelected 
          ? 'bg-white border-coral text-coral font-black shadow-inner shadow-coral/10' 
          : 'bg-white/80 border-lead-green/20 hover:border-lead-green/45 hover:bg-white text-lead-green font-bold'
      }`}
    >
      <span className="text-[10px] font-mono leading-none">{current.icon}</span>
      <span className="text-base font-friendly mt-0.5">{stepNum}</span>
    </motion.button>
  );
}

// Map index to visually represent Hopscotch positioning
function getAvatarPositionStyle(step: number) {
  // Rough estimate coordinates looking layout
  switch (step) {
    case 1:
      return { bottom: '115px', left: '150px' };
    case 2:
      return { bottom: '200px', left: '106px' };
    case 3:
      return { bottom: '200px', left: '183px' };
    case 4:
      return { bottom: '280px', left: '150px' };
    case 5:
      return { bottom: '360px', left: '106px' };
    case 6:
      return { bottom: '360px', left: '183px' };
    default:
      return { bottom: '115px', left: '150px' };
  }
}
