import { motion } from 'motion/react';
import { BookOpen, Calendar, ArrowUpRight } from 'lucide-react';

export function ArticlesSection() {
  const articles = [
    {
      title: "Mettre en place des routines sécurisantes de retour à la maison",
      desc: "L'importance des rituels de transition psychologiques pour abaisser le niveau de vigilance et d'anxiété de l'enfant de retour chez lui après sa journée scolaire.",
      tag: "Psychologie",
      date: "25 Mai 2026",
      readTime: "4 min de lecture",
      img: "/images/article_1_mother_speaking.jpg"
    },
    {
      title: "Gérer la rivalité fraternelle et la jalousie au quotidien",
      desc: "Des outils de guidance bienveillante inspirés des neurosciences affectives pour pacifier les débordements relationnels entre frères et sœurs.",
      tag: "Parentalité",
      date: "18 Mai 2026",
      readTime: "5 min de lecture",
      img: "/images/article_2_wooden_toys.jpg"
    },
    {
      title: "Mon adolescent s’isole : comprendre son repli et rebâtir le lien verbal",
      desc: "Dans un monde hyperconnected aux écrans mais de plus en plus isolé verbalement, comment appréhender cliniquement le retrait d'un ado, instaurer des sas d'écoute mutuelle sans forcer le passage, et l'accompagner vers son identité profonde.",
      tag: "Adolescents & Foi",
      date: "10 Mai 2026",
      readTime: "8 min de lecture",
      img: "/images/article_3_father_teenager.jpg"
    }
  ];

  return (
    <section id="articles" className="py-24 md:py-36 px-6 lg:px-12 max-w-[90rem] mx-auto border-t border-lead-green/10 bg-bg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl text-left">
          <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-4 flex items-center gap-1.5 font-friendly">
            <BookOpen size={12} className="text-coral" />
            Lectures & Conseils
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-friendly font-bold tracking-tight text-lead-green leading-[1.05]">
            Réflexions <br className="hidden md:block" /> 
            & <span className="text-[#ff9d00] underline decoration-wavy decoration-coral">Études Cliniques</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-lead-green/70 font-medium font-friendly font-semibold">
            Explorez nos analyses d'accompagnement psycho-éducatifs rédigées avec bienveillance pour le bien de vos joyaux précieux.
          </p>
        </div>
        
        <button 
          onClick={() => alert("Tous nos articles thématiques seront mis en ligne très bientôt ! Restez abonnés à la newsletter.")}
          className="px-6 py-3.5 bg-lead-green text-white text-[11px] font-bold tracking-[0.15em] hover:bg-highlight uppercase transition-all duration-300 rounded-full font-friendly select-none shadow-sm cursor-pointer"
        >
           Découvrir tous les articles
        </button>
      </div>

      {/* Asymmetric Masonry layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-friendly">
        
        {/* Two vertical ones side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:col-span-2">
          {articles.slice(0, 2).map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-lead-green/5 shadow-sm hover:shadow-xl transition-all duration-400 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-mint w-full">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-[#ff9d00] text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                   {item.tag}
                </span>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-lead-green/60 mb-3">
                     <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                     <span>•</span>
                     <span>{item.readTime}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-lead-green mb-3 group-hover:text-coral transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-lead-green/70 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="border-t border-lead-green/10 mt-6 pt-5 flex items-center gap-2 text-[#e05a47] font-bold text-xs uppercase tracking-widest group-hover:translate-x-1.5 transition-transform">
                   Lire l'étude <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Third grand horizontal full-width article to rhythm the view */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] overflow-hidden border border-lead-green/5 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col md:flex-row"
        >
          <div className="md:w-1/2 relative aspect-[16/10] md:aspect-auto min-h-[240px] md:min-h-[380px] bg-mint shrink-0">
             <img 
               src={articles[2].img} 
               alt={articles[2].title} 
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
               referrerPolicy="no-referrer"
             />
             <span className="absolute top-6 left-6 bg-coral text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md">
                {articles[2].tag}
             </span>
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
             <div>
                <div className="flex items-center gap-4 text-xs font-semibold text-lead-green/60 mb-4">
                   <span className="flex items-center gap-1"><Calendar size={12} /> {articles[2].date}</span>
                   <span>•</span>
                   <span>{articles[2].readTime}</span>
                   <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase text-[9px] tracking-wider font-sans">À la une</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-lead-green mb-4 leading-tight group-hover:text-coral transition-colors">
                  {articles[2].title}
                </h3>
                
                <p className="text-sm md:text-base font-medium text-lead-green/75 leading-relaxed mb-6">
                  {articles[2].desc}
                </p>
             </div>

             <div className="border-t border-lead-green/10 pt-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-lead-green/50">Lina NGUERELESSIO • Psychologue du Développement (stg)</span>
                <div className="flex items-center gap-2 text-[#e05a47] font-bold text-xs uppercase tracking-widest group-hover:translate-x-1.5 transition-transform">
                   Lire le dossier <ArrowUpRight size={14} />
                </div>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
