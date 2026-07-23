import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, ArrowUpRight, Search, X, Clock, Heart, Sparkles, Send, Check, Bookmark, HelpCircle, ShieldCheck, Download, Award, AlertCircle } from 'lucide-react';
import { ThreeArticlesBackground } from './ThreeArticlesBackground';
import { gsap } from 'gsap';
import { publicApi } from '../lib/publicApi';

interface Article {
  id: number;
  title: string;
  desc: string;
  content: string;
  tag: string;
  date: string;
  readTime: string;
  img: string;
  author: string;
  role: string;
  featured?: boolean;
}

export function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Newsletter Sign-up State
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subError, setSubError] = useState('');
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);

  // Micro-Interactive Quiz State for retention/parental self-audit
  const [quizAnswer, setQuizAnswer] = useState<boolean | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const badge = heroRef.current.querySelector('.gsap-hero-badge');
    const title = heroRef.current.querySelector('.gsap-hero-title');
    const subtitle = heroRef.current.querySelector('.gsap-hero-subtitle');
    const search = heroRef.current.querySelector('.gsap-hero-search');

    gsap.killTweensOf([badge, title, subtitle, search]);

    gsap.fromTo(badge, 
      { opacity: 0, scale: 0.85, y: -25 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "back.out(2)" }
    );

    gsap.fromTo(title,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.15, ease: "power4.out" }
    );

    gsap.fromTo(subtitle,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.35, ease: "power3.out" }
    );

    gsap.fromTo(search,
      { opacity: 0, scale: 0.96, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, delay: 0.55, ease: "power2.out" }
    );
  }, []);

  const categories = ["Tous", "Psychologie", "Parentalité", "Adolescents & Foi", "Spiritualité"];

  const [articles, setArticles] = useState<Article[]>([]);
  const [guides, setGuides] = useState<{ title: string; file_url: string }[]>([]);

  useEffect(() => {
    // Downloadable guides come from the managed "Ressources PDF" — the free
    // lead-magnet guide is therefore fully editable from the dashboard.
    publicApi.resources().then(data => {
      setGuides((data as any[])
        .filter(r => r.file_url)
        .map(r => ({ title: String(r.title), file_url: String(r.file_url) })));
    });
  }, []);

  useEffect(() => {
    publicApi.articles().then(data => {
      const mapped = (data as any[]).map(a => ({
        id: Number(a.id),
        title: String(a.title ?? ''),
        desc: String(a.desc ?? ''),
        content: String(a.content ?? ''),
        tag: String(a.tag ?? ''),
        date: String(a.date ?? ''),
        readTime: String(a.read_time ?? a.readTime ?? ''),
        img: String(a.img ?? ''),
        author: String(a.author ?? 'Lina NGUERELESSIO'),
        role: String(a.role ?? ''),
        featured: Number(a.featured) === 1,
      }));
      setArticles(mapped);
    });
  }, []);

  const displayArticles = articles;
  const featuredArticle = displayArticles.find(art => art.featured) || displayArticles[0];

  const filteredArticles = displayArticles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || art.tag === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setSubStatus('error');
      setSubError('Merci de saisir une adresse email valide.');
      return;
    }
    setSubStatus('loading');
    try {
      const result = await publicApi.subscribe(email, '', 'articles-guide');
      if (result.error) {
        setSubStatus('error');
        setSubError(result.error);
      } else {
        setSubStatus('success');
        setPremiumUnlocked(true);
      }
    } catch {
      setSubStatus('error');
      setSubError('Erreur réseau, veuillez réessayer.');
    }
  };

  // Dedicated full-page article reader (replaces the old modal bubble)
  if (selectedArticle) {
    return <ArticleReader article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <div className="pt-24 min-h-screen bg-bg relative">
      {/* 3D child toys and motifs pattern background */}
      <ThreeArticlesBackground />

      {/* Absolute decor spots */}
      <div className="absolute top-[15%] left-0 w-80 h-80 bg-mint/40 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute top-[40%] right-0 w-96 h-96 bg-yellow-bg/40 rounded-full filter blur-3xl opacity-30 -z-10"></div>

      {/* 1. Header Hero Area */}
      <section ref={heroRef} className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint border border-lead-green/10 text-lead-green font-friendly font-semibold text-xs mb-6 shadow-xs gsap-hero-badge opacity-0">
          <BookOpen size={13} className="text-coral" />
          <span>La Tribune Littéraire & Médiation Clinique</span>
        </div>
        
        <div className="relative inline-block">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-friendly font-bold text-lead-green tracking-tight mb-6 gsap-hero-title opacity-0">
            Éclairer le chemin des <br />
            <span className="text-coral underline decoration-[#ff9d00] decoration-wavy">Joyaux Précieux</span>
          </h1>
          {/* Floating spinning Ladybug */}
          <motion.div 
            className="absolute -top-12 -right-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.3 }}
          >
            🐞
          </motion.div>
          {/* Floating spinning Bee */}
          <motion.div 
            className="absolute -bottom-6 -left-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ y: [0, -8, 0], x: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.3, rotate: 360 }}
          >
            🐝
          </motion.div>
        </div>
        
        <p className="text-base sm:text-lg text-lead-green/75 max-w-2xl mx-auto font-friendly font-medium leading-relaxed gsap-hero-subtitle opacity-0">
          Décryptages cliniques, fiches de psychologie de l'enfant et éclairages de guidance pour préserver l'équilibre affectif et spirituel de votre foyer.
        </p>

        {/* Dynamic Search */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto gsap-hero-search opacity-0">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lead-green/40 w-4.5 h-4.5" />
            <input 
              type="text" 
              placeholder="Rechercher une thématique (routines, colère, ado...)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-lead-green/10 rounded-2xl font-friendly font-medium text-lead-green text-xs focus:outline-none focus:border-coral shadow-xs focus:ring-1 focus:ring-coral transition-all"
            />
          </div>
        </div>
      </section>

      {/* 2. Flagship Featured Article Banner component (RETAINS & CONVERTS) */}
      {searchQuery === '' && activeCategory === 'Tous' && featuredArticle && (
        <section className="px-6 lg:px-12 pb-20 max-w-7xl mx-auto">
          <div className="bg-white rounded-[3rem] border border-lead-green/10 p-6 md:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 py-2.5 px-4 bg-[#ff9d00] text-white font-friendly font-bold text-[10px] uppercase tracking-widest rounded-bl-2xl">
              ⭐ Dossier À la Une
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-center">
              {/* Image box */}
              <div className="w-full lg:w-1/2 aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-mint relative shadow-inner">
                <img 
                  src={featuredArticle.img} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Text content block */}
              <div className="w-full lg:w-1/2 text-left font-friendly flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#e05a47] uppercase tracking-widest bg-[#fbebeb] px-3.5 py-1.5 rounded-full inline-block mb-4">
                    {featuredArticle.tag} • Recommandé
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-lead-green tracking-tight leading-tight mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-sm text-lead-green/75 font-semibold leading-relaxed mb-6">
                    {featuredArticle.desc}
                  </p>

                  <div className="flex flex-wrap gap-4 items-center text-[11px] font-semibold text-lead-green/50 mb-8 font-mono">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {featuredArticle.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {featuredArticle.readTime}</span>
                    <span>•</span>
                    <span className="text-[#ff9d00]">★ Écriture clinique</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <button
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="px-6 py-4 bg-lead-green text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-coral hover:scale-102 cursor-pointer transition-all shadow-sm text-center"
                  >
                    Lire l'étude complète ↗
                  </button>
                  <a
                    href="#newsletter-lead"
                    className="px-6 py-4 border border-lead-green/10 hover:border-lead-green/40 hover:bg-bg/50 text-xs font-bold uppercase tracking-wider rounded-full text-lead-green text-center transition-colors"
                  >
                    S'abonner aux fiches cliniques
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Micro-Interaction: Retain block "Le Vrai du Faux de la Parentalité" (ENGAGE & RETAIN) */}
      <section className="px-6 lg:px-12 pb-20 max-w-7xl mx-auto">
        <div className="bg-[#f2efe4] border border-lead-green/5 rounded-[3rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 text-left shadow-xs">
          <div className="lg:w-1/2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#e05a47] uppercase tracking-widest bg-white/70 px-3 py-1 rounded-full mb-4">
              <Sparkles size={11} className="text-[#ff9d00]" /> Mini-Audit Interactif
            </span>
            <h3 className="text-2xl md:text-3.5xl font-friendly font-bold text-lead-green tracking-tight leading-tight mb-4">
              Vrai ou Faux : Le stress post-scolaire s'atténue-t-il par l'isolement ?
            </h3>
            <p className="text-sm font-friendly font-semibold text-lead-green/75 leading-relaxed max-w-lg">
              De nombreux parents pensent que laisser un enfant seul dans sa chambre dès le retour à la maison l'aide à faire redescendre la charge émotionnelle de sa journée d'école. Testez votre instinct clinique.
            </p>
          </div>

          <div className="lg:w-1/2 w-full bg-white rounded-3xl p-6 md:p-8 border border-lead-green/5">
            {!quizChecked ? (
              <div className="space-y-4">
                <p className="font-friendly text-xs font-bold uppercase tracking-wider text-lead-green/50 mb-2">Votez pour afficher l'explication clinique :</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setQuizAnswer(true); setQuizChecked(true); }}
                    className="p-5 rounded-2xl border border-lead-green/10 hover:border-coral font-friendly font-bold text-sm text-lead-green hover:bg-mint/35 transition-all text-center cursor-pointer"
                  >
                    🟢 C'est VRAI
                  </button>
                  <button
                    onClick={() => { setQuizAnswer(false); setQuizChecked(true); }}
                    className="p-5 rounded-2xl border border-lead-green/10 hover:border-coral font-friendly font-bold text-sm text-lead-green hover:bg-mint/35 transition-all text-center cursor-pointer"
                  >
                    🔴 C'est FAUX
                  </button>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }}
                className="font-friendly"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💡</span>
                  <span className="text-sm font-bold uppercase text-[#e05a47] tracking-wider">
                    {quizAnswer === false ? "Félicitations, c'est exact !" : "Une idée reçue fréquente !"}
                  </span>
                </div>
                
                <h4 className="font-bold text-sm text-lead-green mb-2">L'explication de Lina NGUERELESSIO (Psychologue) :</h4>
                <p className="text-xs text-lead-green/75 leading-relaxed font-semibold mb-4">
                  C'est <strong>Faux</strong>. L'isolement brutal fragmente le lien de sécurité. Au contraire, le système nerveux de l'enfant a besoin d'une co-régulation physique (câlin prolongé de 20 sec, présence douce, collation) pour désamorcer l'hormone du stress accumulé à l'école.
                </p>

                <div className="flex gap-2.5 items-center">
                  <button 
                    onClick={() => setQuizChecked(false)} 
                    className="text-[11px] font-bold underline text-lead-green/50 hover:text-lead-green cursor-pointer"
                  >
                    Recommencer
                  </button>
                  <span className="text-lead-green/30">•</span>
                  <a 
                    href="#downloadable-resource" 
                    className="text-[11px] font-bold text-[#ff9d00] hover:underline"
                  >
                    Télécharger la fiche des Routines 📥
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      {/* 4. Filter categories block */}
      <section className="px-6 lg:px-12 pb-8 max-w-7xl mx-auto">
        <div className="border-t border-lead-green/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <h3 className="text-lg md:text-xl font-friendly font-bold text-lead-green uppercase tracking-wide">
            Tous les articles par catégorie :
          </h3>

          <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-none w-full md:w-auto justify-start md:justify-end">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold font-friendly tracking-wide whitespace-nowrap cursor-pointer transition-all border ${
                  activeCategory === cat 
                    ? 'bg-[#e05a47] text-white border-[#e05a47] shadow-xs' 
                    : 'bg-white text-lead-green/70 border-lead-green/10 hover:border-lead-green/30 hover:bg-white'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Main Articles Grid */}
      <section className="px-6 lg:px-12 pb-24 max-w-7xl mx-auto min-h-[300px]">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[2.5rem] border border-lead-green/5 max-w-xl mx-auto p-8 shadow-xs">
            <p className="text-3xl mb-3">🔍</p>
            <h4 className="text-lg font-friendly font-bold text-lead-green">Aucun document trouvé</h4>
            <p className="text-xs text-lead-green/60 mt-1 font-friendly">
              Aucun écrit ne correspond à vos termes de recherche actuels. Veuillez essayer de modifier l'intituté ou changer de thématique.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredArticles.map((art, idx) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  onClick={() => setSelectedArticle(art)}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-lead-green/5 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group h-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-mint w-full">
                    <img 
                      src={art.img} 
                      alt={art.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-lead-green text-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm">
                      {art.tag}
                    </span>
                  </div>

                  <div className="p-7 flex-grow flex flex-col justify-between font-friendly">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] font-semibold text-lead-green/50 mb-3 font-mono">
                        <span className="flex items-center gap-1"><Calendar size={11} /> {art.date}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-lead-green leading-snug mb-3 group-hover:text-coral transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-lead-green/70 font-semibold leading-relaxed line-clamp-3">
                        {art.desc}
                      </p>
                    </div>

                    <div className="border-t border-lead-green/10 mt-6 pt-5 flex items-center justify-between text-xs font-bold">
                      <span className="text-[10px] text-lead-green/40 font-mono">Plume : {art.author}</span>
                      <div className="flex items-center gap-1 text-[#e05a47] uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                        Explorer <ArrowUpRight size={13} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 6. High-Impact Conversion / Lead-Magnet Block (CONVERTS PASSERSBY) */}
      <section id="newsletter-lead" className="px-6 lg:px-12 pb-24 max-w-7xl mx-auto">
        <div className="bg-lead-green text-white rounded-[3.5rem] relative overflow-hidden p-8 md:p-14 lg:p-20 shadow-xl border border-white/10 text-left">
          {/* Subtle decoration lines */}
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-coral/10 rounded-full filter blur-3xl opacity-50 -z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white font-friendly font-bold text-[10px] uppercase tracking-widest mb-6 border border-white/10">
                <Award size={11} className="text-[#ff9d00]" /> Guide Hautement Pratique Inclus
              </span>
              
              <h3 className="text-3xl md:text-5xl font-friendly font-bold tracking-tight leading-none mb-6">
                Rejoignez le Cercle des <br />
                <span className="text-[#ff9d00]">Parents Prévoyants</span>
              </h3>
              
              <p className="text-sm md:text-base text-white/85 max-w-xl font-friendly font-semibold leading-relaxed mb-8">
                Ne manquez pas nos fiches de guidance clinique psycho-éducatives éditées tous les 15 jours. En vous abonnant gratuitement, <strong>débloquez instantanément</strong> notre dossier de 12 pages : <em>"Rétablir le dialogue avec un enfant bloqué ou colérique"</em>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-friendly font-bold text-white/90">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#ff9d00]/25 flex items-center justify-center text-[10px] text-[#ff9d00]">✦</span>
                  <span>100% cliniquement fondé & sans spams</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#ff9d00]/25 flex items-center justify-center text-[10px] text-[#ff9d00]">✦</span>
                  <span>Fiches routines imprimables incluses</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#ff9d00]/25 flex items-center justify-center text-[10px] text-[#ff9d00]">✦</span>
                  <span>Théologie de la Grâce appliquée</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#ff9d00]/25 flex items-center justify-center text-[10px] text-[#ff9d00]">✦</span>
                  <span>Anonymat et discrétion garantis</span>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Card form */}
            <div className="lg:col-span-5 w-full">
              <div id="downloadable-resource" className="bg-white text-lead-green p-8 rounded-[2.5rem] shadow-2xl border border-lead-green/5 relative">
                
                {subStatus !== 'success' ? (
                  <form onSubmit={handleSubscribe} className="space-y-5">
                    <div className="text-center pb-3 border-b border-lead-green/5 mb-2">
                      <p className="text-[10px] font-bold text-coral uppercase tracking-widest font-friendly">Recevoir mon guide offert :</p>
                      <h4 className="text-lg font-friendly font-bold text-lead-green">Cadeau de Bienvenue 📥</h4>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-[10px] uppercase font-bold text-lead-green/60 tracking-wider block font-friendly">Votre adresse email :</label>
                      <input
                        type="email"
                        required
                        placeholder="exemple@monfoyer.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={subStatus === 'loading'}
                        className="w-full px-5 py-3.5 rounded-xl border border-lead-green/10 font-friendly text-xs focus:ring-1 focus:ring-coral focus:outline-none focus:border-coral font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={subStatus === 'loading'}
                      className="w-full py-4 bg-[#e05a47] text-white font-friendly font-bold uppercase tracking-wider text-xs rounded-xl shadow-md hover:bg-lead-green cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send size={13} /> {subStatus === 'loading' ? 'Envoi...' : "S'abonner & Télécharger"}
                    </button>

                    {subStatus === 'error' && (
                      <p className="text-[10px] text-center text-coral font-bold font-friendly">{subError}</p>
                    )}

                    <p className="text-[9px] text-center text-lead-green/45 leading-normal font-friendly pt-2">
                      En soumettant votre email, vous acceptez de recevoir nos conseils d'accompagnement. Désabonnement en un seul clic à tout moment.
                    </p>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center font-friendly py-6"
                  >
                    <div className="w-14 h-14 bg-mint rounded-full flex items-center justify-center text-coral mx-auto mb-5 shadow-inner">
                      <Check size={24} className="stroke-[3]" />
                    </div>
                    
                    <h4 className="text-xl font-bold text-lead-green mb-2">Inscription Validée !</h4>
                    <p className="text-xs text-lead-green/70 leading-relaxed font-semibold mb-6">
                      Bienvenue au sein du cercle des parents prévoyants. Votre email est bien enregistré.
                    </p>

                    {guides.length > 0 ? (
                      <div className="space-y-2.5 text-left">
                        <p className="text-[10px] font-bold text-lead-green/60 uppercase tracking-wider mb-2">🎁 Vos guides gratuits à télécharger :</p>
                        {guides.map((g, i) => (
                          <a key={i} href={g.file_url} download target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-mint/55 rounded-2xl border border-lead-green/10 hover:bg-mint transition-colors">
                            <span className="text-xl">📄</span>
                            <span className="text-xs font-bold text-lead-green flex-1 truncate">{g.title}</span>
                            <Download size={14} className="text-lead-green shrink-0" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a
                        href={`https://wa.me/237621479061?text=${encodeURIComponent(`Bonjour Madame Lina, je viens de m'inscrire sur le site avec l'email ${email} — pouvez-vous m'envoyer votre guide gratuit ? Merci !`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-full py-3.5 bg-lead-green hover:bg-[#ff9d00] text-white rounded-xl text-xs font-bold uppercase tracking-widest block transition-colors text-center shadow"
                      >
                        Recevoir le guide par WhatsApp 📲
                      </a>
                    )}
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Dedicated full-page article reader (replaces the previous modal overlay)
function ArticleReader({ article, onBack }: { article: Article; onBack: () => void }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="pt-24 min-h-screen bg-bg relative font-friendly">
      <article className="max-w-3xl mx-auto px-6 pb-24">
        <button
          onClick={onBack}
          className="mt-6 mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lead-green/70 hover:text-coral transition-colors cursor-pointer"
        >
          <ArrowUpRight size={14} className="rotate-[225deg]" /> Retour aux articles
        </button>

        <span className="bg-[#ff9d00] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm inline-block mb-4">
          {article.tag}
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold text-lead-green leading-tight mb-4">{article.title}</h1>

        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-lead-green/50 mb-8">
          <span className="flex items-center gap-1"><Calendar size={11} /> {article.date}</span>
          {article.readTime && (<><span>•</span><span className="flex items-center gap-1"><Clock size={11} /> {article.readTime}</span></>)}
        </div>

        {article.img && (
          <div className="rounded-[2rem] overflow-hidden bg-mint mb-10 aspect-[16/9]">
            <img src={article.img} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        )}

        <div className="flex items-center gap-3.5 pb-8 border-b border-lead-green/10 mb-8">
          <div className="w-11 h-11 rounded-full bg-lead-green/10 border border-lead-green/5 flex items-center justify-center font-bold text-lead-green">LN</div>
          <div>
            <h4 className="font-bold text-sm text-lead-green leading-none">{article.author}</h4>
            {article.role && <p className="text-[10px] uppercase font-bold text-coral tracking-wider mt-1">{article.role}</p>}
          </div>
        </div>

        <div className="text-base text-lead-green/85 leading-relaxed font-semibold space-y-5 whitespace-pre-line antialiased">
          {article.content}
        </div>

        <div className="mt-12 p-6 bg-mint/50 border-l-4 border-lead-green rounded-r-2xl text-sm font-semibold italic text-lead-green/80 flex gap-3 items-start">
          <Heart size={16} className="text-coral shrink-0 mt-0.5 fill-current" />
          <span>"Chaque enfant est un joyau précieux façonné de mains divines. Notre rôle clinique et spirituel est d'accompagner patiemment sa taille et son polissage."</span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button onClick={onBack} className="px-6 py-3.5 border border-lead-green/10 hover:border-lead-green/30 text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-colors">
            ← Tous les articles
          </button>
          <a href="https://wa.me/237621479061" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#e05a47] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-lead-green transition-colors shadow-sm text-center">
            Contacter Lina
          </a>
        </div>
      </article>
    </div>
  );
}
