import { Video } from 'lucide-react';

// Turn any supported video URL into an embeddable form, or detect a direct file.
function toEmbed(url: string): { kind: 'youtube' | 'vimeo' | 'file' | 'none'; src: string } {
  if (!url) return { kind: 'none', src: '' };

  // Direct uploaded file (R2 via our API) or any direct video file extension
  if (url.includes('/api/files/') || /\.(mp4|webm|mov|m4v|ogg)(\?|$)/i.test(url)) {
    return { kind: 'file', src: url };
  }

  // YouTube — watch?v=, youtu.be/, shorts/, embed/
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: 'youtube', src: `https://www.youtube.com/embed/${yt[1]}` };

  // Vimeo
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: 'vimeo', src: `https://player.vimeo.com/video/${vm[1]}` };

  return { kind: 'none', src: '' };
}

interface VideoPlayerProps {
  url: string;
  poster?: string;
  className?: string;
}

// Renders a real, playable video for uploaded files and YouTube/Vimeo links.
// Falls back to a clear "not available" state when the URL is empty/unsupported.
export function VideoPlayer({ url, poster, className = '' }: VideoPlayerProps) {
  const { kind, src } = toEmbed(url);

  if (kind === 'file') {
    return (
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        className={`w-full h-full object-contain bg-black ${className}`}
      />
    );
  }

  if (kind === 'youtube' || kind === 'vimeo') {
    return (
      <iframe
        src={src}
        title="Lecteur vidéo"
        className={`w-full h-full ${className}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-[#121b16] text-white/60 gap-3 ${className}`}>
      <Video size={28} />
      <span className="text-xs font-mono">Vidéo bientôt disponible</span>
    </div>
  );
}
