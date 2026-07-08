-- Seed initial data for Joyaux Précieux
-- Run: wrangler d1 execute joyaux-precieux --file=worker/seed.sql

-- Articles
INSERT INTO articles (title, desc, content, tag, date, read_time, img, author, role, featured) VALUES
(
  'Mon adolescent s''isole : comprendre son repli et rebâtir le lien verbal',
  'Dans un monde hyperconnecté aux écrans mais de plus en plus isolé verbalement, comment appréhender cliniquement le retrait d''un ado, instaurer des sas d''écoute mutuelle sans forcer le passage, et l''accompagner vers son identité profonde.',
  'Le retrait de l''adolescent dans sa chambre est l''un des motifs de consultation de guidance familiale les plus fréquents.

### Individuation contre Détresse
L''adolescent normal a besoin de s''extraire de l''espace parental pour expérimenter de nouvelles limites et construire sa propre personnalité. Cependant, si ce retrait s''accompagne d''un changement brusque d''humeur, d''une baisse dramatique des résultats scolaires, ou d''une rupture complète de tout dialogue, la frontière avec un mal-être est franchie.

### Recommandations d''intervention
1. Prenez acte sans harceler : Évitez de crier contre sa chambre fermée.
2. Instaurez de nouveaux prétextes de partage : Un trajet en voiture, une sortie à deux.
3. Mettez en relation avec un tiers bienveillant : conseiller, mentor d''église ou psychologue.',
  'Adolescents & Foi',
  '10 Mai 2026',
  '8 min de lecture',
  '/images/article_3_father_teenager.jpg',
  'Lina NGUERELESSIO',
  'Psychologue du Développement (stg)',
  1
),
(
  'Mettre en place des routines sécurisantes de retour à la maison',
  'L''importance des rituels de transition psychologiques pour abaisser le niveau de vigilance et d''anxiété de l''enfant de retour chez lui après sa journée scolaire.',
  'Le moment du retour à la maison après l''école est souvent une zone de turbulence majeure au sein des foyers.

### Pourquoi cette période est-elle critique ?
Tout au long de sa journée scolaire, l''enfant accumule du stress et contient ses émotions. En rentrant chez lui, le sentiment de sécurité qu''il éprouve auprès de ses parents libère cette charge de fatigue contenue.

### Plan d''action préconisé
1. Le sas de décompression silencieux : Accordez 15 minutes libres sans questions intrusives.
2. La collation réconfortante : Offrez un encas équilibré qui stabilise la glycémie.
3. Un temps de reconnexion physique : Un câlin prolongé de 20 secondes sécrète de l''ocytocine.',
  'Psychologie',
  '25 Mai 2026',
  '4 min de lecture',
  '/images/article_1_mother_speaking.jpg',
  'Lina NGUERELESSIO',
  'Psychologue du Développement (stg)',
  0
),
(
  'Gérer la rivalité fraternelle et la jalousie au quotidien',
  'Des outils de guidance bienveillante inspirés des neurosciences affectives pour pacifier les débordements relationnels entre frères et sœurs.',
  'La jalousie fraternelle est un sentiment archaïque, tout à fait naturel, mais souvent très déstabilisant pour l''harmonie du foyer.

### Comprendre le message caché de la jalousie
Lorsqu''un enfant s''en prend à son frère ou à sa sœur, sa peur fondamentale n''est pas de partager ses jouets, mais de perdre sa part exclusive de l''amour de ses parents.

### Pratiques de guidance
- Bannir les comparaisons : "Regarde comme ton frère est sage" amplifie le sentiment d''injustice.
- Du temps individuel et exclusif : 10 minutes par jour avec chaque enfant.
- Accueillir la frustration : Validez son ressenti en formulant ses besoins.',
  'Parentalité',
  '18 Mai 2026',
  '5 min de lecture',
  '/images/article_2_wooden_toys.jpg',
  'Lina NGUERELESSIO',
  'Psychologue du Développement (stg)',
  0
),
(
  'Éduquer avec grâce : conjuguer Foi et repères psycho-éducatifs',
  'Comment allier une théologie saine de la grâce divine avec les limites bienveillantes indispensables aux enfants.',
  'De nombreux parents croyants se sentent parfois déchirés entre une vision spirituelle et des enseignements psycho-éducatifs modernes. Pourtant, ces deux dimensions ne s''opposent pas.

### La Grâce n''est pas la permissivité
La Grâce n''est pas l''absence de règles, mais une manière de rétablir la relation d''amour après la transgression de la règle.

### Les piliers d''un foyer ancré
- Remplacer la culpabilisation par le pardon mutuel.
- Instaurer la discipline restauratrice.
- La foi par l''exemple : les enfants imitent ce que nous faisons.',
  'Spiritualité',
  '03 Mai 2026',
  '6 min de lecture',
  '/images/article_4_family_reading_bible.jpg',
  'Lina NGUERELESSIO',
  'Guidance Familiale',
  0
),
(
  'L''art des limites constructives : l''alternative positive aux fessées',
  'Analyser scientifiquement l''impact négatif des châtiments corporels et découvrir les méthodes éprouvées d''encadrement par la fermeté affectueuse.',
  'Fixer des limites est une nécessité absolue pour le développement cognitif et émotionnel de l''enfant.

### L''impact cérébral des violences physiques
Les études en neuro-imagerie démontrent que toute violence physique répétée déclenche un état de stress toxique chronique. La fessée n''apprend pas la leçon morale, elle apprend simplement à craindre de se faire attraper.

### Comment imposer son autorité sereinement ?
- Consignes claires en phrases affirmatives.
- Conséquence logique et réparation.
- Le renforcement positif fréquent.',
  'Psychologie',
  '28 Avril 2026',
  '5 min de lecture',
  '/images/target_1_gentle_parenting.jpg',
  'Lina NGUERELESSIO',
  'Psychologue du Développement (stg)',
  0
),
(
  'Gérer l''impact des écrans de 0 à 6 ans : Préserver l''attention',
  'Comment les stimulations visuelles excessives modifient l''architecture cérébrale des tout-petits et comment réagir sainement pour stimuler leur langage.',
  'L''exposition précoce et prolongée des jeunes enfants aux écrans est devenue l''un des plus grands défis de notre décennie.

### Pourquoi les écrans captivent-ils autant ?
Les écrans diffusent des flux d''images ultra-rapides, des sons rythmés et des couleurs saturées qui provoquent des décharges répétées de dopamine dans le cerveau immature de l''enfant.

### Comment instaurer des limites saines ?
1. Appliquer la règle des 3-6-9-12.
2. Zéro écran le matin et avant le coucher.
3. Proposer des alternatives interactives.',
  'Psychologie',
  '12 Avril 2026',
  '6 min de lecture',
  '/images/extra_children_reading.jpg',
  'Lina NGUERELESSIO',
  'Psychologue du Développement (stg)',
  0
),
(
  'Le rituel du coucher : Créer un sanctuaire de paix pour la nuit',
  'Découvrez comment un enchaînement de gestes simples et affectueux apaise le système nerveux de l''enfant et favorise la paix spirituelle du soir.',
  'Le moment du coucher cristallise souvent les tensions accumulées au cours de la journée.

### Le sommeil : une affaire de transition affective
Pour s''endormir, le cerveau de l''enfant a besoin de passer en mode de relaxation profonde. Si le coucher est perçu comme une rupture brutale, le cortisol augmente, rendant l''endormissement impossible.

### Construire un rituel apaisant en 4 étapes
- L''extinction des feux progressifs.
- Le temps du conte ou du souvenir.
- Le sas de gratitude : 3 belles choses de la journée.
- La bénédiction du soir.',
  'Parentalité',
  '05 Avril 2026',
  '5 min de lecture',
  '/images/extra_grandmother_storytelling.jpg',
  'Lina NGUERELESSIO',
  'Guidance Familiale',
  0
),
(
  'L''écoute empathique : Fondement du Standard Divin au sein du couple',
  'Comment l''harmonie du couple de parents influence directement la sécurité affective des enfants, et comment cultiver un espace de parole authentique.',
  'La première sécurité d''un enfant réside dans la solidité et la paix de l''alliance de ses parents.

### Le concept de résonance émotionnelle
L''enfant possède des neurones miroirs très actifs. Il ressent instantanément la nervosité, la froideur ou la colère latente entre ses parents.

### Les clés cliniques pour un dialogue renouvelé
- L''écoute sans interrompre.
- Parler en "Je" plutôt qu''en accusations.
- La prière de reconnexion pour les couples croyants.',
  'Spiritualité',
  '28 Mars 2026',
  '7 min de lecture',
  '/images/article_4_family_reading_bible.jpg',
  'Lina NGUERELESSIO',
  'Guidance Familiale',
  0
);

