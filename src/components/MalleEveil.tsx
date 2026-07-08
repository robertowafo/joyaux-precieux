import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, HelpCircle } from 'lucide-react';

interface ChildhoodToy {
  id: string;
  name: string;
  icon: string;
  description: string;
  age: string;
  psychTip: string;
  skills: string[];
  color: string;
  borderColor: string;
}

export function MalleEveil() {
  const [selectedToyId, setSelectedToyId] = useState<string | null>(null);

  const toys: ChildhoodToy[] = [
    {
      id: "doudou",
      name: "Le Doudou Transitoire",
      icon: "🧸",
      age: "6 mois à 5 ans",
      description: "Objet fétiche de réconfort servant de pont émotionnel sécurisant entre le foyer et l'extérieur.",
      psychTip: "Clinique : Ne lavez pas le doudou de force ! Son odeur est un repère olfactif sacré qui co-régule l'amygdale cérébrale de l'enfant lors des séparations ou de l'endormissement.",
      skills: ["Sécurité affective", "Gestion d'angoisse", "Autonomie"],
      color: "bg-[#fdf6e2]/80",
      borderColor: "border-[#ff9d00]/30"
    },
    {
      id: "crayons",
      name: "Les Crayons Gribouilleurs",
      icon: "🎨",
      age: "2 ans à 10 ans",
      description: "L'art-thérapie naturelle : premier canal d'extériorisation des colères et émotions refoulées.",
      psychTip: "Clinique : Observez la pression du trait ! Un enfant qui trace violemment des spirales sombres exprime une surcharge sensorielle. Invitez-le simplement à dessiner sa colère.",
      skills: ["Motricité fine", "Expression émotionnelle", "Créativité"],
      color: "bg-[#fbebeb]/80",
      borderColor: "border-[#e05a47]/30"
    },
    {
      id: "livre",
      name: "L'Album Illustré",
      icon: "📚",
      age: "Dès la naissance",
      description: "Le médium suprême de reconnexion parent-enfant où la voix sert d'enveloppe sonore sécurisante.",
      psychTip: "Clinique : L'important n'est pas de lire le texte exact, mais de pointer les émotions des personnages ('Oh, regarde, le petit ours a peur !'). Cela muscle l'empathie naturelle.",
      skills: ["Langage & Vocabulaire", "Empathie cognitive", "Attention visuelle"],
      color: "bg-[#e8f1ec]/80",
      borderColor: "border-[#1f4a38]/30"
    },
    {
      id: "blocks",
      name: "Les Cubes de Bois",
      icon: "🧩",
      age: "18 mois à 8 ans",
      description: "Empiler, ajuster, et surtout... faire s'écrouler pour intégrer le concept de résilience matérielle.",
      psychTip: "Clinique : Faire tomber la tour apprend à l'enfant que la destruction n'est pas définitive. Reconstruire ensemble guérit durablement la peur inconsciente de l'échec.",
      skills: ["Logique spatiale", "Persévérance", "Rapport de cause à effet"],
      color: "bg-[#e3f2fd]/80",
      borderColor: "border-[#2563eb]/20"
    }
  ];

  const activeToy = toys.find(t => t.id === selectedToyId);

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6 relative z-10 font-friendly">
      <div className="bg-[#faf8f2]/90 backdrop-blur-xl border-2 border-[#1f4a38]/5 rounded-[3rem] p-4.5 sm:p-8 md:p-12 shadow-lg relative overflow-hidden">
        
        {/* Playful Floating Circles */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-mint/50 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#ff9d00]/15 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-mint text-lead-green text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles size={11} className="text-[#ff9d00]" /> L'enfance heureuse
          </span>
          <h3 className="text-2xl sm:text-3.5xl font-bold text-lead-green tracking-tight leading-tight mb-4">
            La Malle aux Trésors de l'Éveil 🧸
          </h3>
          <p className="text-sm font-semibold text-lead-green/75 leading-relaxed">
            Cliquez sur un compagnon de jeu de l'enfance pour ouvrir la malle clinique et explorer son impact thérapeutique sur le développement affectif de votre joyau.
          </p>
        </div>

        {/* Toys Grid Chest */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {toys.map((toy) => {
            const isSelected = toy.id === selectedToyId;
            return (
              <motion.button
                key={toy.id}
                onClick={() => setSelectedToyId(toy.id)}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  boxShadow: isSelected 
                    ? "0 20px 25px -5px rgba(224, 90, 71, 0.15)" 
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.03)"
                }}
                className={`p-6 rounded-[2.2rem] border-2 text-center cursor-pointer transition-all flex flex-col items-center justify-between h-56 relative overflow-hidden ${toy.color} ${isSelected ? 'border-coral ring-2 ring-coral/20 bg-white' : toy.borderColor}`}
              >
                {/* Floating shine if selected */}
                {isSelected && (
                  <motion.div 
                    layoutId="toyShine"
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                )}

                <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-4xl shadow-xs transition-transform duration-300 group-hover:scale-110 mb-3">
                  <span className="select-none animate-bounce" style={{ animationDuration: '3s' }}>{toy.icon}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-lead-green leading-snug">{toy.name}</h4>
                  <p className="text-[10px] font-mono text-lead-green/50 mt-1">{toy.age}</p>
                </div>

                <div className="mt-3">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${isSelected ? 'bg-coral text-white' : 'bg-white/80 text-lead-green/70'}`}>
                    {isSelected ? 'Malle ouverte !' : 'Explorer'}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Toy Analysis Panel */}
        <AnimatePresence mode="wait">
          {activeToy ? (
            <motion.div
              key={activeToy.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              className="bg-white rounded-[2.5rem] border border-lead-green/10 p-6 md:p-10 shadow-sm text-left flex flex-col md:flex-row items-start gap-8"
            >
              {/* Left Big Icon Badge */}
              <div className="w-20 h-20 shrink-0 rounded-[2rem] bg-mint/50 border border-lead-green/10 flex items-center justify-center text-5xl">
                {activeToy.icon}
              </div>

              {/* Central Details Column */}
              <div className="flex-1 font-friendly">
                <div className="flex flex-wrap gap-2 mb-3">
                  {activeToy.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-[#fdf6e2] text-xs font-bold text-[#a16207]">
                      🎯 {skill}
                    </span>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-lead-green mb-2">
                  {activeToy.name} <span className="text-xs font-mono text-lead-green/45 ml-2">({activeToy.age})</span>
                </h4>
                
                <p className="text-sm font-medium text-lead-green/80 mb-5 leading-relaxed">
                  {activeToy.description}
                </p>

                {/* Clinical Tip Highlight Bubble */}
                <div className="bg-[#f2efe4] border-l-4 border-coral rounded-r-2xl p-5 text-sm font-medium text-lead-green leading-relaxed flex items-start gap-3">
                  <Heart size={16} className="text-coral shrink-0 mt-0.5 fill-current animate-pulse" />
                  <span>
                    <strong>{activeToy.psychTip.split(":")[0]} :</strong>
                    {activeToy.psychTip.split(":")[1]}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="py-6 text-center text-xs font-semibold text-lead-green/50 italic flex items-center justify-center gap-1.5"
            >
              <HelpCircle size={14} className="text-[#ff9d00]" /> Sélectionnez un trésor ci-dessus pour découvrir ses bienfaits psycho-affectifs.
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
