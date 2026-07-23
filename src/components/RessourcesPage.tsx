import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, BookOpen, Video, FileText, X } from 'lucide-react';
import { VideoCapsules } from './VideoCapsules';
import { PracticalTools } from './PracticalTools';
import { StorySpinner } from './StorySpinner';
import { VideoPlayer } from './VideoPlayer';
import { publicApi } from '../lib/publicApi';

interface VideoItem {
  title: string;
  desc: string;
  url: string;
  img: string;
  category: string;
  speaker: string;
  duration: string;
  source: 'video' | 'reco';
}

interface Book {
  title: string;
  author: string;
  rating: string;
  desc: string;
  benefits: string[];
  img: string;
  link: string;
  link_type: string;
}

export function RessourcesPage() {
  const [activeCategory, setActiveCategory] = useState<'tous' | 'capsules' | 'video' | 'pdf' | 'livre'>('tous');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const categories = [
    { id: 'tous', label: 'Tout explorer', icon: '🚀' },
    { id: 'capsules', label: 'Minutes Précieuses', icon: '🎬' },
    { id: 'video', label: 'Vidéos & Conférences', icon: '🎥' },
    { id: 'pdf', label: 'Guides & Fiches PDF', icon: '📥' },
    { id: 'livre', label: 'Livres Recommandés', icon: '📚' },
  ];

  useEffect(() => {
    // Merge "Vidéos & Conférences" and "Vidéos Recommandées" into a single group.
    Promise.all([publicApi.videos(), publicApi.recommendations()]).then(([vids, recos]) => {
      const a: VideoItem[] = (vids as any[]).map(v => ({
        title: String(v.title ?? ''),
        desc: String(v.desc ?? ''),
        url: String(v.url ?? ''),
        img: String(v.img ?? ''),
        category: String(v.category ?? 'Conférence'),
        speaker: String(v.speaker ?? 'Lina NGUERELESSIO'),
        duration: String(v.duration ?? ''),
        source: 'video',
      }));
      const b: VideoItem[] = (recos as any[]).map(v => ({
        title: String(v.title ?? ''),
        desc: String(v.desc ?? ''),
        url: String(v.url ?? ''),
        img: String(v.thumbnail ?? ''),
        category: String(v.platform ?? 'Recommandé'),
        speaker: 'Sélection de Lina',
        duration: '',
        source: 'reco',
      }));
      setVideos([...a, ...b]);
    });

    publicApi.books().then(data => {
      setBooks((data as any[]).map(bk => ({
        title: String(bk.title ?? ''),
        author: String(bk.author ?? ''),
        rating: String(bk.rating ?? ''),
        desc: String(bk.desc ?? ''),
        benefits: typeof bk.benefits === 'string' ? safeParse(bk.benefits) : (bk.benefits ?? []),
        img: String(bk.img ?? ''),
        link: String(bk.link ?? ''),
        link_type: String(bk.link_type ?? 'buy'),
      })));
    });
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-bg relative">
      <div className="absolute top-[10%] right-0 w-80 h-80 bg-mint/40 rounded-full filter blur-3xl opacity-30 -z-10 animate-pulse"></div>

      {/* Intro Header */}
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
          <motion.div
            className="absolute -top-12 -right-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.3, rotate: 360 }}
          >🦉</motion.div>
          <motion.div
            className="absolute -bottom-6 -left-12 text-4xl hidden sm:block cursor-pointer select-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            whileHover={{ scale: 1.3 }}
          >🐶</motion.div>
        </div>

        <p className="text-base sm:text-lg text-lead-green/75 max-w-2xl mx-auto font-friendly font-semibold leading-relaxed">
          Toutes nos fiches psycho-éducatives gratuites, capsules vidéo de guidance pour parents pressés, enregistrements vidéo précieux et littérature jeunesse sélectionnée.
        </p>
      </section>

      {/* Filter tabs */}
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

      {/* Therapeutic stories carousel */}
      {activeCategory === 'tous' && (
        <div className="mb-20">
          <StorySpinner />
        </div>
      )}

      <section className="px-6 lg:px-12 pb-32 max-w-[90rem] mx-auto space-y-24">

        {/* Minutes Précieuses (capsules) */}
        {(activeCategory === 'tous' || activeCategory === 'capsules') && (
          <div className="border-t border-lead-green/10 pt-12">
            <VideoCapsules />
          </div>
        )}

        {/* PDF fiches */}
        {(activeCategory === 'tous' || activeCategory === 'pdf') && (
          <div className="border-t border-lead-green/10 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 px-6">
              <div className="max-w-xl text-left">
                <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-3 flex items-center gap-1.5 font-friendly">
                  <FileText size={12} className="text-coral" /> Guides Pratiques de Poche
                </span>
                <h2 className="text-3xl md:text-5xl font-friendly font-bold text-lead-green">Fiches Psycho-éducatives</h2>
              </div>
            </div>
            <div className="px-6">
              <PracticalTools />
            </div>
          </div>
        )}

        {/* Vidéos & Conférences (videos + recommendations grouped) */}
        {(activeCategory === 'tous' || activeCategory === 'video') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="border-t border-lead-green/10 pt-12"
          >
            <div className="max-w-xl text-left mb-12 px-6">
              <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-3 flex items-center gap-1.5 font-friendly">
                <Video size={12} className="text-coral" /> Conférences, Décryptages & Sélections
              </span>
              <h2 className="text-3xl md:text-5xl font-friendly font-bold text-lead-green">Vidéos & Recommandations</h2>
            </div>

            {videos.length === 0 ? (
              <EmptyState label="Les vidéos seront bientôt publiées ici." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {videos.map((vid, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, scale: 1.01 }}
                    onClick={() => setSelectedVideo(vid)}
                    className="bg-white border border-lead-green/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="relative aspect-[16/9] bg-lead-green overflow-hidden">
                      {vid.img ? (
                        <img src={vid.img} alt={vid.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1f4a38] text-white/40"><Video size={32} /></div>
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#e05a47] text-white flex items-center justify-center shadow-lg group-hover:bg-[#ff9d00] group-hover:scale-105 transition-all">
                          <Play size={20} className="fill-current text-white ml-1" />
                        </div>
                      </div>
                      {vid.source === 'reco' && (
                        <span className="absolute top-4 left-4 bg-[#ff9d00] text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide">Recommandé</span>
                      )}
                      {vid.duration && (
                        <span className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-[10px] font-mono font-bold">{vid.duration}</span>
                      )}
                    </div>
                    <div className="p-7 flex-grow flex flex-col justify-between font-friendly">
                      <div>
                        <span className="text-[10px] font-bold text-coral uppercase tracking-wider block mb-1">{vid.category}</span>
                        <h3 className="text-lg font-bold text-lead-green mb-3 leading-snug group-hover:text-coral transition-colors line-clamp-2">{vid.title}</h3>
                        {vid.desc && <p className="text-xs md:text-sm text-lead-green/70 font-semibold leading-relaxed line-clamp-2">{vid.desc}</p>}
                      </div>
                      <p className="border-t border-lead-green/10 mt-6 pt-4 text-[11px] font-semibold text-lead-green/50">{vid.speaker}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Livres */}
        {(activeCategory === 'tous' || activeCategory === 'livre') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="border-t border-lead-green/10 pt-12"
          >
            <div className="max-w-xl text-left mb-12 px-6">
              <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-3 flex items-center gap-1.5 font-friendly">
                <BookOpen size={12} className="text-coral" /> Recommandations Littéraires du Cabinet
              </span>
              <h2 className="text-3xl md:text-5xl font-friendly font-bold text-lead-green">Livres Conseillés</h2>
            </div>

            {books.length === 0 ? (
              <EmptyState label="Les recommandations de lecture seront bientôt publiées ici." />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6">
                {books.map((book, idx) => (
                  <motion.div key={idx} whileHover={{ x: 6 }} className="bg-white border border-lead-green/5 p-6 rounded-[2.5rem] flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="w-full sm:w-1/3 aspect-[3/4] sm:aspect-auto rounded-2xl overflow-hidden bg-mint shrink-0">
                      {book.img && <img src={book.img} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                    </div>
                    <div className="flex-grow flex flex-col justify-between font-friendly py-2">
                      <div>
                        <span className="text-[10px] font-bold text-[#ff9d00] uppercase tracking-wide block mb-1">📚 Recommandation</span>
                        <h3 className="text-lg md:text-xl font-bold text-lead-green tracking-tight leading-tight mb-1">{book.title}</h3>
                        <span className="text-xs text-lead-green/55 font-bold block mb-3">Auteur : {book.author}</span>
                        <p className="text-xs md:text-sm text-lead-green/70 font-semibold leading-relaxed mb-4">{book.desc}</p>
                      </div>
                      {book.benefits.length > 0 && (
                        <div className="mb-4">
                          <p className="text-[11px] font-bold text-coral/80 uppercase tracking-wider mb-2">✦ Bénéfices clés :</p>
                          <div className="flex flex-wrap gap-1.5">
                            {book.benefits.map((ben, i) => (
                              <span key={i} className="text-[9px] font-bold text-lead-green/80 bg-mint/55 border border-lead-green/10 px-2.5 py-1 rounded-full uppercase">{ben}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {book.link && (
                        <a
                          href={book.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lead-green text-white text-[11px] font-bold uppercase tracking-wider hover:bg-highlight transition-colors shadow-sm w-fit"
                        >
                          {book.link_type === 'download' ? '📥 Télécharger gratuitement' : '🛒 Se procurer le livre'}
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </section>

      {/* Video player modal — real playback for files & YouTube/Vimeo */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 bg-[#121b16]/80 backdrop-blur-md z-99 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              className="bg-[#1a2520] border-2 border-lead-green/30 w-full max-w-3xl rounded-[2rem] overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-5 py-3 bg-black/40 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-[#ff9d00] flex items-center gap-1.5">
                  <Video size={12} /> {selectedVideo.category}
                </span>
                <button onClick={() => setSelectedVideo(null)} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="aspect-[16/9] bg-black w-full">
                <VideoPlayer url={selectedVideo.url} poster={selectedVideo.img} />
              </div>

              <div className="p-8 font-friendly text-white">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#ff9d00] mb-3">{selectedVideo.title}</h3>
                {selectedVideo.desc && <p className="text-sm text-white/80 leading-relaxed font-semibold mb-6">{selectedVideo.desc}</p>}
                <div className="flex justify-between items-center pt-5 border-t border-white/10 text-xs text-white/60">
                  <span>{selectedVideo.speaker}</span>
                  {!selectedVideo.url && (
                    <a
                      href={`https://wa.me/237621479061?text=${encodeURIComponent(`Bonjour, je souhaite être averti(e) de la sortie de la vidéo « ${selectedVideo.title} ».`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 bg-white/10 border border-white/20 text-white font-bold uppercase rounded-full hover:bg-white hover:text-lead-green transition-colors text-[11px]"
                    >
                      Être averti(e) par WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="mx-6 text-center py-16 bg-white rounded-[2.5rem] border border-dashed border-lead-green/15 max-w-xl md:mx-auto p-8">
      <p className="text-3xl mb-3">✨</p>
      <p className="text-sm text-lead-green/60 font-friendly font-semibold">{label}</p>
    </div>
  );
}

function safeParse(s: string): string[] {
  try { const v = JSON.parse(s); return Array.isArray(v) ? v : []; } catch { return []; }
}
