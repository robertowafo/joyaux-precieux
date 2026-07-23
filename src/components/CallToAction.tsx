import { useEffect, useState } from 'react';
import { Heart, Star, Sparkles, MessageCircle, ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { publicApi } from '../lib/publicApi';

interface Testimonial {
  text: string;
  author: string;
  role: string;
  rating: number;
  img: string;
}

export function CallToAction() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    publicApi.testimonials().then(data => {
      setTestimonials(data as unknown as Testimonial[]);
    });
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterError('Merci de saisir une adresse email valide.');
      return;
    }
    setNewsletterStatus('loading');
    try {
      const result = await publicApi.subscribe(newsletterEmail, '', 'homepage');
      if (result.error) {
        setNewsletterStatus('error');
        setNewsletterError(result.error);
      } else {
        setNewsletterStatus('success');
      }
    } catch {
      setNewsletterStatus('error');
      setNewsletterError('Erreur réseau, veuillez réessayer.');
    }
  };

  const stats = [
    { title: "Familles Accompagnées", count: "25+", icon: "🤝" },
    { title: "Ans d'Écoute Active", count: "05", icon: "📚" },
    { title: "Satisfaction Parentale", count: "98%", icon: "💝" },
    { title: "Heures de Guidance", count: "240+", icon: "⏱️" }
  ];

  const nextTestimonial = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="temoignages" className="py-24 md:py-36 px-6 lg:px-12 bg-[#fffdf9] max-w-[90rem] mx-auto border-t border-lead-green/10 rounded-b-[3rem] shadow-sm">
      {testimonials.length > 0 && (<>
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="uppercase text-[11px] font-bold tracking-[0.2em] text-[#ff9d00] mb-4 font-friendly flex items-center gap-1.5">
            <MessageCircle size={14} className="fill-current text-[#ff9d00]" />
            Histoires de Restauration
          </span>
          <h2 className="text-4xl md:text-6xl font-friendly font-bold tracking-tight max-w-[50rem] leading-[1.05] text-lead-green">
             Le témoignage authentique de la paix retrouvée au foyer
          </h2>
        </div>

       {/* Interactive slider */}
       <div className="flex flex-col lg:flex-row gap-16 items-center mt-12 bg-mint/30 p-8 md:p-14 rounded-[3rem] border border-lead-green/5 relative overflow-hidden min-h-[520px] lg:min-h-[460px]">
          <div className="absolute top-6 right-6 text-lead-green/5 text-9xl font-bold select-none pointer-events-none">
            ❝
          </div>
          
          <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex flex-col lg:flex-row gap-16 items-center"
            >
              <div className="lg:w-2/5 shrink-0">
                 <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg border-[6px] border-white max-w-[320px] mx-auto lg:max-w-none">
                    <img 
                      src={testimonials[activeIdx].img} 
                      alt={testimonials[activeIdx].author} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                 </div>
              </div>
              
              <div className="lg:w-3/5 flex flex-col justify-center text-center lg:text-left pb-16 lg:pb-0">
                 <div className="flex justify-center lg:justify-start gap-1 text-highlight text-xl mb-6">
                    {Array.from({ length: testimonials[activeIdx].rating }).map((_, i) => (
                      <Star key={i} size={18} className="fill-current text-[#ff9d00]" />
                    ))}
                 </div>
                 
                 <p className="text-xl md:text-2xl lg:text-3xl font-friendly font-medium text-lead-green leading-relaxed italic mb-8">
                   {testimonials[activeIdx].text}
                 </p>

                 <div className="border-t border-lead-green/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div>
                      <h4 className="font-friendly font-bold text-xl text-lead-green">{testimonials[activeIdx].author}</h4>
                      <p className="text-xs font-bold uppercase tracking-wider text-coral/80 font-friendly">{testimonials[activeIdx].role}</p>
                    </div>
                 </div>
              </div>
            </motion.div>

          {/* Arrow navigation handles positioned clearly */}
          <div className="absolute bottom-8 right-8 lg:bottom-14 lg:right-14 flex gap-3 z-10">
             <button 
               onClick={prevTestimonial}
               className="w-12 h-12 rounded-full border border-lead-green/10 bg-white text-lead-green flex items-center justify-center hover:bg-lead-green hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
             >
                <ArrowLeft size={16} />
             </button>
             <button 
               onClick={nextTestimonial}
               className="w-12 h-12 rounded-full border border-lead-green/10 bg-white text-lead-green flex items-center justify-center hover:bg-lead-green hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
             >
                <ArrowRight size={16} />
             </button>
          </div>
       </div>
      </>)}

       {/* Interactive stats grid inspired by Webflow bento grids */}
       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {stats.map((st, i) => (
            <div key={i} className="bg-bg border border-lead-green/5 p-8 rounded-[2rem] flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all">
               <span className="text-4xl mb-4">{st.icon}</span>
               <h3 className="text-3xl lg:text-4xl font-friendly font-bold text-lead-green mb-1">{st.count}</h3>
               <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff9d00] font-friendly">{st.title}</span>
            </div>
          ))}
       </div>

       {/* Contact/Newsletter Form area */}
       <div id="contact" className="mt-28 bg-[#faf6ea] border border-highlight/20 p-8 md:p-16 rounded-[3rem] flex flex-col xl:flex-row justify-between items-center gap-12 relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 bg-radial-gradient from-highlight/1 into-transparent opacity-50 pointer-events-none"></div>
         
         <div className="xl:w-1/2 flex flex-col items-start text-left shrink-0 z-10">
           <span className="px-3 py-1 bg-[#f0e8d5] text-lead-green text-[10px] tracking-widest font-bold uppercase rounded-full mb-4">
             💌 LETTRE PRIVÉE & CONSEILS
           </span>
           <h3 className="text-3xl md:text-5xl font-friendly font-bold text-lead-green leading-tight">
             Rejoignez nos Ateliers <br className="hidden md:block" /> 
             et recevez les fiches gratuites !
           </h3>
           <p className="mt-3 text-sm md:text-base text-lead-green/75 font-friendly font-medium max-w-md">
             Chaque semaine, Lina NGUERELESSIO partage une analyse psycho-éducative couplée à un verset biblique pour fortifier votre rôle de parent. Pas de spam, uniquement de la grâce.
           </p>
         </div>

         <div className="xl:w-1/2 w-full z-10">
           <form onSubmit={handleNewsletterSubmit} className="bg-white p-4 rounded-3xl md:rounded-[2rem] shadow-md border border-lead-green/5 flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre adresse email de parent"
                className="flex-grow px-6 py-4 rounded-2xl bg-bg border border-lead-green/5 focus:outline-none focus:border-highlight font-friendly text-sm text-lead-green"
                required
                disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                className="px-8 py-4 bg-[#e05a47] text-white text-xs font-bold tracking-widest uppercase rounded-2xl hover:bg-lead-green transition-colors font-friendly shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                 {newsletterStatus === 'loading' ? 'Envoi...' : newsletterStatus === 'success' ? 'Inscrit(e) ✓' : "S'abonner gratuitement"}
              </button>
           </form>
           {newsletterStatus === 'success' && (
             <p className="mt-3 text-xs font-bold text-lead-green px-2">✓ Merci ! Votre inscription est bien enregistrée.</p>
           )}
           {newsletterStatus === 'error' && (
             <p className="mt-3 text-xs font-bold text-coral px-2">{newsletterError}</p>
           )}
         </div>
       </div>
    </section>
  );
}