-- Vidéos
INSERT INTO videos (title, duration, desc, category, img, url, speaker) VALUES
('Gestion saine de l''autorité parentale : Comment poser un cadre clair', '12:45', 'Une mini-conférence psycho-éducative sur les neurosciences cognitives appliquées et la mise en place d''un protocole d''autorité positive au foyer.', 'Parentalité', '/images/african_family_outdoor.jpg', '', 'Lina NGUERELESSIO'),
('Foi & Santé Mentale : Protéger l''esprit de nos préadolescents', '18:20', 'Analyse croisée sur l''anxiété moderne, les pressions sociales des réseaux de communication et l''ancrage spirituel salvateur d''un foyer de grâce.', 'Adolescents & Foi', '/images/african_family_reading.jpg', '', 'Lina NGUERELESSIO'),
('L''importance cruciale de l''éveil ludique de 0 à 3 ans', '10:15', 'Pourquoi les interactions précoces et les jeux de manipulation sensori-motrice posent les fondations de l''intelligence cognitive et émotionnelle.', 'Parentalité', '/images/resource_1_guide_pdf.jpg', '', 'Lina NGUERELESSIO'),
('Instaurer le pardon mutuel et la grâce au quotidien', '15:40', 'Une étude psycho-spirituelle montrant comment restaurer le lien affectif après une crise ou une colère familiale.', 'Spiritualité', '/images/african_family_outdoor.jpg', '', 'Lina NGUERELESSIO');

