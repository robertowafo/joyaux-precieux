import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { api } from '../lib/api';
import { FileText, Video, Music, Download, BookOpen, HelpCircle, Star, Users, ArrowRight } from 'lucide-react';

interface Stats {
  articles: number;
  videos: number;
  audio: number;
  resources: number;
  books: number;
  faqs: number;
  testimonials: number;
  pillars: number;
}

const CARDS = [
  { key: 'articles', label: 'Articles', icon: FileText, color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-100', path: '/admin/articles' },
  { key: 'videos', label: 'Vidéos', icon: Video, color: 'bg-blue-50 text-blue-700', border: 'border-blue-100', path: '/admin/videos' },
  { key: 'audio', label: 'Capsules Audio', icon: Music, color: 'bg-purple-50 text-purple-700', border: 'border-purple-100', path: '/admin/audio' },
  { key: 'resources', label: 'Ressources PDF', icon: Download, color: 'bg-orange-50 text-orange-700', border: 'border-orange-100', path: '/admin/resources' },
  { key: 'books', label: 'Livres', icon: BookOpen, color: 'bg-amber-50 text-amber-700', border: 'border-amber-100', path: '/admin/books' },
  { key: 'faqs', label: 'FAQ', icon: HelpCircle, color: 'bg-cyan-50 text-cyan-700', border: 'border-cyan-100', path: '/admin/faqs' },
  { key: 'testimonials', label: 'Témoignages', icon: Star, color: 'bg-yellow-50 text-yellow-700', border: 'border-yellow-100', path: '/admin/testimonials' },
  { key: 'pillars', label: 'Accompagnements', icon: Users, color: 'bg-rose-50 text-rose-700', border: 'border-rose-100', path: '/admin/accompagnements' },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Partial<Stats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.stats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="Tableau de bord">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-[#1f4a38] text-white rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-1">Bienvenue dans l'espace admin 👋</h2>
          <p className="text-white/70 text-sm">
            Gérez tout le contenu du site Joyaux Précieux depuis ce tableau de bord.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CARDS.map(({ key, label, icon: Icon, color, border, path }) => (
            <button
              key={key}
              onClick={() => navigate(path)}
              className={`bg-white rounded-2xl border ${border} p-5 text-left hover:shadow-md transition-all group`}
            >
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mb-3`}>
                <Icon size={16} />
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-0.5">
                {loading ? '—' : (stats as Record<string, number>)[key] ?? 0}
              </p>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <div className="flex items-center gap-1 text-[#1f4a38] text-[11px] font-bold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                Gérer <ArrowRight size={11} />
              </div>
            </button>
          ))}
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Accès rapide</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CARDS.slice(0, 4).map(({ label, path, icon: Icon }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-[#1f4a38]/5 text-sm font-medium text-gray-700 hover:text-[#1f4a38] transition-all text-left"
              >
                <Icon size={15} className="text-gray-400" />
                {label}
                <ArrowRight size={13} className="ml-auto text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
