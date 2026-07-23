import { useEffect, useState } from 'react';
import { Download, Flame, Eye, X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

export function PracticalTools() {
  const [tools, setTools] = useState<PdfTool[]>([]);
  const [viewing, setViewing] = useState<PdfTool | null>(null);

  useEffect(() => {
    publicApi.resources().then(data => setTools(data as unknown as PdfTool[]));
  }, []);

  if (tools.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-[2.5rem] border border-dashed border-lead-green/15 max-w-xl mx-auto p-8">
        <p className="text-3xl mb-3">📄</p>
        <p className="text-sm text-lead-green/60 font-friendly font-semibold">Les fiches et guides pratiques seront bientôt disponibles ici.</p>
      </div>
    );
  }

  return (
    <section id="outils" className="py-8 max-w-[90rem] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-4 flex items-center gap-1.5 font-friendly">
            <Flame size={12} className="fill-current text-highlight" />
            OUTILS COIN DES PARENTS
          </span>
          <h2 className="text-4xl md:text-6xl font-friendly font-bold tracking-tight text-lead-green leading-[1.05]">
             Des boîtes à outils <br className="hidden md:block" />
             pratiques à <span className="text-[#ff9d00] underline decoration-wavy deco-[#e05a47]">consulter</span> !
          </h2>
          <p className="mt-4 text-base md:text-lg text-lead-green/70 font-medium font-friendly">
             Consultez ou téléchargez gratuitement nos guides et kits illustrés pour vous accompagner au quotidien.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`border rounded-[2.5rem] p-5 flex flex-col justify-between group hover:shadow-xl transition-all duration-300 bg-white ${tool.color}`}
          >
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 bg-mint">
              {tool.img && (
                <img src={tool.img} alt={tool.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              )}
              {tool.badge && (
                <div className="absolute top-4 left-4 bg-white/95 px-3.5 py-1.5 rounded-full border border-lead-green/5 text-[10px] uppercase font-bold text-lead-green tracking-wide shadow-sm font-friendly flex items-center gap-1">
                  {tool.badge}
                </div>
              )}
            </div>

            <div className="flex-grow flex flex-col px-3">
              <span className={`text-[10px] font-bold tracking-[0.15em] uppercase mb-2 ${tool.accent}`}>{tool.type}</span>
              <h3 className="text-xl md:text-2xl font-friendly font-bold text-lead-green mb-3 group-hover:text-coral transition-colors">{tool.title}</h3>
              <p className="text-sm font-friendly font-medium text-lead-green/70 leading-relaxed mb-8 flex-grow">{tool.desc}</p>

              <div className="border-t border-lead-green/5 pt-5 flex items-center justify-between mt-auto gap-2">
                {tool.file_url ? (
                  <>
                    <button
                      onClick={() => setViewing(tool)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-lead-green text-white text-[11px] font-bold uppercase tracking-wider hover:bg-highlight transition-colors shadow-sm cursor-pointer font-friendly"
                    >
                      <Eye size={13} /> Consulter
                    </button>
                    <a
                      href={tool.file_url} download target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 shrink-0 rounded-xl bg-mint text-lead-green flex items-center justify-center hover:bg-lead-green hover:text-white transition-colors shadow-sm"
                      title="Télécharger"
                    >
                      <Download size={16} />
                    </a>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-lead-green/40 font-friendly">
                    <Clock size={13} /> Bientôt disponible
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* In-site PDF viewer */}
      <AnimatePresence>
        {viewing && viewing.file_url && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setViewing(null)}
            className="fixed inset-0 bg-[#121b16]/85 backdrop-blur-md z-99 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-5 py-3 border-b border-lead-green/10 bg-[#faf8f2]">
                <h4 className="text-sm font-bold text-lead-green font-friendly truncate pr-4">{viewing.title}</h4>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={viewing.file_url} download target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lead-green text-white text-[11px] font-bold uppercase hover:bg-highlight transition-colors"
                  >
                    <Download size={12} /> Télécharger
                  </a>
                  <button onClick={() => setViewing(null)} className="w-8 h-8 rounded-lg hover:bg-lead-green/10 flex items-center justify-center text-lead-green transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>
              <iframe src={viewing.file_url} title={viewing.title} className="flex-1 w-full bg-gray-100" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
