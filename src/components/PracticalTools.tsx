import { useEffect, useState } from 'react';
import { Download, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { publicApi } from '../lib/publicApi';

interface PdfTool {
  id: number;
  title: string;
  desc: string;
  type: string;
  color: string;
  accent: string;
  badge: string;
  img: string;
  file_url: string;
}

const STATIC_TOOLS: PdfTool[] = [
  { id: 1, title: "La Boussole des Émotions", desc: "Une fiche psycho-éducative basée sur les Psaumes pour aider l'enfant à nommer sa colère, sa tristesse et sa joie devant Dieu.", type: "📥 KIT PDF À IMPRIMER", color: "bg-mint border-lead-green/10", accent: "text-lead-green", badge: "🌱 Psychologie de l'enfant", img: "/images/resource_2_emotion_journal.jpg", file_url: "" },
  { id: 2, title: "Planning de Vacances Utiles", desc: "7 jours de routines équilibrées alliant sport, repos, ateliers de créativité et rendez-vous spirituels bénis.", type: "📥 GUIDE PRATIQUE", color: "bg-yellow-bg border-highlight/10", accent: "text-[#ff9d00]", badge: "🗓️ Routine & Camps", img: "/images/resource_1_guide_pdf.jpg", file_url: "" },
  { id: 3, title: "Le Code de Grâce & Vérité", desc: "Un protocole en 3 étapes clefs pour résoudre les disputes entre frères et sœurs selon les enseignements d'Éphésiens 4.", type: "📥 FICHE DE DISCIPLINE", color: "bg-[#fbebeb] border-coral/10", accent: "text-coral", badge: "🙏 Conseils Bibliques", img: "/images/resource_3_discipline_cards.jpg", file_url: "" },
];

export function PracticalTools() {
  const [tools, setTools] = useState<PdfTool[]>(STATIC_TOOLS);

  useEffect(() => {
    publicApi.resources().then(data => {
      if (data.length > 0) setTools(data as unknown as PdfTool[]);
    });
  }, []);

  return (
    <section id="outils" className="py-24 md:py-36 px-6 lg:px-12 max-w-[90rem] mx-auto bg-bg border-t border-lead-green/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-4 flex items-center gap-1.5 font-friendly">
            <Flame size={12} className="fill-current text-highlight" />
            OUTILS COIN DES PARENTS
          </span>
          <h2 className="text-4xl md:text-6xl font-friendly font-bold tracking-tight text-lead-green leading-[1.05]">
             Des boîtes à outils <br className="hidden md:block" /> 
             pratiques à <span className="text-[#ff9d00] underline decoration-wavy deco-[#e05a47]">télécharger</span> !
          </h2>
          <p className="mt-4 text-base md:text-lg text-lead-green/70 font-medium font-friendly">
             Passez de la théorie de l'éducation à des moments bénis au quotidien grâce à nos guides et kits illustrés gratuits.
          </p>
        </div>
        
        <button className="px-8 py-4.5 bg-lead-green text-white text-[11px] font-bold tracking-[0.15em] hover:bg-highlight uppercase transition-colors rounded-full font-friendly select-none shadow-md">
           Voir tous les outils
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`border rounded-[2.5rem] p-5 flex flex-col justify-between group cursor-pointer hover:shadow-xl transition-all duration-300 bg-white ${tool.color}`}
          >
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 bg-mint">
              <img 
                src={tool.img} 
                alt={tool.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/95 px-3.5 py-1.5 rounded-full border border-lead-green/5 text-[10px] uppercase font-bold text-lead-green tracking-wide shadow-sm font-friendly flex items-center gap-1">
                 {tool.badge}
              </div>
            </div>

            <div className="flex-grow flex flex-col px-3">
              <span className={`text-[10px] font-bold tracking-[0.15em] uppercase mb-2 ${tool.accent}`}>
                {tool.type}
              </span>
              
              <h3 className="text-xl md:text-2xl font-friendly font-bold text-lead-green mb-3 group-hover:text-coral transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-sm font-friendly font-medium text-lead-green/70 leading-relaxed mb-8 flex-grow">
                {tool.desc}
              </p>

              <div className="border-t border-lead-green/5 pt-5 flex items-center justify-between mt-auto">
                 <span className="text-xs font-bold text-lead-green/60 font-friendly">Prend 2 min • PDF Gratuit</span>
                 {tool.file_url ? (
                   <a href={tool.file_url} download target="_blank" rel="noopener noreferrer"
                     className="w-10 h-10 rounded-full bg-lead-green text-white flex items-center justify-center group-hover:bg-highlight transition-colors shadow-sm">
                     <Download size={16} />
                   </a>
                 ) : (
                   <div className="w-10 h-10 rounded-full bg-lead-green/30 text-white flex items-center justify-center shadow-sm">
                     <Download size={16} />
                   </div>
                 )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
