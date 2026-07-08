import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, ArrowUpRight, Search, X, Clock, Heart, Sparkles, Send, Check, Bookmark, HelpCircle, ShieldCheck, Download, Award, AlertCircle } from 'lucide-react';
import { ThreeArticlesBackground } from './ThreeArticlesBackground';
import { gsap } from 'gsap';

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
  const [subStatus, setSubStatus] = useState<'idle' | 'success'>('idle');
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

  const articles: Article[] = [
    {
      id: 3,
      title: "Mon adolescent s’isole : comprendre son repli et rebâtir le lien verbal",
      desc: "Dans un monde hyperconnecté aux écrans mais de plus en plus isolé verbalement, comment appréhender cliniquement le retrait d'un ado, instaurer des sas d'écoute mutuelle sans forcer le passage, et l'accompagner vers son identité profonde.",
      content: `Le retrait de l'adolescent dans sa chambre est l'un des motifs de consultation de guidance familiale les plus fréquents. Si la recherche de distance fait partie intégrante du processus normal d'individuation, l'isolement pathologique et le silence obstiné requièrent une attention clinique fine.\n\n### Individuation contre Détresse : Faire la distinction\nL'adolescent normal a besoin de s'extraire de l'espace parental pour expérimenter de nouvelles limites et construire sa propre personnalité. Cependant, si ce retrait s'accompagne d'un changement brusque d'humeur, d'une baisse dramatique des résultats scolaires, ou d'une rupture complète de tout dialogue, la frontière avec un mal-être est franchie.\n\n### Nos recommandations d'intervention :\n1. **Prenez acte sans harceler** : Évitez de crier contre sa chambre fermée. Dites plutôt : "Je respecte ta tranquillité, mais ma porte est ouverte si tu as besoin de parler."\n2. **Instaurez de nouveaux prétextes de partage** : Un trajet en voiture, une sortie pour faire une course à deux... Le silence partagé côte à côte est souvent plus facile à franchir qu'une discussion en face-à-face stricte.\n3. **Mettez en relation avec un tiers bienveillant** : Parfois, l'adolescent n'arrive plus à s'adresser à ses parents directs mais acceptera de se confier à un conseiller, un mentor d'église locale ou un psychologue.\n\nLa patience clinique est ici une vertu sainte : sachez témoigner d'un amour inconditionnel même face au silence apparent.`,
      tag: "Adolescents & Foi",
      date: "10 Mai 2026",
      readTime: "8 min de lecture",
      img: "/images/article_3_father_teenager.jpg",
      author: "Lina NGUERELESSIO",
      role: "Psychologue du Développement (stg)",
      featured: true
    },
    {
      id: 1,
      title: "Mettre en place des routines sécurisantes de retour à la maison",
      desc: "L'importance des rituels de transition psychologiques pour abaisser le niveau de vigilance et d'anxiété de l'enfant de retour chez lui après sa journée scolaire.",
      content: `Le moment du retour à la maison après l'école est souvent une zone de turbulence majeure au sein des foyers. Pour l'enfant, cette transition représente bien plus qu'un simple déplacement physique : c'est un saut d'un cadre hyper-structuré à un environnement familial d'expression libre.\n\n### Pourquoi cette période est-elle critique ?\nTout au long de sa journée scolaire, l'enfant accumule du stress et contient ses émotions (notamment pour répondre aux exigences sociales et de discipline). En rentrant chez lui, le sentiment de sécurité qu'il éprouve auprès de ses parents libère cette charge de fatigue contenue. C'est ce qu'on appelle la décompression post-scolaire, se manifestant souvent par des crises, de l'opposition ou de l'excitation extrême.\n\n### Notre plan d'action préconisé :\n1. **Le sas de décompression silencieux** : Accordez 15 minutes libres sans questions intrusives de type "Comment s'est passée ta journée ?".\n2. **La collation réconfortante** : Offrez un encas équilibré qui permet de stabiliser sa glycémie.\n3. **Un temps de reconnexion physique** : Un câlin prolongé de 20 secondes suffit à sécréter de l'ocytocine, hormone d'apaisement.\n\nEn appliquant ces rituels simples mais réguliers, vous offrirez à vos enfants l'ancrage psychologique nécessaire pour glisser doucement vers une soirée paisible.`,
      tag: "Psychologie",
      date: "25 Mai 2026",
      readTime: "4 min de lecture",
      img: "/images/article_1_mother_speaking.jpg",
      author: "Lina NGUERELESSIO",
      role: "Psychologue du Développement (stg)"
    },
    {
      id: 2,
      title: "Gérer la rivalité fraternelle et la jalousie au quotidien",
      desc: "Des outils de guidance bienveillante inspirés des neurosciences affectives pour pacifier les débordements relationnels entre frères et sœurs.",
      content: `La jalousie fraternelle est un sentiment archaïque, tout à fait naturel, mais souvent très déstabilisant pour l'harmonie du foyer. Nombreux sont les parents qui se sentent démunis face à l'agressivité répétée de leurs enfants.\n\n### Comprendre le message caché de la jalousie\nLorsqu'un enfant s'en prend à son frère ou à sa sœur, sa peur fondamentale n'est pas de partager ses jouets, mais de perdre sa part exclusive de l'amour et de l'attention de ses parents. La colère est l'expression extérieure d'un besoin intérieur de sécurité affective.\n\n### Pratiques de guidance à adopter :\n- **Bannir les comparaisons** : Des phrases comme "Regarde comme ton frère est sage" amplifient le sentiment d'injustice.\n- **Du temps individuel et exclusif** : Planifiez une "Bulle de rendez-vous" de 10 minutes par jour avec chaque enfant, où vous êtes 100% disponible pour lui seul.\n- **Accueillir la frustration** : Validez son ressenti en formulant : "Je vois que c'est difficile pour toi d'attendre ton tour. Je t'aime aussi."\n\nN'oubliez pas que renforcer la sécurité affective individuelle de chaque enfant demeure l'antidote le plus efficace contre la rivalité.`,
      tag: "Parentalité",
      date: "18 Mai 2026",
      readTime: "5 min de lecture",
      img: "/images/article_2_wooden_toys.jpg",
      author: "Lina NGUERELESSIO",
      role: "Psychologue du Développement (stg)"
    },
    {
      id: 4,
      title: "Éduquer avec grâce : conjuguer Foi et repères psycho-éducatifs",
      desc: "Comment allier une théologie saine de la grâce divine avec les limites bienveillantes indispensables aux enfants : pour une éducation harmonieuse.",
      content: `De nombreux parents croyants se sentent parfois déchirés entre une vision spirituelle sacralisée reposant sur une exigence de soumission absolue, et des enseignements psycho-éducatifs modernes centrés sur l'empathie. Pourtant, ces deux dimensions ne s'opposent pas : elles se subliment.\n\n### La Grâce n'est pas la permissivité\nLa Grâce n'est pas l'absence de règles, mais une manière de rétablir la relation d'amour après la transgression de la règle. Poser un cadre à l'enfant est un acte de haute bienveillance spirituelle.\n\n### Les piliers d'un foyer ancré :\n- **Remplacer la culpabilisation par le pardon mutuel** : Demander pardon à son enfant en tant que parent lorsqu'on s'est emporté est un formidable exemple de maturité spirituelle.\n- **Instaurer la discipline restauratrice** : Il ne s'agit pas de punir pour humilier, mais d'inviter l'enfant à réparer les conséquences de son erreur.\n- **La foi par l'exemple** : Les enfants n'écoutent pas ce que nous disons, ils imitent ce que nous faisons au quotidien.\n\nEn cultivant cette atmosphère de foi aimante et de sécurité psycho-éducative solide, vous élèverez de véritables joyaux précieux, épanouis tant émotionnellement que spirituellement.`,
      tag: "Spiritualité",
      date: "03 Mai 2026",
      readTime: "6 min de lecture",
      img: "/images/article_4_family_reading_bible.jpg",
      author: "Lina NGUERELESSIO",
      role: "Guidance Familiale"
    },
    {
      id: 5,
      title: "L'art des limites constructives : l'alternative positive aux fessées",
      desc: "Analyser scientifiquement l'impact négatif des châtiments corporels et découvrir les méthodes éprouvées d'encadrement par la fermeté affectueuse.",
      content: `Fixer des limites est une nécessité absolue pour le développement cognitif et émotionnel de l'enfant. Face aux oppositions, certains parents ont parfois recours aux châtiments corporels par habitude générationnelle. La Psychologie du Développement moderne permet de formuler des alternatives saines.\n\n### L'impact cérébral des violences physiques\nLes études en neuro-imagerie démontrent que toute violence physique répétée déclenche un état de stress toxique chronique provoquant une atrophie des connexions préfrontales de l'enfant (gérant l'autorégulation de la colère). Par conséquent, la fessée n'apprend pas la leçon morale à l'enfant, elle lui apprend simplement à craindre de se faire attraper.\n\n### Comment imposer son autorité sereinement ?\n- **Consignes claires en phrases affirmatives** : Préférez dire : "Marche doucement" plutôt que "Arrête de courir".\n- **Conséquence logique et réparation** : Si le jouet est jeté au sol, il est retiré pendant 10 minutes.\n- **Le renforcement positif fréquent** : Soulignez explicitement les moments où l'enfant adopte le bon comportement pour ancrer positivement de bonnes habitudes.\n\nL'affirmation d'un cadre solide, sécurisant et habité par la douceur permet de restaurer l'ordre en transmettant la paix.`,
      tag: "Psychologie",
      date: "28 Avril 2026",
      readTime: "5 min de lecture",
      img: "/images/target_1_gentle_parenting.jpg",
      author: "Lina NGUERELESSIO",
      role: "Psychologue du Développement (stg)"
    },
    {
      id: 6,
      title: "Gérer l'impact des écrans de 0 à 6 ans : Préserver l'attention",
      desc: "Comment les stimulations visuelles excessives modifient l'architecture cérébrale des tout-petits et comment réagir sainement pour stimuler leur langage.",
      content: `L'exposition précoce et prolongée des jeunes enfants aux écrans (téléphones, tablettes, télévision) est devenue l'un des plus grands défis de notre décennie. De nombreuses études en neuropsychologie clinique mettent en lumière des corrélations directes entre le temps d'écran et des retards d'acquisition du langage.\n\n### Pourquoi les écrans captivent-ils autant ?\nLes écrans diffusent des flux d'images ultra-rapides, des sons rythmés et des couleurs saturées. Ces stimulus artificiels provoquent des décharges répétées de dopamine dans le cerveau encore immature de l'enfant. Ce dernier s'habitue à un niveau d'excitation très élevé, rendant le monde réel (un livre, un jeu en bois, une conversation tranquille) fade et insipide en comparaison. Cela nuit directement aux capacités de concentration future à l'école.\n\n### Comment instaurer des limites saines sans drame ?\n1. **Appliquer la règle des 3-6-9-12** : Pas d'écran avant 3 ans, pas de console de jeu personnelle avant 6 ans, pas d'Internet sans surveillance avant 9 ans, et pas de réseaux sociaux avant 12 ans.\n2. **Zéro écran le matin et avant le coucher** : Les écrans le matin épuisent l'attention de l'enfant avant l'école. Le soir, la lumière bleue bloque la sécrétion de mélatonine, empêchant un endormissement paisible.\n3. **Proposer des alternatives interactives** : Remplacez les écrans par des moments d'interaction réciproque : lecture partagée, tri d'objets, ou la Malle d'Éveil Joyaux Précieux.\n\nEn remplaçant le virtuel par le relationnel, vous permettez aux connexions neuronales de votre enfant de se développer harmonieusement dans le calme et la joie.`,
      tag: "Psychologie",
      date: "12 Avril 2026",
      readTime: "6 min de lecture",
      img: "/images/extra_children_reading.jpg",
      author: "Lina NGUERELESSIO",
      role: "Psychologue du Développement (stg)"
    },
    {
      id: 7,
      title: "Le rituel du coucher : Créer un sanctuaire de paix pour la nuit",
      desc: "Découvrez comment un enchaînement de gestes simples et affectueux apaise le système nerveux de l'enfant et favorise la paix spirituelle du soir.",
      content: `Le moment du coucher cristallise souvent les tensions accumulées au cours de la journée. Les refus de dormir, les demandes répétées de verres d'eau ou les peurs nocturnes témoignent fréquemment d'une angoisse de séparation de l'enfant face à la nuit.\n\n### Le sommeil : une affaire de transition affective\nPour s'endormir, le cerveau de l'enfant a besoin de passer en mode de parasympathotonie, c'est-à-dire un état de relaxation profonde. Si le coucher est perçu comme une rupture brutale ou une punition, le niveau de cortisol (l'hormone du stress) augmente, rendant l'endormissement biologiquement impossible.\n\n### Construire un rituel apaisant en 4 étapes :\n- **L'extinction des feux progressifs** : Diminuez l'intensité lumineuse de la maison 30 minutes avant l'heure du dodo.\n- **Le temps du conte ou du souvenir** : Lisez une histoire inspirante ou utilisez notre Story Spinner Joyaux Précieux pour inventer un conte rassurant.\n- **Le sas de gratitude** : Encouragez l'enfant à citer 3 belles choses de sa journée pour lesquelles il est reconnaissant. C'est une excellente habitude psychologique et spirituelle.\n- **La bénédiction du soir** : Une prière simple de protection et d'amour pour envelopper l'enfant de paix avant qu'il ne ferme les yeux.\n\nFaire du coucher un espace privilégié de retrouvailles permet à l'enfant de s'endormir confiant, sachant qu'il est profondément aimé et en sécurité.`,
      tag: "Parentalité",
      date: "05 Avril 2026",
      readTime: "5 min de lecture",
      img: "/images/extra_grandmother_storytelling.jpg",
      author: "Lina NGUERELESSIO",
      role: "Guidance Familiale"
    },
    {
      id: 8,
      title: "L'écoute empathique : Fondement du Standard Divin au sein du couple",
      desc: "Comment l'harmonie du couple de parents influence directement la sécurité affective des enfants, et comment cultiver un espace de parole authentique.",
      content: `La première sécurité d'un enfant réside dans la solidité et la paix de l'alliance de ses parents. Les tensions conjugales, même inexprimées à haute voix, créent un climat d'insécurité invisible que l'enfant absorbe comme une éponge.\n\n### Le concept de résonance émotionnelle\nL'enfant possède des neurones miroirs très actifs. Il ressent instantanément la nervosité, la froideur ou la colère latente entre ses parents. Restaurer la communication au sein du couple est donc le premier acte psycho-éducatif de prévention pour la santé mentale des enfants.\n\n### Les clés cliniques pour un dialogue renouvelé :\n- **L'écoute sans interrompre** : Accordez-vous un temps où chacun peut exprimer son ressenti sans que l'autre ne cherche à se justifier ou à apporter une solution immédiate.\n- **Parler en 'Je'** : Remplacez les accusations ('Tu ne m'aides jamais') par l'expression de vos besoins ('Je me sens fatigué(e) et j'aimerais qu'on s'organise ensemble pour le bain des enfants').\n- **La prière de reconnexion** : Pour les couples croyants, s'unir dans une prière simple de réconciliation permet d'abaisser les barrières de l'orgueil et d'accueillir la grâce restauratrice.\n\nLe Standard Divin pour la famille commence par la douceur et le respect mutuel au sommet du foyer. Prenez soin de votre couple, c'est le plus beau cadeau à faire à vos enfants.`,
      tag: "Spiritualité",
      date: "28 Mars 2026",
      readTime: "7 min de lecture",
      img: "/images/article_4_family_reading_bible.jpg",
      author: "Lina NGUERELESSIO",
      role: "Guidance Familiale"
    }
  ];

  const featuredArticle = articles.find(art => art.featured) || articles[0];
  const regularArticles = articles.filter(art => !art.featured);

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || art.tag === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubStatus('success');
      setPremiumUnlocked(true);
    }
  };

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
      {searchQuery === '' && activeCategory === 'Tous' && (
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
                
                {subStatus === 'idle' ? (
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
                        className="w-full px-5 py-3.5 rounded-xl border border-lead-green/10 font-friendly text-xs focus:ring-1 focus:ring-coral focus:outline-none focus:border-coral font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#e05a47] text-white font-friendly font-bold uppercase tracking-wider text-xs rounded-xl shadow-md hover:bg-lead-green cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <Send size={13} /> S'abonner & Télécharger
                    </button>

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
                      Bienvenue au sein du cercle des parents prévoyants. Votre guide PDF premium est activé ci-dessous.
                    </p>

                    <div className="p-4 bg-mint/55 rounded-2xl border border-lead-green/10 mb-6 text-left flex items-start gap-3">
                      <span className="text-2xl">🎁</span>
                      <div>
                        <h5 className="text-xs font-bold text-lead-green">Guide_Dialogue_Restaurateur.pdf</h5>
                        <p className="text-[10px] text-lead-green/60 mt-0.5">Fiche clinique d'accompagnement de 12 pages</p>
                      </div>
                    </div>

                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Le Guide Psycho-Éducatif offert 'Guide_Dialogue_Restaurateur.pdf' (1.4 Mo) a été généré et s'est téléchargé avec succès ! Merci pour votre confiance envers Lina NGUERELESSIO.");
                      }}
                      className="w-full py-3.5 bg-lead-green hover:bg-[#ff9d00] text-white rounded-xl text-xs font-bold uppercase tracking-widest block transition-colors text-center shadow"
                    >
                      Télécharger le guide PDF 📥
                    </a>
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grand Full-screen Reading Experience Overlay (Modal dialog) */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#121b16]/70 backdrop-blur-md z-99 flex items-center justify-center p-4 overflow-y-auto font-friendly"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-bg text-lead-green w-full max-w-3xl rounded-[3rem] overflow-hidden shadow-2xl relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image banner with absolute close handle */}
              <div className="relative h-64 sm:h-80 bg-mint w-full">
                <img 
                  src={selectedArticle.img} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-6 right-6 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-6 left-6 right-6 text-white font-friendly">
                  <span className="bg-[#ff9d00] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md mb-2 inline-block">
                    {selectedArticle.tag}
                  </span>
                  <p className="text-xs font-mono flex items-center gap-3 text-white/85">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {selectedArticle.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {selectedArticle.readTime}</span>
                  </p>
                </div>
              </div>

              {/* Scrollable content block */}
              <div className="p-8 sm:p-12 max-h-[55vh] overflow-y-auto custom-scrollbar">
                <h2 className="text-2xl sm:text-3xl font-bold text-lead-green leading-snug mb-6">
                  {selectedArticle.title}
                </h2>
                
                {/* Author Info */}
                <div className="flex items-center gap-3.5 pb-6 border-b border-lead-green/10 mb-8">
                  <div className="w-10 h-10 rounded-full bg-lead-green/10 border border-lead-green/5 flex items-center justify-center font-friendly font-bold text-lead-green">
                    LN
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-lead-green leading-none">{selectedArticle.author}</h4>
                    <p className="text-[10px] uppercase font-bold text-coral tracking-wider mt-1">{selectedArticle.role}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="text-base text-lead-green/85 leading-relaxed font-semibold space-y-6 whitespace-pre-line antialiased">
                  {selectedArticle.content}
                </div>
                
                {/* Special quote section */}
                <div className="mt-10 p-6 bg-mint/50 border-l-4 border-lead-green rounded-r-2xl text-xs md:text-sm font-semibold italic text-lead-green/80 flex gap-3 items-start">
                  <Heart size={16} className="text-coral shrink-0 mt-0.5 fill-current" />
                  <span>"Chaque enfant est un joyau précieux façonné de mains divines. Notre rôle clinique et spirituel est d'accompagner patiemment sa taille et son polissage."</span>
                </div>
              </div>

              {/* Modal footer action */}
              <div className="px-8 sm:px-12 py-6 bg-white border-t border-lead-green/5 flex justify-end gap-3 rounded-b-[3rem]">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-3 border border-lead-green/10 hover:border-lead-green/30 text-xs font-bold font-friendly uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                >
                  Fermer
                </button>
                <a
                  href="#contact"
                  onClick={() => {
                    setSelectedArticle(null);
                  }}
                  className="px-6 py-3 bg-[#e05a47] text-white text-xs font-bold font-friendly uppercase tracking-wider rounded-full hover:bg-lead-green cursor-pointer transition-colors shadow-sm"
                >
                  Contacter Lina
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
