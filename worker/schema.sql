-- Articles de blog
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  desc TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL DEFAULT 'Psychologie',
  date TEXT NOT NULL,
  read_time TEXT NOT NULL DEFAULT '5 min de lecture',
  img TEXT NOT NULL DEFAULT '/images/article_1_mother_speaking.jpg',
  author TEXT NOT NULL DEFAULT 'Lina NGUERELESSIO',
  role TEXT NOT NULL DEFAULT 'Psychologue du Développement (stg)',
  featured INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Vidéos & Conférences
CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  duration TEXT NOT NULL DEFAULT '10:00',
  desc TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Parentalité',
  img TEXT NOT NULL DEFAULT '/images/african_family_outdoor.jpg',
  url TEXT NOT NULL DEFAULT '',
  speaker TEXT NOT NULL DEFAULT 'Lina NGUERELESSIO',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Livres recommandés
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  rating TEXT NOT NULL DEFAULT '⭐⭐⭐⭐⭐',
  desc TEXT NOT NULL,
  benefits TEXT NOT NULL DEFAULT '[]',
  img TEXT NOT NULL DEFAULT '/images/extra_children_reading.jpg',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Guides & Fiches PDF
CREATE TABLE IF NOT EXISTS pdf_resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  desc TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT '📥 KIT PDF À IMPRIMER',
  color TEXT NOT NULL DEFAULT 'bg-mint border-lead-green/10',
  accent TEXT NOT NULL DEFAULT 'text-lead-green',
  badge TEXT NOT NULL DEFAULT '🌱 Psychologie de l''enfant',
  img TEXT NOT NULL DEFAULT '/images/resource_2_emotion_journal.jpg',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_idx INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Témoignages
CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  img TEXT NOT NULL DEFAULT '/images/avatar_1_young_mother.jpg',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Piliers de service (Accompagnements)
CREATE TABLE IF NOT EXISTS pillars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  desc TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '🌱',
  badge TEXT NOT NULL DEFAULT 'Individuel',
  time TEXT NOT NULL DEFAULT '45 min par séance',
  order_idx INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Étapes méthodologie
CREATE TABLE IF NOT EXISTS methodology_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref TEXT NOT NULL,
  title TEXT NOT NULL,
  desc TEXT NOT NULL,
  order_idx INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Emails collectés (newsletter / contact)
CREATE TABLE IF NOT EXISTS emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'newsletter',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Vidéos recommandées (liens externes)
CREATE TABLE IF NOT EXISTS video_recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'YouTube',
  desc TEXT NOT NULL DEFAULT '',
  thumbnail TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Capsules audio (Minutes Précieuses)
CREATE TABLE IF NOT EXISTS audio_capsules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  duration TEXT NOT NULL DEFAULT '04:00',
  duration_sec INTEGER NOT NULL DEFAULT 240,
  speaker TEXT NOT NULL DEFAULT 'Lina NGUERELESSIO',
  desc TEXT NOT NULL,
  bg_color TEXT NOT NULL DEFAULT 'bg-mint',
  accent TEXT NOT NULL DEFAULT 'text-lead-green',
  badge TEXT NOT NULL DEFAULT '👶 Petite Enfance • 4 min',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
