import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Sparkles, Video as VideoIcon } from 'lucide-react';
import { publicApi } from '../lib/publicApi';

interface Capsule {
  id: number;
  title: string;
  duration: string;
  duration_sec: number;
  speaker: string;
  desc: string;
  bg_color: string;
  accent: string;
  badge: string;
  video_url: string;
}

export function VideoCapsules() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [capsules, setCapsules] = useState<Capsule[]>([]);

  useEffect(() => {
    publicApi.videoCapsules().then(data => {
      setCapsules(data as unknown as Capsule[]);
    });
  }, []);

  const current = capsules[currentIdx];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) el.pause();
    else el.play().catch(() => {});
  };

  const handleCapsuleSelect = (idx: number) => {
    setCurrentIdx(idx);
    setProgress(0);
    setCurrentTime('00:00');
    setIsPlaying(true);
  };

  const handleNext = () => {
    handleCapsuleSelect((currentIdx + 1) % capsules.length);
  };

  const handlePrev = () => {
    handleCapsuleSelect((currentIdx - 1 + capsules.length) % capsules.length);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    setProgress(newVal);
    const el = videoRef.current;
    if (el && el.duration) {
      el.currentTime = (newVal / 100) * el.duration;
    }
  };

  if (capsules.length === 0 || !current) {
    return (
      <section id="audio" className="py-16 md:py-24 px-6 lg:px-12 max-w-[90rem] mx-auto border-t border-lead-green/10 bg-bg">
        <div className="text-center max-w-xl mx-auto">
          <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-4 flex items-center gap-1.5 font-friendly justify-center">
            <VideoIcon size={12} className="text-coral" /> Les Minutes Précieuses
          </span>
          <h2 className="text-3xl md:text-4xl font-friendly font-bold tracking-tight text-lead-green mb-4">Des capsules vidéo pour les parents pressés</h2>
          <div className="mt-6 py-14 bg-white rounded-[2.5rem] border border-dashed border-lead-green/15">
            <p className="text-3xl mb-3">🎬</p>
            <p className="text-sm text-lead-green/60 font-friendly font-semibold">Les premières capsules vidéo arrivent très bientôt.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="audio" className="py-24 md:py-36 px-6 lg:px-12 max-w-[90rem] mx-auto border-t border-lead-green/10 bg-bg">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

        {/* Left description column */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          <span className="uppercase text-[11px] font-bold tracking-[0.25em] text-coral mb-4 flex items-center gap-1.5 font-friendly">
            <VideoIcon size={12} className="text-coral" />
            Les Minutes Précieuses
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-friendly font-bold tracking-tight text-lead-green leading-[1.05] mb-6">
            Des capsules vidéo <br />
            pour les <span className="text-coral underline decoration-[#ff9d00] decoration-wavy">parents pressés</span> !
          </h2>

          <p className="text-base md:text-lg text-lead-green/80 font-medium font-friendly leading-relaxed mb-8 max-w-xl">
            La majorité des parents manquent de temps pour lire d'épais manuels d'éducation. Ces courtes capsules vidéo de 3 à 5 minutes vous fournissent des repères rapides, visuels et rassurants à regarder entre deux tâches ou en fin de soirée.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-md">
             {capsules.map((cap, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCapsuleSelect(idx)}
                  className={`p-4.5 rounded-2.5xl border text-left font-friendly transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    currentIdx === idx
                      ? 'bg-white border-[#ff9d00] shadow-md scale-[1.01]'
                      : 'bg-white/60 border-lead-green/5 hover:border-lead-green/20 hover:bg-white'
                  }`}
                >
                   <div className="flex gap-4.5 items-center">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg ${
                        currentIdx === idx ? 'bg-coral text-white' : 'bg-mint text-lead-green'
                      }`}>
                         {idx === 0 ? '🎥' : idx === 1 ? '📹' : '▶️'}
                      </div>
                      <div>
                         <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-0.5">
                            Capsule #{idx + 1}
                         </span>
                         <h4 className="font-bold text-sm md:text-base text-lead-green tracking-tight leading-tight">
                            {cap.title}
                         </h4>
                      </div>
                   </div>
                   <span className="text-xs font-bold text-lead-green/50 font-mono shrink-0 ml-4">
                      {cap.duration}
                   </span>
                </button>
             ))}
          </div>
        </div>

        {/* Right Integrated Video Player with Glassmorphic design — portrait, phone-style */}
        <div className="w-full lg:w-1/2 flex justify-center items-center py-6">
          <div className="w-full max-w-[300px] sm:max-w-xs bg-white border border-lead-green/5 p-6 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col items-center">

             <div className="absolute top-0 left-0 w-32 h-32 bg-[#ff9d00]/5 rounded-full filter blur-3xl"></div>

             <span className="text-[10px] font-bold tracking-widest text-[#e05a47] uppercase mb-6 font-friendly bg-[#faf2f0] px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#ff9d00]" /> LECTEUR VIDÉO PRÉCIEUX
             </span>

             {/* Video screen — portrait 9:16, matching phone-recorded footage */}
             <div className="relative w-full aspect-[9/16] mb-6 rounded-[2rem] overflow-hidden bg-[#121b16] shadow-2xl">
                {current.video_url ? (
                  <video
                    key={current.id}
                    ref={videoRef}
                    src={current.video_url}
                    muted={muted}
                    autoPlay={isPlaying}
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={e => {
                      const el = e.currentTarget;
                      if (el.duration) {
                        setProgress((el.currentTime / el.duration) * 100);
                        setCurrentTime(formatTime(el.currentTime));
                      }
                    }}
                    onEnded={handleNext}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#ff9d00] bg-[#1f4a38] flex items-center justify-center">
                      <img
                        src="/images/hero_5_psychologist.jpg"
                        alt="Lina NGUERELESSIO"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )}

                {!isPlaying && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors cursor-pointer"
                  >
                    <span className="w-16 h-16 rounded-full bg-[#e05a47] text-white flex items-center justify-center shadow-lg">
                      <Play size={22} className="fill-current text-white ml-1" />
                    </span>
                  </button>
                )}

                <button
                  onClick={() => setMuted(m => !m)}
                  className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
             </div>

             {/* Capsule Playing Info */}
             <div className="text-center font-friendly px-4">
                <span className="text-[11px] font-bold text-coral/85 uppercase tracking-wider block mb-1">
                   {current.badge}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-lead-green leading-snug line-clamp-1">
                   {current.title}
                </h3>
                <span className="text-xs font-semibold text-lead-green/50 tracking-wider block mt-1">
                   Par {current.speaker}
                </span>
                <p className="text-xs text-lead-green/70 font-semibold leading-normal mt-3 max-w-[280px] mx-auto opacity-80 h-12 overflow-hidden italic">
                   "{current.desc}"
                </p>
             </div>

             {/* Progress tracker */}
             <div className="w-full mt-6 px-1 flex flex-col gap-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  className="w-full h-1.5 bg-lead-green/10 rounded-lg appearance-none cursor-pointer accent-[#ff9d00]"
                />
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-lead-green/55">
                   <span>{currentTime}</span>
                   <span>{current.duration}</span>
                </div>
             </div>

             {/* Playback action controls bar */}
             <div className="flex items-center gap-7 mt-6">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-lead-green/5 bg-bg hover:bg-lead-green hover:text-white flex items-center justify-center transition-all cursor-pointer text-lead-green text-sm shadow-sm"
                >
                   <SkipBack size={14} className="fill-current" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="w-16 h-16 rounded-full bg-[#e05a47] text-white flex items-center justify-center hover:bg-lead-green hover:scale-105 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                   {isPlaying ? (
                     <Pause size={24} className="fill-current text-white ml-0" />
                   ) : (
                     <Play size={24} className="fill-current text-white ml-1" />
                   )}
                </button>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-lead-green/5 bg-bg hover:bg-lead-green hover:text-white flex items-center justify-center transition-all cursor-pointer text-lead-green text-sm shadow-sm"
                >
                   <SkipForward size={14} className="fill-current" />
                </button>
             </div>

          </div>
        </div>

      </div>
    </section>
  );
}
