import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { api } from '../lib/api';
import {
  FileText, Video, Clapperboard, Download, BookOpen,
  HelpCircle, Star, Users, ArrowRight, Youtube, Mail, Sparkles, CalendarCheck
} from 'lucide-react';

const CARDS = [
  { key: 'articles', label: 'Articles', icon: FileText, color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-100', path: '/admin/articles' },
  { key: 'videos', label: 'Vidéos', icon: Video, color: 'bg-blue-50 text-blue-700', border: 'border-blue-100', path: '/admin/videos' },
  { key: 'recommendations', label: 'Vidéos recommandées', icon: Youtube, color: 'bg-red-50 text-red-700', border: 'border-red-100', path: '/admin/recommendations' },
  { key: 'video_capsules', label: 'Capsules Vidéo', icon: Clapperboard, color: 'bg-purple-50 text-purple-700', border: 'border-purple-100', path: '/admin/video-capsules' },
  { key: 'resources', label: 'Ressources PDF', icon: Download, color: 'bg-orange-50 text-orange-700', border: 'border-orange-100', path: '/admin/resources' },
  { key: 'books', label: 'Livres', icon: BookOpen, color: 'bg-amber-50 text-amber-700', border: 'border-amber-100', path: '/admin/books' },
  { key: 'stories', label: 'Histoires', icon: Sparkles, color: 'bg-purple-50 text-purple-700', border: 'border-purple-100', path: '/admin/stories' },
  { key: 'faqs', label: 'FAQ', icon: HelpCircle, color: 'bg-cyan-50 text-cyan-700', border: 'border-cyan-100', path: '/admin/faqs' },
  { key: 'testimonials', label: 'Témoignages', icon: Star, color: 'bg-yellow-50 text-yellow-700', border: 'border-yellow-100', path: '/admin/testimonials' },
  { key: 'pillars', label: 'Accompagnements', icon: Users, color: 'bg-rose-50 text-rose-700', border: 'border-rose-100', path: '/admin/accompagnements' },
  { key: 'bookings', label: 'Réservations', icon: CalendarCheck, color: 'bg-indigo-50 text-indigo-700', border: 'border-indigo-100', path: '/admin/bookings' },
  { key: 'emails', label: 'Emails collectés', icon: Mail, color: 'bg-teal-50 text-teal-700', border: 'border-teal-100', path: '/admin/emails' },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Record<string, number>>({});
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
        <div className="bg-[#1f4a38] text-white rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-1">Bienvenue dans l'espace admin</h2>
          <p className="text-white/70 text-sm">
            Gérez tout le contenu du site Joyaux Précieux — articles, vidéos, capsules, ressources et bien plus.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CARDS.map(({ key, label, icon: Icon, color, border, path }) => (
            <button
              key={key}
              onClick={() => navigate(path)}
              className={`bg-white rounded-2xl border ${border} p-4 text-left hover:shadow-md transition-all group`}
            >
              <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center mb-2`}>
                <Icon size={14} />
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-0.5">
                {loading ? '—' : stats[key] ?? 0}
              </p>
              <p className="text-[11px] text-gray-500 font-medium leading-tight">{label}</p>
              <div className="flex items-center gap-1 text-[#1f4a38] text-[10px] font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Gérer <ArrowRight size={10} />
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Accès rapide</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CARDS.slice(0, 6).map(({ label, path, icon: Icon }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-[#1f4a38]/5 text-sm font-medium text-gray-700 hover:text-[#1f4a38] transition-all text-left"
              >
                <Icon size={14} className="text-gray-400 shrink-0" />
                {label}
                <ArrowRight size={12} className="ml-auto text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