-- Livres
INSERT INTO books (title, author, rating, desc, benefits, img) VALUES
('Parler pour que les enfants écoutent, écouter pour qu''ils parlent', 'Adèle Faber & Elaine Mazlish', '⭐⭐⭐⭐⭐ Excellent repère de développement', 'Une oeuvre phare offrant des outils visuels et extrêmement pratiques pour surmonter l''opposition infantile sans heurts ni humiliations répétées.', '["Pragmatique","Illustrations concrètes","Focalisé sur l''écoute active"]', '/images/extra_children_reading.jpg'),
('L''intelligence émotionnelle de l''enfant', 'John Gottman', '⭐⭐⭐⭐⭐ Recommandé par l''université', 'Une mine d''or scientifique expliquant le processus neurologique d''accueil des émotions négatives pour guider l''enfant vers d''excellentes capacités d''autorégulation sociale.', '["Basé sur les neurosciences","Analyse de cas pratiques","Idéal pour tous âges"]', '/images/extra_grandmother_storytelling.jpg'),
('Élever ses enfants dans la grâce', 'Lina NGUERELESSIO (Recommandation thématique)', '⭐⭐⭐⭐⭐ Standard Divin au Foyer', 'Un excellent ouvrage pour concilier les apports cliniques de la psychologie contemporaine et les précieux fondements de l''amour inconditionnel.', '["Dimension spirituelle","Adapté au rythme moderne","Plein de sagesse"]', '/images/resource_2_emotion_journal.jpg');

