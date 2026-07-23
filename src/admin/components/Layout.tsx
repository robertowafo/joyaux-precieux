import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../lib/auth';
import {
  LayoutDashboard, FileText, Video, Clapperboard, Download,
  BookOpen, HelpCircle, Star, Users, LogOut, Menu,
  ChevronRight, Youtube, Mail, Sparkles, CalendarCheck
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Articles', path: '/admin/articles', icon: FileText },
  { label: 'Vidéos', path: '/admin/videos', icon: Video },
  { label: 'Vidéos Recommandées', path: '/admin/recommendations', icon: Youtube },
  { label: 'Capsules Vidéo', path: '/admin/video-capsules', icon: Clapperboard },
  { label: 'Ressources PDF', path: '/admin/resources', icon: Download },
  { label: 'Livres', path: '/admin/books', icon: BookOpen },
  { label: 'Histoires Thérapeutiques', path: '/admin/stories', icon: Sparkles },
  { label: 'FAQ', path: '/admin/faqs', icon: HelpCircle },
  { label: 'Témoignages', path: '/admin/testimonials', icon: Star },
  { label: 'Accompagnements', path: '/admin/accompagnements', icon: Users },
  { label: 'Réservations', path: '/admin/bookings', icon: CalendarCheck },
  { label: 'Emails', path: '/admin/emails', icon: Mail },
];

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    auth.logout();
    navigate('/admin');
    window.location.reload();
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen flex bg-[#f4f6f4] font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#1f4a38] text-white flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ff9d00] flex items-center justify-center text-white font-bold text-sm">
              JP
            </div>
            <div>
              <p className="font-bold text-sm leading-none">Joyaux Précieux</p>
              <p className="text-white/50 text-[10px] mt-0.5 uppercase tracking-wider">Administration</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ label, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => { navigate(path); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left group ${
                isActive(path)
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon
                size={15}
                className={isActive(path) ? 'text-[#ff9d00]' : 'text-white/40 group-hover:text-white/70'}
              />
              <span className="flex-1 text-sm">{label}</span>
              {isActive(path) && <ChevronRight size={13} className="text-[#ff9d00]" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut size={15} />
            Se déconnecter
          </button>
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[11px] text-white/40 hover:text-white/70 transition-colors mt-1"
          >
            ↗ Voir le site public
          </a>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-base font-bold text-[#1f4a38] flex-1">{title}</h1>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-7 h-7 rounded-full bg-[#1f4a38] text-white flex items-center justify-center text-[10px] font-bold">
              A
            </div>
            <span className="hidden sm:inline">Admin</span>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
