import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment se déroule la première séance d'écoute active ?",
      answer: "La première prise de contact est gratuite et dure environ 15 minutes par appel ou message WhatsApp. C'est un moment convivial où vous m'exposez brièvement les blocages émotionnels ou de communication de votre foyer. Nous convenons ensuite d'une feuille de route pour de futures séances de guidance personnalisées."
    },
    {
      question: "Les séances d'accompagnement peuvent-elles se dérouler en visioconférence ?",
      answer: "Tout à fait ! Pour faciliter l'organisation des parents pressés et dépasser les frontières régionales, la quasi-totalité de mes guidances ont lieu en visioconférence (Google Meet, Zoom) ou par appel vocal de haute qualité, offrant une flexibilité totale."
    },
    {
      question: "Quelle est la différence entre l'accompagnement psycho-éducatif et une thérapie classique ?",
      answer: "Alors qu'une thérapie classique explore en profondeur le passé, l'accompagnement psycho-éducatif (ou guidance parentale) est orienté solution, action et immédiateté. Nous mettons en place des protocoles concrets à appliquer à la maison : cadres d'écrans, tables d'émotions, rituels de coucher, de façon pragmatique."
    },
    {
      question: "Comment intégrez-vous précisément la foi dans vos séances de guidance ?",
      answer: "La foi chrétienne forme le socle spirituel de ma vision de l'harmonie familiale. J'associe ainsi les vérités éternelles des Écritures (amour, écoute mutuelle, autorité pleine de grâce) aux découvertes éprouvées de la Psychologie du Développement moderne. Toutefois, mes espaces d'écoute accueillent tout le monde sans aucun esprit de jugement ni d'obligation doctrinale."
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-36 px-6 lg:px-12 max-w-[90rem] mx-auto border-t border-lead-green/10 bg-bg">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start font-friendly">
        
        {/* Left header portion */}
        <div className="lg:w-1/3 flex flex-col items-start text-left lg:sticky lg:top-32">
          <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-4 flex items-center gap-1.5">
            <HelpCircle size={12} className="text-coral" />
            FAQ Interactive
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-lead-green leading-[1.05] mb-6">
            Vos questions <br />
            <span className="text-[#ff9d00] underline decoration-[#e05a47] decoration-wavy">fréquentes</span>
          </h2>
          
          <p className="text-sm md:text-base text-lead-green/70 font-medium leading-relaxed max-w-sm mb-6">
            Voici les réponses simples aux interrogations les plus courantes afin de lever vos derniers doutes logistiques ou cliniques avant notre prise de contact.
          </p>
          
          <a
            href="#contact"
            className="px-6 py-3.5 bg-[#e05a47] hover:bg-lead-green text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors font-sans"
          >
             Poser une autre question
          </a>
        </div>

        {/* Right Accordion Portion */}
        <div className="lg:w-2/3 w-full flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-3xl p-6 transition-all duration-300 ${
                  isOpen 
                    ? 'bg-white border-[#ff9d00]/30 shadow-md' 
                    : 'bg-white/60 border-lead-green/5 hover:border-lead-green/15 hover:bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left font-bold text-base md:text-lg text-lead-green tracking-tight transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="pr-4 leading-snug">{faq.question}</span>
                  <span className={`w-8 h-8 rounded-full bg-bg border border-lead-green/5 flex items-center justify-center shrink-0 transition-transform duration-300 text-lead-green ${
                    isOpen ? 'rotate-180 bg-mint' : ''
                  }`}>
                    <ChevronDown size={14} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 pt-4 border-t border-lead-green/5 text-xs md:text-sm font-semibold text-lead-green/80 leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
