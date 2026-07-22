import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Download, BookOpen, Volume2, Video, FileText, Sparkles, Heart, Check, X, ShieldAlert } from 'lucide-react';
import { VideoCapsules } from './VideoCapsules';
import { PracticalTools } from './PracticalTools';
import { StorySpinner } from './StorySpinner';
import { publicApi } from '../lib/publicApi';

interface VideoFile {
  title: string;
  duration: string;
  desc: string;
  category: string;
  img: string;
  url: string;
  speaker: string;
}

interface Book {
  title: string;
  author: string;
  rating: string;
  desc: string;
  benefits: string[];
  img: string;
}

export function RessourcesPage() {
  const [activeCategory, setActiveCategory] = useState<'tous' | 'audio' | 'video' | 'pdf' | 'livre'>('tous');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null);

  const categories = [
    { id: 'tous', label: 'Tout explorer', icon: '🚀' },
    { id: 'audio', label: 'Minutes Précieuses (Vidéo)', icon: '🎥' },
    { id: 'video', label: 'Vidéos & Conférences', icon: '🎥' },
    { id: 'pdf', label: 'Guides & Fiches PDF', icon: '📥' },
    { id: 'livre', label: 'Livres Recommandés', icon: '📚' }
  ];

  const STATIC_VIDEOS: VideoFile[] = [
    {
      title: "Gestion saine de l'autorité parentale : Comment poser un cadre clair",
      duration: "12:45",
      desc: "Une mini-conférence psycho-éducative sur les neurosciences cognitives appliquées et la mise en place d'un protocole d'autorité positive au foyer.",
      category: "Parentalité",
      img: "/images/african_family_outdoor.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      speaker: "Lina NGUERELESSIO"
    },
    {
      title: "Foi & Santé Mentale : Protéger l'esprit de nos préadolescents",
      duration: "18:20",
      desc: "Analyse croisée sur l’anxiété moderne, les pressions sociales des réseaux de communication et l’ancrage spirituel salvateur d'un foyer de grâce.",
      category: "Adolescents & Foi",
      img: "/images/african_family_reading.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      speaker: "Lina NGUERELESSIO"
    },
    {
      title: "L'importance cruciale de l'éveil ludique de 0 à 3 ans",
      duration: "10:15",
      desc: "Pourquoi les interactions précoces et les jeux de manipulation sensori-motrice posent les fondations de l'intelligence cognitive et émotionnelle.",
      category: "Parentalité",
      img: "/images/resource_1_guide_pdf.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      speaker: "Lina NGUERELESSIO"
    },
    {
      title: "Instaurer le pardon mutuel et la grâce au quotidien",
      duration: "15:40",
      desc: "Une étude psycho-spirituelle montrant comment restaurer le lien affectif après une crise ou une colère familiale.",
      category: "Spiritualité",
      img: "/images/resource_3_emotion_wheel.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      speaker: "Lina NGUERELESSIO"
    }
  ];

  const STATIC_BOOKS: Book[] = [
    {
      title: "Parler pour que les enfants écoutent, écouter pour qu'ils parlent",
      author: "Adèle Faber & Elaine Mazlish",
      rating: "⭐⭐⭐⭐⭐ Excellent repère de développement",
      desc: "Une oeuvre phare offrant des outils visuels et extrêmement pratiques pour surmonter l'opposition infantile sans heurts ni humiliations répétées.",
      benefits: ["Pragmatique", "Illustrations concrètes", "Focalisé sur l'écoute active"],
      img: "/images/extra_children_reading.jpg"
    },
    {
      title: "L'intelligence émotionnelle de l'enfant",
      author: "John Gottman",
      rating: "⭐⭐⭐⭐⭐ Recommandé par l'université",
      desc: "Une mine d'or scientifique expliquant le processus neurologique d'accueil des émotions négatives pour guider l'enfant vers d'excellentes capacités d'autorégulation sociale.",
      benefits: ["Basé sur les neurosciences", "Analyse de cas pratiques", "Idéal pour tous âges"],
      img: "/images/extra_grandmother_storytelling.jpg"
    },
    {
      title: "Élever ses enfants dans la grâce",
      author: "Lina NGUERELESSIO (Recommandation thématique)",
      rating: "⭐⭐⭐⭐⭐ Standard Divin au Foyer",
      desc: "Un excellent ouvrage pour concilier les apports cliniques de la psychologie contemporaine et les précieux fondements de l'amour inconditionnel.",
      benefits: ["Dimension spirituelle", "Adapté au rythme moderne", "Plein de sagesse"],
      img: "/images/resource_2_emotion_journal.jpg"
    }
  ];

  const [videos, setVideos] = useState<VideoFile[]>(STATIC_VIDEOS);
  const [books, setBooks] = useState<Book[]>(STATIC_BOOKS);

  useEffect(() => {
    publicApi.videos().then(data => {
      if (data.length > 0) setVideos(data as unknown as VideoFile[]);
    });
    publicApi.books().then(data => {
      if (data.length > 0) {
        setBooks((data as unknown as (Book & { benefits: unknown })[]).map(b => ({
          ...b,
          benefits: typeof b.benefits === 'string' ? JSON.parse(b.benefits) : b.benefits,
        })) as Book[]);
      }
    });
  }, []);

  const triggerDownload = (fileName: string) => {
    setDownloadSuccess(fileName);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

  return (
    <div className="pt-24 min-h-screen bg-bg relative">
      {/* Decors Blur Layer */}
      <div className="absolute top-[10%] right-0 w-80 h-80 bg-mint/40 rounded-full filter blur-3xl opacity-30 -z-10 animate-pulse"></div>
      
      {/* Intro Header Top Section */}
      <section className="py-20 md:py-24 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint border border-lead-green/10 text-lead-green font-friendly font-semibold text-xs mb-6 shadow-xs"
        >
          <BookOpen size={13} className="text-[#ff9d00] animate-bounce" />
          <span>La Boîte à Outils de Développement & Ressources Précieuses</span>
        </motion.div>
        
        <div className="relative inline-block">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-friendly font-bold text-lead-green tracking-tight mb-6">
            La Bibliothèque des <br />
            <span className="text-coral underline decoration-[#ff9d00] decoration-wavy">Joyaux Précieux</span>
          </h1>
          {/* Floating spinning Wisdom Owl */}
          <motion.div 
            className="absolute -top-12 -right-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.3, rotate: 360 }}
          >
            🦉
          </motion.div>
          {/* Floating spinning Playful Puppy */}
          <motion.div 
            className="absolute -bottom-6 -left-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.3 }}
          >
            🐶
          </motion.div>
        </div>
        
        <p className="text-base sm:text-lg text-lead-green/75 max-w-2xl mx-auto font-friendly font-semibold leading-relaxed">
          Toutes nos fiches psycho-éducatives gratuites, capsules vidéo de guidance pour parents pressés, enregistrements vidéo précieux et littérature jeunesse sélectionnée.
        </p>
      </section>

      {/* Grid Filter Tab Links */}
      <div className="px-6 pb-6 overflow-x-auto scrollbar-none flex justify-center gap-2.5 max-w-5xl mx-auto mb-16">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-3 rounded-2xl text-xs font-bold font-friendly tracking-wide whitespace-nowrap cursor-pointer transition-all border flex items-center gap-2 ${
              activeCategory === cat.id 
                ? 'bg-lead-green text-white border-lead-green shadow-md' 
                : 'bg-white text-lead-green/70 border-lead-green/10 hover:border-lead-green/30 hover:bg-white'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Bedtime stories carousel widget */}
      {activeCategory === 'tous' && (
        <div className="mb-20">
          <StorySpinner />
        </div>
      )}

      {/* PDF download success floating banner */}
      <AnimatePresence>
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-99 bg-lead-green border border-white/20 px-6 py-4 rounded-full text-white font-friendly font-bold text-xs sm:text-sm flex items-center gap-3.5 shadow-2xl"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
              <Check size={12} className="text-white" />
            </div>
            <span>Fiche téléchargée avec succès : <strong>{downloadSuccess}</strong></span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="px-6 lg:px-12 pb-32 max-w-[90rem] mx-auto space-y-24">
        
        {/* Section Audio Minutes Précieuses */}
        {(activeCategory === 'tous' || activeCategory === 'audio') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            className="border-t border-lead-green/10 pt-12"
          >
            {/* Video Capsules is dynamically embedded here with full functionality */}
            <VideoCapsules />
          </motion.div>
        )}

        {/* Section PDF Fiches Guides */}
        {(activeCategory === 'tous' || activeCategory === 'pdf') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            className="border-t border-lead-green/10 pt-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 px-6">
              <div className="max-w-xl text-left">
                <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-3 flex items-center gap-1.5 font-friendly">
                  <FileText size={12} className="text-coral" /> Guides Pratiques de Poche
                </span>
                <h2 className="text-3xl md:text-5xl font-friendly font-bold text-lead-green">
                  Fiches Psycho-éducatives
                </h2>
              </div>
            </div>

            {/* Practical Tools list containing PDFs */}
            <div className="px-6">
              <PracticalTools />
            </div>
          </motion.div>
        )}

        {/* Section Vidéos */}
        {(activeCategory === 'tous' || activeCategory === 'video') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            className="border-t border-lead-green/10 pt-12"
          >
            <div className="max-w-xl text-left mb-12 px-6">
              <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-3 flex items-center gap-1.5 font-friendly">
                <Video size={12} className="text-coral" /> Conférences, Décryptages & Partages
              </span>
              <h2 className="text-3xl md:text-5xl font-friendly font-bold text-lead-green">
                Enregistrements Vidéo
              </h2>
            </div>

            {/* Dynamic Interactive Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
              {videos.map((vid, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => setSelectedVideo(vid)}
                  className="bg-white border border-lead-green/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/9] bg-lead-green overflow-hidden">
                    <img 
                      src={vid.img} 
                      alt={vid.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#e05a47] text-white flex items-center justify-center shadow-lg group-hover:bg-[#ff9d00] group-hover:scale-105 transition-all">
                        <Play size={20} className="fill-current text-white ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-[10px] font-mono font-bold">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-between font-friendly">
                    <div>
                      <span className="text-[10px] font-bold text-coral uppercase tracking-wider block mb-1">
                        CONFÉRENCE • {vid.category}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-lead-green mb-3 leading-snug group-hover:text-coral transition-colors line-clamp-1">
                        {vid.title}
                      </h3>
                      <p className="text-xs md:text-sm text-lead-green/70 font-semibold leading-relaxed line-clamp-2">
                        {vid.desc}
                      </p>
                    </div>

                    <p className="border-t border-lead-green/10 mt-6 pt-4 text-[11px] font-semibold text-lead-green/50">
                      Intervenant : {vid.speaker} • Format Éducatif
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section Livres Recommandés */}
        {(activeCategory === 'tous' || activeCategory === 'livre') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            className="border-t border-lead-green/10 pt-12"
          >
            <div className="max-w-xl text-left mb-12 px-6">
              <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-3 flex items-center gap-1.5 font-friendly">
                <BookOpen size={12} className="text-coral" /> Recommandations Thématiques Littéraires du Cabinet
              </span>
              <h2 className="text-3xl md:text-5xl font-friendly font-bold text-lead-green">
                Livres Conseillés
              </h2>
            </div>

            {/* Books Literature Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6">
              {books.map((book, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 6 }}
                  className="bg-white border border-lead-green/5 p-6 rounded-[2.5rem] flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-full sm:w-1/3 aspect-[3/4] sm:aspect-auto rounded-2xl overflow-hidden bg-mint shrink-0">
                    <img 
                      src={book.img} 
                      alt={book.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between font-friendly py-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#ff9d00] uppercase tracking-wide block mb-1">
                        📚 Recommandation
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-lead-green tracking-tight leading-tight mb-1">
                        {book.title}
                      </h3>
                      <span className="text-xs text-lead-green/55 font-bold block mb-3">
                        Auteur : {book.author}
                      </span>
                      <p className="text-xs md:text-sm text-lead-green/70 font-semibold leading-relaxed mb-4">
                        {book.desc}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-coral/80 uppercase tracking-wider mb-2">✦ Bénéfices clés :</p>
                      <div className="flex flex-wrap gap-1.5">
                        {book.benefits.map((ben, i) => (
                          <span key={i} className="text-[9px] font-bold text-lead-green/80 bg-mint/55 border border-lead-green/10 px-2.5 py-1 rounded-full uppercase">
                            {ben}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </section>

      {/* Video Preview Streaming Mock Player Overlay */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 bg-[#121b16]/80 backdrop-blur-md z-99 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#1a2520] border-2 border-lead-green/30 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fake Video Player Screen */}
              <div className="aspect-[16/9] bg-black flex items-center justify-center relative w-full overflow-hidden">
                <img 
                  src={selectedVideo.img} 
                  alt={selectedVideo.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                  referrerPolicy="no-referrer"
                />
                
                {/* Streaming visualizer lines to bring UI to life */}
                <div className="absolute inset-x-0 top-0 p-6 bg-gradient-to-b from-black/80 to-transparent text-white flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ff9d00] flex items-center gap-1">
                    <Sparkles size={11} className="animate-spin" /> Lecture en cours
                  </span>
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="text-center z-10 p-6">
                  <div className="w-16 h-16 rounded-full bg-coral/90 border border-white/20 text-white flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                    <Play size={20} className="fill-current text-white ml-1" />
                  </div>
                  <p className="text-xs font-mono font-bold text-white/50 bg-black/50 px-3 py-1 rounded-full inline-block mt-4 border border-white/5">
                    Simulation de flux vidéo • Lina NGUERELESSIO Guidance
                  </p>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white/80 font-mono text-xs flex justify-between items-center">
                  <span>00:00 / {selectedVideo.duration}</span>
                  <div className="w-1/2 h-1 bg-white/20 rounded-full relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1/10 bg-coral"></div>
                  </div>
                </div>
              </div>

              {/* Video Info Block */}
              <div className="p-8 sm:p-10 font-friendly text-white">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#ff9d00] mb-3">
                  {selectedVideo.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed font-semibold mb-6">
                  {selectedVideo.desc}
                </p>
                <div className="flex justify-between items-center pt-5 border-t border-white/10 text-xs text-white/60">
                  <span>Présenté par {selectedVideo.speaker}</span>
                  <button
                    onClick={() => {
                      triggerDownload(selectedVideo.title + ".mp4");
                      setSelectedVideo(null);
                    }}
                    className="flex items-center gap-1.5 px-4.5 py-2.5 bg-white text-lead-green font-bold uppercase rounded-full hover:bg-[#ff9d00] hover:text-white transition-colors cursor-pointer"
                  >
                    <Download size={12} /> Télécharger l'enregistrement
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