-- PDF Resources
INSERT INTO pdf_resources (title, desc, type, color, accent, badge, img) VALUES
('La Boussole des Émotions', 'Une fiche psycho-éducative basée sur les Psaumes pour aider l''enfant à nommer sa colère, sa tristesse et sa joie devant Dieu.', '📥 KIT PDF À IMPRIMER', 'bg-mint border-lead-green/10', 'text-lead-green', '🌱 Psychologie de l''enfant', '/images/resource_2_emotion_journal.jpg'),
('Planning de Vacances Utiles', '7 jours de routines équilibrées alliant sport, repos, ateliers de créativité et rendez-vous spirituels bénis.', '📥 GUIDE PRATIQUE', 'bg-yellow-bg border-highlight/10', 'text-[#ff9d00]', '🗓️ Routine & Camps', '/images/resource_1_guide_pdf.jpg'),
('Le Code de Grâce & Vérité', 'Un protocole en 3 étapes clefs pour résoudre les disputes entre frères et sœurs selon les enseignements d''Éphésiens 4.', '📥 FICHE DE DISCIPLINE SANS PROBLÈME', 'bg-[#fbebeb] border-coral/10', 'text-coral', '🙏 Conseils Bibliques', '/images/resource_3_discipline_cards.jpg'),
('La Météo Personnelle du Foyer', 'Un kit de dialogue familial hebdomadaire pour permettre à chacun d''exprimer son humeur, ses besoins et ses motifs de prière.', '📥 KIT DE DIALOGUE INTERACTIF', 'bg-mint border-lead-green/10', 'text-lead-green', '☀️ Expression libre', '/images/resource_1_guide_pdf.jpg'),
('Le Tableau des Petits Pas', 'Une fiche de renforcement positif et bienveillant pour guider l''autonomie et valoriser chaque effort quotidien de l''enfant.', '📥 COMPTEUR DE RÉUSSITES', 'bg-yellow-bg border-highlight/10', 'text-[#ff9d00]', '🌟 Autonomie & Estime', '/images/resource_2_emotion_journal.jpg');

-- FAQs
INSERT INTO faqs (question, answer, order_idx) VALUES
('Comment se déroule la première séance d''écoute active ?', 'La première prise de contact est gratuite et dure environ 15 minutes par appel ou message WhatsApp. C''est un moment convivial où vous m''exposez brièvement les blocages émotionnels ou de communication de votre foyer. Nous convenons ensuite d''une feuille de route pour de futures séances de guidance personnalisées.', 0),
('Les séances d''accompagnement peuvent-elles se dérouler en visioconférence ?', 'Tout à fait ! Pour faciliter l''organisation des parents pressés et dépasser les frontières régionales, la quasi-totalité de mes guidances ont lieu en visioconférence (Google Meet, Zoom) ou par appel vocal de haute qualité, offrant une flexibilité totale.', 1),
('Quelle est la différence entre l''accompagnement psycho-éducatif et une thérapie classique ?', 'Alors qu''une thérapie classique explore en profondeur le passé, l''accompagnement psycho-éducatif est orienté solution, action et immédiateté. Nous mettons en place des protocoles concrets à appliquer à la maison : cadres d''écrans, tables d''émotions, rituels de coucher.', 2),
('Comment intégrez-vous précisément la foi dans vos séances de guidance ?', 'La foi chrétienne forme le socle spirituel de ma vision de l''harmonie familiale. J''associe ainsi les vérités éternelles des Écritures aux découvertes éprouvées de la Psychologie du Développement moderne. Mes espaces d''écoute accueillent tout le monde sans aucun esprit de jugement.', 3);

-- Témoignages
INSERT INTO testimonials (text, author, role, rating, img) VALUES
('« Nous étions dans une impasse de communication. Grâce aux séances de guidance parentale et à l''écoute active, Lucas a pu mettre des mots sur son anxiété scolaire. Le dialogue est restauré. »', 'Sarah', 'Maman de Lucas (14 ans)', 5, '/images/avatar_1_young_mother.jpg'),
('« Trouver des activités psycho-éducatives qui éveillent l''intelligence émotionnelle de mon garçon tout en respectant notre foi chrétienne était un défi. Grâce aux séances de guidance de Lina, l''harmonie est de retour d''une façon extraordinaire ! »', 'Hortense M.', 'Maman de Noé (7 ans)', 5, '/images/avatar_3_grandparent.jpg'),
('« Les fiches de guidance et la routine d''écoute des Minutes Précieuses ont transformé l''ambiance à la maison. Les tensions ont baissé de moitié. On communique enfin avec vérité et avec grâce. »', 'Jean-Eudes K.', 'Père de deux ados (13 et 15 ans)', 5, '/images/avatar_2_father.jpg');

