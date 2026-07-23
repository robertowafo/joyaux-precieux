import { useState, useEffect, useCallback } from 'react';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { ThreeToys } from './components/ThreeToys';
import { Marquee } from './components/Marquee';
import { Methodology } from './components/Methodology';
import { PublicCibles } from './components/PublicCibles';
import { Features } from './components/Features';
import { CallToAction } from './components/CallToAction';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { GsapDecorations } from './components/GsapDecorations';
import { SEOHandler } from './components/SEOHandler';

// Platform Pages
import { ArticlesPage } from './components/ArticlesPage';
import { AccompagnementsPage } from './components/AccompagnementsPage';
import { RessourcesPage } from './components/RessourcesPage';
import { PlanPage } from './components/PlanPage';
import { RdvPage } from './components/RdvPage';

type Page = 'accueil' | 'articles' | 'accompagnements' | 'ressources' | 'plan' | 'rdv';

// Real, crawlable URLs for each page so search engines can index them separately.
const PAGE_TO_PATH: Record<Page, string> = {
  accueil: '/',
  articles: '/articles',
  accompagnements: '/accompagnements',
  ressources: '/ressources',
  plan: '/standard-divin',
  rdv: '/rendez-vous',
};
const PATH_TO_PAGE: Record<string, Page> = Object.fromEntries(
  Object.entries(PAGE_TO_PATH).map(([page, path]) => [path, page as Page])
) as Record<string, Page>;

function pageFromPath(path: string): Page {
  return PATH_TO_PAGE[path.replace(/\/$/, '') || '/'] ?? 'accueil';
}

export default function App() {
  const [currentPage, setPage] = useState<Page>(() =>
    typeof window !== 'undefined' ? pageFromPath(window.location.pathname) : 'accueil'
  );

  // Navigate = update the URL (real path) and the rendered page, then scroll up.
  const setCurrentPage = useCallback((page: Page) => {
    const path = PAGE_TO_PATH[page];
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
    setPage(page);
    window.scrollTo({ top: 0 });
  }, []);

  // Keep state in sync with browser back/forward navigation.
  useEffect(() => {
    const onPop = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Helper method to render active platform screen
  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return (
          <>
            {/* 1. Hero Section: Émerveillement & Vision */}
            <Hero onNavigate={setCurrentPage} />
            
            {/* 1.5 Interactive 3D Toys Playground with Three.js */}
            <ThreeToys />
            
            {/* Decorative Scroller */}
            <Marquee />
            
            {/* 2. À Propos: Crédibilité & Chiffres */}
            <Methodology onNavigate={setCurrentPage} />
            
            {/* 3. Publics Cibles: Identification rapide */}
            <PublicCibles />
            
            {/* 4. Axes d'Expertise: Services proposés (Aperçu) */}
            <Features />
            
            {/* 5. Témoignages & Appels à l'action */}
            <CallToAction />
            
            {/* 6. FAQ Interactive: Réponses aux doutes */}
            <FAQSection />
          </>
        );
      case 'articles':
        return <ArticlesPage />;
      case 'accompagnements':
        return <AccompagnementsPage />;
      case 'ressources':
        return <RessourcesPage />;
      case 'plan':
        return <PlanPage />;
      case 'rdv':
        return <RdvPage onNavigate={setCurrentPage} />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="bg-[#faf8f2] min-h-screen flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic SEO Handler for Search Generative Experience & Googlebot */}
      <SEOHandler currentPage={currentPage} />
      
      <div>
        {/* Magical child-enchanting animations & floating elements */}
        <GsapDecorations />
        
        {/* Navigation Bar matching the custom theme */}
        <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        {/* Dynamic page container */}
        <main className="relative overflow-x-hidden z-20">
          {renderPage()}
        </main>
      </div>

      {/* Shared Footer containing contact information & links */}
      <Footer />
    </div>
  );
}
