import { useEffect } from 'react';

interface SEOHandlerProps {
  currentPage: 'accueil' | 'articles' | 'accompagnements' | 'ressources' | 'plan' | 'rdv';
}

export function SEOHandler({ currentPage }: SEOHandlerProps) {
  useEffect(() => {
    // 1. DYNAMIC TITLE AND DESCRIPTION OPTIMIZATION FOR SGE & GOOGLEBOT
    let title = "Joyaux Précieux | Guidance Parentale & Clinique par Lina NGUERELESSIO";
    let description = "Accompagnement clinique et guidance parentale d'inspiration chrétienne par Lina Nguere_lessio. Découvrez nos outils psycho-éducatifs, fiches cliniques et ressources pour l'épanouissement de vos enfants.";
    let canonicalSuffix = "";

    switch (currentPage) {
      case 'accueil':
        title = "Joyaux Précieux | Psychologie du Développement & Guidance Parentale Chrétienne";
        description = "Médiation des foyers et écoute clinique par Lina Nguere_lessio. Accompagner l'épanouissement psycho-éducatif et spirituel de vos enfants avec grâce.";
        canonicalSuffix = "";
        break;
      case 'articles':
        title = "La Tribune Littéraire | Articles et Décryptages Cliniques | Joyaux Précieux";
        description = "Fiches de psychologie de l'enfant, routines sécurisantes de retour à la maison, gestion de l'isolement chez l'adolescent et éducation bienveillante.";
        canonicalSuffix = "#articles";
        break;
      case 'accompagnements':
        title = "Accompagnement Clinique & Guidance Familiale | Joyaux Précieux";
        description = "Prestations de médiation des foyers, écoute active, et plans psycho-éducatifs sur-mesure pour pacifier la relation parents-enfants.";
        canonicalSuffix = "#accompagnements";
        break;
      case 'ressources':
        title = "Ressources Psycho-éducatives & Boîte à Outils | Joyaux Précieux";
        description = "Fiches cliniques téléchargeables gratuites, capsules vidéo de guidance pour parents pressés, enregistrements vidéo et littérature jeunesse.";
        canonicalSuffix = "#ressources";
        break;
      case 'plan':
        title = "Le Standard Divin | Principes Cliniques & Spirituels | Joyaux Précieux";
        description = "Découvrez notre boussole éducative unissant les neurosciences affectives de l'enfant aux repères spirituels sains de la grâce chrétienne.";
        canonicalSuffix = "#plan";
        break;
      case 'rdv':
        title = "Prendre Rendez-vous | Consultation de Guidance Familiale | Lina N.";
        description = "Prenez rendez-vous en ligne pour une première séance de contact gratuite de 15 minutes. Échangeons en toute bienveillance.";
        canonicalSuffix = "#rdv";
        break;
    }

    // Update Document Title
    document.title = title;

    // Update Meta Description
    let metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (!metaDescriptionEl) {
      metaDescriptionEl = document.createElement('meta');
      metaDescriptionEl.setAttribute('name', 'description');
      document.head.appendChild(metaDescriptionEl);
    }
    metaDescriptionEl.setAttribute('content', description);

    // Update OpenGraph Title & Description for Social and AI Search crawlers
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update Canonical URL
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    const currentBaseUrl = "https://joyauxprecieux.fr";
    canonicalEl.setAttribute('href', `${currentBaseUrl}/${canonicalSuffix}`);

    // 2. PHASE 2: JSON-LD SCHEMAS GENERATION (EEAT & RICH SNIPPETS)
    // Remove existing dynamic JSON-LD script if any
    const existingScript = document.getElementById('dynamic-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    // Build perfect contextual JSON-LD Schemas based on currentPage
    const schemas: any[] = [];

    // Core Business & Founder schema (Organization & Person) always present to build brand entity
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${currentBaseUrl}/#organization`,
      "name": "Joyaux Précieux",
      "url": currentBaseUrl,
      "logo": `${currentBaseUrl}/logo.png`,
      "description": "Plateforme clinique et spirituelle de guidance parentale chrétienne fondée par Lina NGUERELESSIO.",
      "founder": {
        "@type": "Person",
        "name": "Lina NGUERELESSIO",
        "jobTitle": "Psychologue du Développement (stg) & Accompagnatrice Parentale",
        "knowsAbout": ["Child Psychology", "Parental Guidance", "Clinical Mediation", "Family Counseling"]
      }
    };
    schemas.push(organizationSchema);

    // Page-specific Schemas
    if (currentPage === 'accueil') {
      // LocalBusiness / MedicalBusiness for clinical consultations
      schemas.push({
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "@id": `${currentBaseUrl}/#localbusiness`,
        "name": "Joyaux Précieux - Lina NGUERELESSIO",
        "image": `${currentBaseUrl}/og-image.jpg`,
        "url": currentBaseUrl,
        "telephone": "+33000000000",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "48.8566",
          "longitude": "2.3522"
        },
        "priceRange": "$$",
        "medicalSpecialty": "Pediatrics",
        "description": "Cabinet d'écoute clinique, soutien de guidance parentale et médiation familiale en ligne ou visioconférence.",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "19:00"
        }
      });
      // NB: FAQPage rich snippet is injected dynamically by FAQSection from the
      // live dashboard questions (see FAQSection.tsx) so every added question is indexed.
    }

    if (currentPage === 'articles') {
      // Collection of actual blog posts for rich SEO ingestion
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${currentBaseUrl}/#blog`,
        "name": "La Tribune Littéraire de Joyaux Précieux",
        "description": "Fiches psycho-éducatives de psychologie de l'enfant et de l'adolescent d'inspiration chrétienne.",
        "publisher": {
          "@type": "Organization",
          "name": "Joyaux Précieux"
        },
        "blogPost": [
          {
            "@type": "BlogPosting",
            "headline": "Mon adolescent s’isole : comprendre son repli et rebâtir le lien verbal",
            "description": "Comprendre cliniquement le retrait d'un adolescent, instaurer des sas d'écoute mutuelle sans forcer le passage, et l'accompagner vers son identité profonde.",
            "datePublished": "2026-05-10",
            "author": {
              "@type": "Person",
              "name": "Lina NGUERELESSIO"
            }
          },
          {
            "@type": "BlogPosting",
            "headline": "Mettre en place des routines sécurisantes de retour à la maison",
            "description": "L'importance des rituels de transition psychologiques pour abaisser le niveau de vigilance et d'anxiété de l'enfant de retour chez lui après sa journée scolaire.",
            "datePublished": "2026-05-25",
            "author": {
              "@type": "Person",
              "name": "Lina NGUERELESSIO"
            }
          },
          {
            "@type": "BlogPosting",
            "headline": "Gérer la rivalité fraternelle et la jalousie au quotidien",
            "description": "Des outils de guidance bienveillante inspirés des neurosciences affectives pour pacifier les débordements relationnels entre frères et sœurs.",
            "datePublished": "2026-05-18",
            "author": {
              "@type": "Person",
              "name": "Lina NGUERELESSIO"
            }
          }
        ]
      });
    }

    if (currentPage === 'accompagnements') {
      // Service Schema for authoritative indexation
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Guidance Parentale & Médiation Clinique",
        "provider": {
          "@type": "Person",
          "name": "Lina NGUERELESSIO"
        },
        "description": "Soutien sur-mesure combinant écoute clinique approfondie des processus familiaux et repères spirituels sains de la grâce pour accompagner l'éveil de vos précieux enfants.",
        "areaServed": "FR",
        "offers": {
          "@type": "Offer",
          "description": "Prise de contact gratuite de 15 minutes suivie de consultations personnalisées en visioconférence."
        }
      });
    }

    if (currentPage === 'ressources') {
      // CreativeWork for educational tools
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Boîte à Outils Psycho-éducatifs",
        "description": "Ressources cliniques et fiches pratiques à télécharger gratuitement pour accompagner l'éducation et l'harmonie des foyers.",
        "hasPart": [
          {
            "@type": "CreativeWork",
            "name": "La Mallette de l'Éveil",
            "description": "Fiches psycho-éducatives téléchargeables gratuitement sur l'autonomie, l'expression saine et la résilience émotionnelle."
          },
          {
            "@type": "VideoObject",
            "name": "Capsules Vidéo de Guidance",
            "description": "Enregistrements vidéo éducatifs courts pour guider les parents pressés vers des relations sereines."
          }
        ]
      });
    }

    // Inject compiled JSON-LD scripts in head tag
    const scriptEl = document.createElement('script');
    scriptEl.id = 'dynamic-jsonld';
    scriptEl.type = 'application/ld+json';
    scriptEl.innerHTML = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    document.head.appendChild(scriptEl);

  }, [currentPage]);

  return null;
}
