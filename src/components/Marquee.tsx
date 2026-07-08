import { motion } from 'motion/react';

export function Marquee() {
  const words = [
    "JOYAUX PRÉCIEUX",
    "PSYCHOLOGIE DU DÉVELOPPEMENT",
    "ÉCOUTE ACTIVE",
    "GUIDANCE PARENTALE",
    "STANDARD DIVIN",
    "HARMONIE DU FOYER",
    "RÉVOLUTION ÉMOTIONNELLE",
    "SAGESSE & AMOUR"
  ];

  return (
    <div className="py-14 md:py-20 border-y border-lead-green/10 overflow-hidden flex items-center w-full bg-[#fdfaf2]">
      <motion.div
        animate={{ x: [0, -1800] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 32,
        }}
        className="flex whitespace-nowrap items-center"
      >
        {[...words, ...words, ...words, ...words].map((word, idx) => (
          <span 
            key={idx} 
            className="text-4xl md:text-5xl lg:text-6xl font-friendly font-bold tracking-tight uppercase px-10 shrink-0 flex items-center gap-10 text-lead-green"
          >
            {word}
            {idx % 2 === 0 ? (
              <span className="text-3xl shrink-0">🌱</span>
            ) : (
              <span className="text-3xl shrink-0">☀️</span>
            )}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
