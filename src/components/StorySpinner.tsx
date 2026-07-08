import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, HelpCircle, RotateCw, BookOpen, Volume2 } from 'lucide-react';

interface StoryTheme {
  id: string;
  emoji: string;
  title: string;
  hero: string;
  teaching: string;
  storySnippet: string;
  parentTip: string;
  color: string;
  textColor: string;
}

export function StorySpinner() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string>("chouette");
  const [rotation, setRotation] = useState(0);

  const themes: StoryTheme[] = [
    {
      id: "chouette",
      emoji: "🦉",
      title: "La Chouette Somnolente",
      hero: "Plume la Chouette",
      teaching: "Transition de Coucher & Sommeil calme",
      storySnippet: "Plume la petite chouette n'arrivait pas à fermer l'œil ce soir-millénaire. Son papa s'assit sur la branche et lui dit : 'Ferme tes grands yeux d'or, et écoute le chant du vent de la forêt. Il emporte tes soucis loin d'ici.' Plume respira profondément, sentit le duvet chaud de son père, et s'endormit enfin sous le ciel étoilé.",
      parentTip: "Astuce Clinique : Le soir, l'enfant a besoin d'entendre une voix basse, lente, d'enveloppe monotone. Accompagnez son souffle en ralentissant votre propre discours au lit.",
      color: "bg-[#e3f2fd]/80",
      textColor: "text-[#2563eb]"
    },
    {
      id: "renard",
      emoji: "🦊",
      title: "Le Renard Patient",
      hero: "Rafi le Renard",
      teaching: "Gestion de Colère & Co-Régulation",
      storySnippet: "Rafi avait fait tomber sa belle tour de pommes de pin. Une vague de feu monta dans son cœur de petit renard ! Son amie la biche s'approcha prudemment : 'Rafi, souffle sur ton feu pour l'éteindre comme une bougie.' Rafi souffla fort trois fois. Le feu s'évanouit et fit place à un grand sourire.",
      parentTip: "Astuce Clinique : Ne dites pas à un enfant d'arrêter sa crise de colère. Invitez-le à souffler ensemble sur une bougie virtuelle pour calmer physiologiquement son rythme cardiaque.",
      color: "from-[#fbebeb] to-[#e05a47]/10",
      textColor: "text-[#e05a47]"
    },
    {
      id: "elephant",
      emoji: "🐘",
      title: "L'Éléphant Courageux",
      hero: "Éli l'Éléphanteau",
      teaching: "Confiance en soi & Peur du Noir",
      storySnippet: "Éli avait peur des ombres projetées sur le mur de sa grotte. Sa maman prit sa grande trompe : 'Regarde, Éli, ces monstres sont créés par la lune. Faisons danser nos ombres avec elle.' Elles rigolèrent ensemble et les monstres devinrent de joyeux compagnons gesticulant en rythme.",
      parentTip: "Astuce Clinique : Désacralisez la peur du noir par le jeu. La chasse aux ombres rigolotes dédramatise la panique nocturne chez les enfants de 2 à 10 ans.",
      color: "bg-[#fdf6e2]/80",
      textColor: "text-[#a16207]"
    },
    {
      id: "tortue",
      emoji: "🐢",
      title: "La Tortue Expressive",
      hero: "Tito la Tortue",
      teaching: "Rivalité fraternelle & Partage de l'amour",
      storySnippet: "Tito croyait que sa maman aimait plus sa petite sœur parce qu'elle passait la journée à la soigner. Sa maman s'installa tout près d'elle : 'Mon amour pour toi est comme le soleil. Ce n'est pas parce qu'il éclaire ta sœur qu'il arrête de te réchauffer.' Tito rentra sa tête et se sentit infiniment aimée.",
      parentTip: "Astuce Clinique : Rassurez l'aîné en lui accordant 10 minutes exclusives où vous êtes entièrement dévolu à lui. L'antidote à la jalousie fraternelle est le temps exclusif.",
      color: "bg-[#e8f1ec]/80",
      textColor: "text-[#1f4a38]"
    }
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    // Spin the wheel multiple full rotations + an arbitrary random offset
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const additionalDeg = 720 + (themes.indexOf(randomTheme) * 90);
    const destinationRot = rotation + additionalDeg;
    setRotation(destinationRot);

    setTimeout(() => {
      setSelectedThemeId(randomTheme.id);
      setIsSpinning(false);
    }, 1500);
  };

  const activeTheme = themes.find(t => t.id === selectedThemeId) || themes[0];

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6 relative z-10 font-friendly">
      <div className="bg-[#faf8f2]/90 backdrop-blur-xl border-2 border-[#1f4a38]/5 rounded-[3rem] p-4.5 sm:p-8 md:p-12 shadow-lg relative overflow-hidden text-center">
        
        {/* Decorative Floating shapes */}
        <div className="absolute top-10 right-10 text-xl animate-bounce">⭐</div>
        <div className="absolute bottom-8 left-8 text-xl animate-pulse">🌙</div>

        <div className="flex flex-col items-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-mint text-lead-green text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles size={11} className="text-[#ff9d00]" /> Histoires Thérapeutiques Portatives
          </span>
          <h3 className="text-2xl sm:text-3.5xl font-bold text-lead-green tracking-tight leading-tight mb-4">
            Le Moulin aux Contes Thérapeutiques 🎡
          </h3>
          <p className="text-sm font-semibold text-lead-green/75 leading-relaxed">
            Faites tourner le carrousel des contes pour générer une courte histoire de reconnexion à lire à votre précieux joyau ce soir avant d'éteindre sa lanterne !
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-center">
          
          {/* THE CAROUSEL WHEEL LEFT */}
          <div className="md:col-span-4 flex flex-col items-center justify-center relative pt-4">
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="w-56 h-56 rounded-full border-4 border-lead-green/10 bg-white relative shadow-md flex items-center justify-center text-center"
            >
              {/* Wheel sectors split lines */}
              <div className="absolute inset-x-0 h-0.5 bg-lead-green/5 top-1/2 -translate-y-1/2" />
              <div className="absolute inset-y-0 w-0.5 bg-lead-green/5 left-1/2 -translate-x-1/2" />

              {/* Individual sectoral emojis */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-3xl select-none">🦉</div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl select-none">🦊</div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl select-none">🐘</div>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl select-none">🐢</div>
            </motion.div>

            {/* Spinner absolute Pin Pointer */}
            <div className="absolute top-1 w-6 h-6 bg-coral rotate-45 border-2 border-white rounded shadow-sm z-20" />

            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="mt-8 px-6 py-3.5 bg-lead-green text-white hover:bg-[#ff9d00] font-friendly font-extrabold uppercase tracking-widest text-xs rounded-full flex items-center gap-2 cursor-pointer shadow-md border border-white/10 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCw size={14} className={isSpinning ? "animate-spin" : ""} />
              {isSpinning ? "Carrousel en vol..." : "Faire tourner la roue"}
            </button>
          </div>

          {/* GENERATED STORY CONTEXT RIGHT */}
          <div className="md:col-span-8 text-left w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTheme.id}
                initial={{ opacity: 0, x: 25, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -25, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className={`bg-white border border-lead-green/10 rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col justify-between h-full`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4 gap-4 flex-wrap">
                    <span className="text-[10px] font-bold text-coral uppercase tracking-widest bg-[#fbebeb] px-3.5 py-1 rounded-full flex items-center gap-1">
                      <BookOpen size={11} /> {activeTheme.teaching}
                    </span>
                    <span className="text-2xl select-none">{activeTheme.emoji}</span>
                  </div>

                  <h4 className="text-xl font-bold text-lead-green mb-3">
                    L'Histoire de {activeTheme.hero}
                  </h4>

                  <p className="text-xs sm:text-sm font-semibold text-lead-green/75 italic leading-relaxed bg-[#faf8f2] border-l-4 border-[#ff9d00] p-4.5 rounded-r-2xl mb-6">
                    "{activeTheme.storySnippet}"
                  </p>
                </div>

                {/* Parent tip block */}
                <div className="bg-mint/45 border border-lead-green/5 p-4 rounded-xl flex items-start gap-3">
                  <Heart size={16} className="text-coral shrink-0 mt-0.5 fill-current animate-pulse" />
                  <p className="text-xs font-semibold text-lead-green/80 leading-relaxed">
                    <strong>{activeTheme.parentTip.split(":")[0]} :</strong>
                    {activeTheme.parentTip.split(":")[1]}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 mt-5 text-[10px] font-bold uppercase tracking-wider text-lead-green/45 font-mono">
                  <Volume2 size={12} className="text-lead-green/30" /> Astuce de narration de Lina NGUERELESSIO
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
