import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Music, SkipForward, SkipBack, Sparkles, Heart } from 'lucide-react';

export function AudioCapsules() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(38); // initial starting look
  const [currentTime, setCurrentTime] = useState('01:31');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const capsules = [
    {
      title: "Désamorcer une crise de colère en public",
      duration: "04:00",
      durationSec: 240,
      speaker: "Lina NGUERELESSIO",
      desc: "Des repères psycho-éducatifs immédiats pour calmer le débordement émotionnel sans utiliser la violence ou les cris devant les regards extérieurs.",
      bgColor: "bg-mint",
      accent: "text-lead-green",
      badge: "👶 Petite Enfance • 4 min"
    },
    {
      title: "Mon ado s'isole : comment réagir sans braquer ?",
      duration: "05:00",
      durationSec: 300,
      speaker: "Lina NGUERELESSIO",
      desc: "Comprendre les frontières de l'intimité d'un adolescent et recréer un espace d'écoute sain et serein au sein de la maison.",
      bgColor: "bg-yellow-bg",
      accent: "text-[#ff9d00]",
      badge: "🧑 Adolescence • 5 min"
    },
    {
      title: "Mettre en place des limites saines sans crier",
      duration: "03:30",
      durationSec: 210,
      speaker: "Lina NGUERELESSIO",
      desc: "Comment asseoir une autorité bienveillante et ferme en transmettant de l'assurance et la paix à vos enfants.",
      bgColor: "bg-[#fbebeb]",
      accent: "text-coral",
      badge: "👪 Guidance • 3 min 30"
    },
    {
      title: "Éveiller l'intelligence émotionnelle par le jeu quotidien",
      duration: "03:15",
      durationSec: 195,
      speaker: "Lina NGUERELESSIO",
      desc: "Trois petits exercices ludiques et concrets à insérer dans le quotidien pour apprendre à votre enfant à accueillir et apprivoiser ses émotions.",
      bgColor: "bg-mint",
      accent: "text-lead-green",
      badge: "👶 Éveil & Jeux • 3 min 15"
    },
    {
      title: "La bénédiction du soir : cultiver la paix avant la nuit",
      duration: "04:00",
      durationSec: 240,
      speaker: "Lina NGUERELESSIO",
      desc: "Un accompagnement spirituel doux pour libérer les craintes de l'enfant et ancrer la confiance divine au moment du dodo.",
      bgColor: "bg-yellow-bg",
      accent: "text-[#ff9d00]",
      badge: "🙏 Foi & Foyer • 4 min"
    }
  ];

  // Simulated audio playback advancement
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          const nextVal = prev + 1;
          
          // Compute minute and second representations
          const currentTotalSec = Math.round((nextVal / 100) * capsules[currentIdx].durationSec);
          const mins = Math.floor(currentTotalSec / 60);
          const secs = currentTotalSec % 60;
          setCurrentTime(
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
          );

          return nextVal;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentIdx]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCapsuleSelect = (idx: number) => {
    setCurrentIdx(idx);
    setProgress(0);
    setCurrentTime('00:00');
    setIsPlaying(true);
  };

  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % capsules.length;
    handleCapsuleSelect(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIdx - 1 + capsules.length) % capsules.length;
    handleCapsuleSelect(prevIdx);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    setProgress(newVal);
    const secs = Math.round((newVal / 100) * capsules[currentIdx].durationSec);
    const mins = Math.floor(secs / 60);
    const textSecs = secs % 60;
    setCurrentTime(`${mins.toString().padStart(2, '0')}:${textSecs.toString().padStart(2, '0')}`);
  };

  return (
    <section id="audio" className="py-24 md:py-36 px-6 lg:px-12 max-w-[90rem] mx-auto border-t border-lead-green/10 bg-bg">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left description column */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-4 flex items-center gap-1.5 font-friendly">
            <Volume2 size={12} className="text-coral" />
            Les Minutes Précieuses
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-friendly font-bold tracking-tight text-lead-green leading-[1.05] mb-6">
            Des capsules audio <br />
            pour les <span className="text-coral underline decoration-[#ff9d00] decoration-wavy">parents pressés</span> !
          </h2>
          
          <p className="text-base md:text-lg text-lead-green/80 font-medium font-friendly leading-relaxed mb-8 max-w-xl">
            La majorité des parents manquent de temps pour lire d'épais manuels d'éducation. Ces courtes capsules audio de 3 à 5 minutes vous fournissent des repères rapides, portatifs et rassurants à écouter en voiture, en cuisinant ou en fin de soirée.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-md">
             {capsules.map((cap, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCapsuleSelect(idx)}
                  className={`p-4.5 rounded-2.5xl border text-left font-friendly transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    currentIdx === idx 
                      ? 'bg-white border-[#ff9d00] shadow-md scale-[1.01]' 
                      : 'bg-white/60 border-lead-green/5 hover:border-lead-green/20 hover:bg-white'
                  }`}
                >
                   <div className="flex gap-4.5 items-center">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg ${
                        currentIdx === idx ? 'bg-coral text-white' : 'bg-mint text-lead-green'
                      }`}>
                         {idx === 0 ? '🎙️' : idx === 1 ? '📻' : '📢'}
                      </div>
                      <div>
                         <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-0.5">
                            Capsule #{idx + 1}
                         </span>
                         <h4 className="font-bold text-sm md:text-base text-lead-green tracking-tight leading-tight">
                            {cap.title}
                         </h4>
                      </div>
                   </div>
                   <span className="text-xs font-bold text-lead-green/50 font-mono shrink-0 ml-4">
                      {cap.duration}
                   </span>
                </button>
             ))}
          </div>
        </div>

        {/* Right Integrated Player with Glassmorphic design */}
        <div className="w-full lg:w-1/2 flex justify-center items-center py-6">
          <div className="w-full max-w-sm md:max-w-md bg-white border border-lead-green/5 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col items-center">
             
             {/* Beautiful animated vinyl or visualizer graphic */}
             <div className="absolute top-0 left-0 w-32 h-32 bg-[#ff9d00]/5 rounded-full filter blur-3xl"></div>
             
             <span className="text-[10px] font-bold tracking-widest text-[#e05a47] uppercase mb-8 font-friendly bg-[#faf2f0] px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#ff9d00]" /> LECTEUR DE PODCASTS PRECIEUX
             </span>

             {/* Vinyl record spinning when active playing */}
             <div className="relative w-44 h-44 mb-8">
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-full rounded-full bg-[#121b16] border-4 border-[#ff9d00]/20 flex items-center justify-center shadow-2xl relative"
                >
                   {/* Vinyl ridges pattern */}
                   <div className="absolute inset-4 rounded-full border border-white/5"></div>
                   <div className="absolute inset-8 rounded-full border border-white/5"></div>
                   <div className="absolute inset-12 rounded-full border border-white/5"></div>
                   
                   {/* Centered photo */}
                   <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#ff9d00] bg-[#1f4a38] flex items-center justify-center">
                      <img 
                        src="/images/hero_5_psychologist.jpg" 
                        alt="Lina NGUERELESSIO Lecture"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                   </div>

                   {/* Micro-glowing dot indicator */}
                   <span className="absolute top-2 right-12 w-2.5 h-2.5 rounded-full bg-[#ff9d00] animate-ping"></span>
                </motion.div>
                
                {/* Tone arm */}
                <div className={`absolute top-[-10px] right-2 w-14 h-20 origin-top-right transition-transform duration-700 pointer-events-none ${
                   isPlaying ? 'rotate-[18deg]' : 'rotate-[-5deg]'
                }`}>
                   <svg viewBox="0 0 40 80" className="w-full h-full stroke-lead-green fill-none stroke-[2]">
                      <path d="M 35,5 C 35,5 30,35 15,45 M 15,45 L 8,55 C 8,55 5,55 6,58" strokeLinecap="round"/>
                   </svg>
                </div>
             </div>

             {/* Dynamic Kid-Friendly Soundwave Visualizer */}
             <div className="flex justify-center items-end gap-1.5 h-12 my-6">
               {Array.from({ length: 12 }).map((_, waveIdx) => (
                 <div
                   key={waveIdx}
                   className={`w-1.5 rounded-full transition-all duration-300 ${
                     waveIdx % 3 === 0 ? 'bg-coral' : waveIdx % 2 === 0 ? 'bg-[#ff9d00]' : 'bg-lead-green'
                   }`}
                   style={{
                     height: isPlaying ? '36px' : '6px',
                     animation: isPlaying ? 'bounceWave 0.5s infinite alternate ease-in-out' : 'none',
                     animationDelay: isPlaying ? `${waveIdx * 0.06}s` : '0s',
                     transformOrigin: 'bottom'
                   }}
                 />
               ))}
             </div>

             {/* Capsule Playing Info */}
             <div className="text-center font-friendly px-4">
                <span className="text-[11px] font-bold text-coral/85 uppercase tracking-wider block mb-1">
                   {capsules[currentIdx].badge}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-lead-green leading-snug line-clamp-1">
                   {capsules[currentIdx].title}
                </h3>
                <span className="text-xs font-semibold text-lead-green/50 tracking-wider block mt-1">
                   Par {capsules[currentIdx].speaker}
                </span>
                <p className="text-xs text-lead-green/70 font-semibold leading-normal mt-3 max-w-[280px] mx-auto opacity-80 h-12 overflow-hidden italic">
                   "{capsules[currentIdx].desc}"
                </p>
             </div>

             {/* Sound Progress tracker */}
             <div className="w-full mt-6 px-1 flex flex-col gap-1">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={progress}
                  onChange={handleProgressChange}
                  className="w-full h-1.5 bg-lead-green/10 rounded-lg appearance-none cursor-pointer accent-[#ff9d00]"
                />
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-lead-green/55">
                   <span>{currentTime}</span>
                   <span>{capsules[currentIdx].duration}</span>
                </div>
             </div>

             {/* Playback action controls bar */}
             <div className="flex items-center gap-7 mt-6">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-lead-green/5 bg-bg hover:bg-lead-green hover:text-white flex items-center justify-center transition-all cursor-pointer text-lead-green text-sm shadow-sm"
                >
                   <SkipBack size={14} className="fill-current" />
                </button>

                <button 
                  onClick={handlePlayPause}
                  className="w-16 h-16 rounded-full bg-[#e05a47] text-white flex items-center justify-center hover:bg-lead-green hover:scale-105 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                   {isPlaying ? (
                     <Pause size={24} className="fill-current text-white ml-0" />
                   ) : (
                     <Play size={24} className="fill-current text-white ml-1" />
                   )}
                </button>

                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-lead-green/5 bg-bg hover:bg-lead-green hover:text-white flex items-center justify-center transition-all cursor-pointer text-lead-green text-sm shadow-sm"
                >
                   <SkipForward size={14} className="fill-current" />
                </button>
             </div>

          </div>
        </div>

      </div>
    </section>
  );
}
