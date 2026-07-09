import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { auth } from './lib/auth';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ArticlesAdmin } from './pages/ArticlesAdmin';
import { VideosAdmin } from './pages/VideosAdmin';
import { VideoRecoAdmin } from './pages/VideoRecoAdmin';
import { AudioAdmin } from './pages/AudioAdmin';
import { RessourcesAdmin } from './pages/RessourcesAdmin';
import { LivresAdmin } from './pages/LivresAdmin';
import { FaqAdmin } from './pages/FaqAdmin';
import { TemoignagesAdmin } from './pages/TemoignagesAdmin';
import { AccompagnementsAdmin } from './pages/AccompagnementsAdmin';
import { EmailsAdmin } from './pages/EmailsAdmin';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated()) navigate('/admin', { replace: true });
  }, [navigate]);
  return auth.isAuthenticated() ? <>{children}</> : null;
}

const G = ({ children }: { children: React.ReactNode }) => (
  <RequireAuth>{children}</RequireAuth>
);

export function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<G><Dashboard /></G>} />
      <Route path="/articles" element={<G><ArticlesAdmin /></G>} />
      <Route path="/videos" element={<G><VideosAdmin /></G>} />
      <Route path="/recommendations" element={<G><VideoRecoAdmin /></G>} />
      <Route path="/audio" element={<G><AudioAdmin /></G>} />
      <Route path="/resources" element={<G><RessourcesAdmin /></G>} />
      <Route path="/books" element={<G><LivresAdmin /></G>} />
      <Route path="/faqs" element={<G><FaqAdmin /></G>} />
      <Route path="/testimonials" element={<G><TemoignagesAdmin /></G>} />
      <Route path="/accompagnements" element={<G><AccompagnementsAdmin /></G>} />
      <Route path="/emails" element={<G><EmailsAdmin /></G>} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
