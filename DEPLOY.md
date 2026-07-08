# Guide de déploiement — Joyaux Précieux

## 1. Installation des dépendances

```bash
npm install
```

## 2. Créer la base de données Cloudflare D1

```bash
# Créer la BD (note le database_id retourné)
npm run db:create

# Copier le database_id dans wrangler.toml
# Remplacez REPLACE_WITH_DATABASE_ID_AFTER_CREATION
```

## 3. Initialiser la base de données

```bash
# Appliquer le schéma (local dev)
npm run db:migrate

# Insérer les données initiales (local dev)
npm run db:seed

# Pour la production
npm run db:migrate:prod
npm run db:seed:prod
```

## 4. Configurer les secrets

```bash
# Mot de passe admin
wrangler secret put ADMIN_PASSWORD
# → Entrez votre mot de passe admin

# Secret token
wrangler secret put ADMIN_SECRET
# → Entrez une longue chaîne aléatoire (ex: sk_joyaux_prod_xyz123...)
```

Pour le développement local, créez un fichier `.dev.vars` :
```env
ADMIN_PASSWORD=joyaux2026admin
ADMIN_SECRET=sk_joyaux_precieux_2026_change_this_secret
```

## 5. Développement local

Lancez le Worker et le frontend en parallèle :

```bash
# Terminal 1 : Worker Cloudflare
npm run worker:dev

# Terminal 2 : Frontend Vite
npm run dev
```

L'admin est accessible sur : http://localhost:3000/admin

## 6. Déploiement en production

```bash
# Déployer le Worker
npm run worker:deploy

# Récupérer l'URL du Worker (ex: https://joyaux-precieux-api.votre-compte.workers.dev)
# Créer un fichier .env.production :
echo "VITE_API_URL=https://joyaux-precieux-api.votre-compte.workers.dev/api" > .env.production

# Builder le frontend
npm run build

# Le dossier dist/ peut être déployé sur Cloudflare Pages, Vercel, Netlify, etc.
```

## Structure du Dashboard Admin

| URL | Section |
|-----|---------|
| `/admin` | Connexion |
| `/admin/dashboard` | Vue d'ensemble |
| `/admin/articles` | Gestion des articles |
| `/admin/videos` | Gestion des vidéos |
| `/admin/audio` | Capsules audio |
| `/admin/resources` | Guides PDF |
| `/admin/books` | Livres recommandés |
| `/admin/faqs` | FAQ |
| `/admin/testimonials` | Témoignages |
| `/admin/accompagnements` | Services & Méthodologie |

## API Endpoints

| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/api/auth` | Connexion admin |
| GET | `/api/stats` | Compteurs par table |
| GET | `/api/articles` | Liste des articles |
| POST | `/api/articles` | Créer un article (auth requis) |
| PUT | `/api/articles/:id` | Modifier un article (auth requis) |
| DELETE | `/api/articles/:id` | Supprimer un article (auth requis) |

*(même pattern pour: videos, audio, resources, books, faqs, testimonials, pillars, steps)*