-- Piliers de service
INSERT INTO pillars (title, desc, icon, badge, time, order_idx) VALUES
('Consultations en Psychologie du Développement de l''enfant', 'Prise en charge spécialisée pour identifier les blocages cognitifs, les peurs infantiles, la gestion de la colère divine et les troubles légers du développement ou du sommeil.', '🌱', 'Individuel • Enfants', '45 min par séance', 0),
('Guidance Parentale & Cellules de Médiation', 'Sessions destinées aux parents pour redéfinir une autorité bienveillante et ferme, désamorcer les conflits, et harmoniser la foi avec les règles de vie de la maison.', '👪', 'Famille & Couple', '60 min par séance', 1),
('Écoute Active CONFIDENTIELLE pour Adolescents', 'Sas d''échanges sécurisés pour les préadolescents et adolescents confrontés au repli sur soi, à l''addiction aux écrans ou à de profondes interrogations identitaires.', '🤫', 'Soutien Confidentiel', '50 min par séance', 2);

-- Étapes méthodologie
INSERT INTO methodology_steps (ref, title, desc, order_idx) VALUES
('01', 'Premier entretien d''orientation', 'Nous faisons le point en profondeur sur l''historique du foyer de manière globale, sans jugement, pour poser les bases de la confiance.', 0),
('02', 'Analyse psychologique fine', 'Nous identifions les freins de communication à la lumière de la Psychologie du Développement positive et de l''équilibre spirituel.', 1),
('03', 'Plan d''action restaurateur', 'Mise en place de rituels de transition, fiches de routines, cadres réparateurs à tester et réévaluer ensemble en séances régulières.', 2);

-- Capsules audio
INSERT INTO audio_capsules (title, duration, duration_sec, speaker, desc, bg_color, accent, badge) VALUES
('Désamorcer une crise de colère en public', '04:00', 240, 'Lina NGUERELESSIO', 'Des repères psycho-éducatifs immédiats pour calmer le débordement émotionnel sans utiliser la violence ou les cris devant les regards extérieurs.', 'bg-mint', 'text-lead-green', '👶 Petite Enfance • 4 min'),
('Mon ado s''isole : comment réagir sans braquer ?', '05:00', 300, 'Lina NGUERELESSIO', 'Comprendre les frontières de l''intimité d''un adolescent et recréer un espace d''écoute sain et serein au sein de la maison.', 'bg-yellow-bg', 'text-[#ff9d00]', '🧑 Adolescence • 5 min'),
('Mettre en place des limites saines sans crier', '03:30', 210, 'Lina NGUERELESSIO', 'Comment asseoir une autorité bienveillante et ferme en transmettant de l''assurance et la paix à vos enfants.', 'bg-[#fbebeb]', 'text-coral', '👪 Guidance • 3 min 30'),
('Éveiller l''intelligence émotionnelle par le jeu quotidien', '03:15', 195, 'Lina NGUERELESSIO', 'Trois petits exercices ludiques et concrets à insérer dans le quotidien pour apprendre à votre enfant à accueillir et apprivoiser ses émotions.', 'bg-mint', 'text-lead-green', '👶 Éveil & Jeux • 3 min 15'),
('La bénédiction du soir : cultiver la paix avant la nuit', '04:00', 240, 'Lina NGUERELESSIO', 'Un accompagnement spirituel doux pour libérer les craintes de l''enfant et ancrer la confiance divine au moment du dodo.', 'bg-yellow-bg', 'text-[#ff9d00]', '🌙 Spiritualité • 4 min');
