export function Footer() {
  return (
    <footer className="bg-lead-green text-bg py-10 sm:py-16 md:py-20 px-6 lg:px-12 w-full mt-12 border-t border-lead-green/20">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 text-sm items-start border-b border-bg/10 pb-10 md:pb-16 text-left">
         
         {/* Brand Block */}
         <div className="flex flex-col gap-4 w-full md:col-span-2 lg:col-span-5 text-left">
            <div className="flex items-center gap-3 text-highlight">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden shrink-0">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
              </div>
              <span className="font-friendly font-bold tracking-tight text-2xl sm:text-3xl text-white">joyaux précieux</span>
            </div>
            
            <p className="text-xs sm:text-sm font-friendly font-medium text-bg/75 max-w-xl leading-relaxed">
               Accompagnement psycho-éducatif pour enfants & guidance familiale chrétienne par Lina NGUERELESSIO.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
               <div className="flex flex-col gap-1">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Contact Email :</span>
                  <a href="mailto:contact@lina-ng.com" className="font-friendly font-bold text-base sm:text-lg text-highlight hover:text-white transition-colors">contact@lina-ng.com</a>
               </div>
               
               <div className="flex flex-col gap-1">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Téléphone (WhatsApp) :</span>
                  <a href="https://wa.me/237621479061" target="_blank" rel="noopener noreferrer" className="font-friendly font-bold text-base sm:text-lg text-highlight hover:text-white transition-colors">
                     +237 621 47 90 61
                  </a>
               </div>
            </div>
         </div>
         
         {/* Social Links Block */}
         <div className="flex flex-col gap-3 font-friendly text-left w-full md:col-span-1 lg:col-span-3">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Suivez Lina NGUERELESSIO</span>
              <div className="flex flex-row flex-wrap lg:flex-col gap-x-5 gap-y-2 lg:gap-3">
                <a href="https://whatsapp.com/channel/0029Vb6QNbEAInPmtWcEcb1E" target="_blank" rel="noopener noreferrer" className="font-bold text-base sm:text-lg lg:text-2xl border-b-2 border-transparent hover:border-highlight hover:text-highlight transition-all inline-block pb-0.5 w-fit">WhatsApp ↗</a>
                <a href="https://www.facebook.com/share/17pEQrV1ER/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="font-bold text-base sm:text-lg lg:text-2xl border-b-2 border-transparent hover:border-highlight hover:text-highlight transition-all inline-block pb-0.5 w-fit">Facebook ↗</a>
                <a href="https://www.tiktok.com/@joyaux.prcieux?_r=1&_t=ZS-97Nm098siAy" target="_blank" rel="noopener noreferrer" className="font-bold text-base sm:text-lg lg:text-2xl border-b-2 border-transparent hover:border-highlight hover:text-highlight transition-all inline-block pb-0.5 w-fit">TikTok ↗</a>
              </div>
         </div>
 
         {/* Navigation Links Block */}
         <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2.5 font-friendly font-semibold text-xs sm:text-sm lg:text-base text-bg/85 text-left w-full md:col-span-1 lg:col-span-4">
              <a href="#about" className="hover:text-highlight transition-colors">À Propos</a>
              <a href="#targets" className="hover:text-highlight transition-colors">Publics Cibles</a>
              <a href="#services" className="hover:text-highlight transition-colors">Nos Services</a>
              <a href="#diagnostic" className="hover:text-highlight transition-colors">Diagnostic</a>
              <a href="#temoignages" className="hover:text-highlight transition-colors">Témoignages</a>
              <a href="#articles" className="hover:text-highlight transition-colors">Dossiers & Articles</a>
              <a href="#audio" className="hover:text-highlight transition-colors">Minutes Précieuses</a>
              <a href="#faq" className="hover:text-highlight transition-colors">Vos questions (FAQ)</a>
         </div>
 
      </div>
 
      <div className="max-w-[90rem] mx-auto mt-6 sm:mt-10 flex flex-row justify-between items-center gap-6 text-bg font-friendly font-bold">
         <div className="flex gap-4 items-center">
            <span className="text-4xl sm:text-5xl">🎈</span>
         </div>
         <h1 className="hidden md:block text-[10vw] lg:text-[12rem] leading-none tracking-tighter text-white/5 font-friendly select-none">JOYAUX</h1>
         <div className="text-right text-[10px] sm:text-xs uppercase tracking-widest max-w-[200px] sm:max-w-[250px] opacity-50 font-friendly font-medium">
              Lina NGUERELESSIO • Douala, Cameroun<br/> Psychologue du Développement (Stg)
         </div>
      </div>
    </footer>
  );
}
