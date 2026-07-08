import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { auth } from './lib/auth';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ArticlesAdmin } from './pages/ArticlesAdmin';
import { VideosAdmin } from './pages/VideosAdmin';
import { AudioAdmin } from './pages/AudioAdmin';
import { RessourcesAdmin } from './pages/RessourcesAdmin';
import { LivresAdmin } from './pages/LivresAdmin';
import { FaqAdmin } from './pages/FaqAdmin';
import { TemoignagesAdmin } from './pages/TemoignagesAdmin';
import { AccompagnementsAdmin } from './pages/AccompagnementsAdmin';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated()) navigate('/admin', { replace: true });
  }, [navigate]);
  return auth.isAuthenticated() ? <>{children}</> : null;
}

export function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/articles" element={<RequireAuth><ArticlesAdmin /></RequireAuth>} />
      <Route path="/videos" element={<RequireAuth><VideosAdmin /></RequireAuth>} />
      <Route path="/audio" element={<RequireAuth><AudioAdmin /></RequireAuth>} />
      <Route path="/resources" element={<RequireAuth><RessourcesAdmin /></RequireAuth>} />
      <Route path="/books" element={<RequireAuth><LivresAdmin /></RequireAuth>} />
      <Route path="/faqs" element={<RequireAuth><FaqAdmin /></RequireAuth>} />
      <Route path="/testimonials" element={<RequireAuth><TemoignagesAdmin /></RequireAuth>} />
      <Route path="/accompagnements" element={<RequireAuth><AccompagnementsAdmin /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
