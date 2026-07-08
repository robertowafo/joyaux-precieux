import { useState } from 'react';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<'accueil' | 'articles' | 'accompagnements' | 'ressources' | 'plan' | 'rdv'>('accueil');

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
