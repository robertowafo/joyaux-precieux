export interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
  ADMIN_PASSWORD: string;
  ADMIN_SECRET: string;
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'X-Content-Type-Options': 'nosniff',
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function requireAuth(request: Request, env: Env): boolean {
  const auth = request.headers.get('Authorization') ?? '';
  return auth.startsWith('Bearer ') && auth.slice(7) === env.ADMIN_SECRET;
}

function clientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP') ?? 'unknown';
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

// True if `ip` has already logged >= maxAttempts for `action` within the window.
async function isRateLimited(
  env: Env,
  ip: string,
  action: string,
  maxAttempts: number,
  windowMinutes: number
): Promise<boolean> {
  // Use SQLite's own datetime() for the window boundary so the format always
  // matches request_log.created_at's default (datetime('now')) — comparing a
  // JS toISOString() string against it is not reliably ordered as text.
  const row = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM request_log WHERE ip = ? AND action = ? AND created_at > datetime('now', '-${windowMinutes} minutes')`
  ).bind(ip, action).first<{ count: number }>();

  // Opportunistic cleanup so the table doesn't grow forever.
  await env.DB.prepare(`DELETE FROM request_log WHERE created_at < datetime('now', '-1 day')`).run();

  return (row?.count ?? 0) >= maxAttempts;
}

async function logAttempt(env: Env, ip: string, action: string): Promise<void> {
  await env.DB.prepare(`INSERT INTO request_log (ip, action) VALUES (?, ?)`).bind(ip, action).run();
}

const TABLE_MAP: Record<string, string> = {
  articles: 'articles',
  videos: 'videos',
  books: 'books',
  resources: 'pdf_resources',
  faqs: 'faqs',
  testimonials: 'testimonials',
  pillars: 'pillars',
  steps: 'methodology_steps',
  video_capsules: 'video_capsules',
  recommendations: 'video_recommendations',
  stories: 'stories',
  bookings: 'bookings',
};

const ALLOWED_COLUMNS: Record<string, string[]> = {
  articles: ['title', 'desc', 'content', 'tag', 'date', 'read_time', 'img', 'author', 'role', 'featured'],
  videos: ['title', 'duration', 'desc', 'category', 'img', 'url', 'speaker'],
  books: ['title', 'author', 'rating', 'desc', 'benefits', 'img', 'link', 'link_type'],
  bookings: ['service', 'date', 'time', 'full_name', 'phone', 'email', 'child_name', 'child_age', 'context', 'orientation', 'status'],
  pdf_resources: ['title', 'desc', 'type', 'color', 'accent', 'badge', 'img', 'file_url'],
  stories: ['emoji', 'title', 'hero', 'teaching', 'story_snippet', 'parent_tip', 'order_idx'],
  faqs: ['question', 'answer', 'order_idx'],
  testimonials: ['text', 'author', 'role', 'rating', 'img'],
  pillars: ['title', 'desc', 'icon', 'badge', 'time', 'order_idx'],
  methodology_steps: ['ref', 'title', 'desc', 'order_idx'],
  video_capsules: ['title', 'duration', 'duration_sec', 'speaker', 'desc', 'bg_color', 'accent', 'badge', 'video_url'],
  video_recommendations: ['title', 'url', 'platform', 'desc', 'thumbnail'],
};

const ALLOWED_EXTENSIONS = [
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
  'mp3', 'wav', 'ogg', 'm4a',
  'mp4', 'webm', 'mov', 'm4v', '3gp',
  'pdf',
];

async function handleResource(
  request: Request,
  env: Env,
  table: string,
  id: string | null
): Promise<Response> {
  const method = request.method;

  if (method === 'GET' && !id) {
    const { results } = await env.DB.prepare(
      `SELECT * FROM ${table} ORDER BY id ASC`
    ).all();
    return json(results);
  }

  if (method === 'GET' && id) {
    const row = await env.DB.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
    if (!row) return json({ error: 'Not found' }, 404);
    return json(row);
  }

  if (!requireAuth(request, env)) return json({ error: 'Unauthorized' }, 401);

  if (method === 'POST') {
    const body = (await request.json()) as Record<string, unknown>;
    const allowed = ALLOWED_COLUMNS[table] ?? [];
    const keys = Object.keys(body).filter(k => allowed.includes(k));
    const values = keys.map(k => body[k]);
    if (keys.length === 0) return json({ error: 'No valid fields' }, 400);
    const placeholders = keys.map(() => '?').join(', ');
    const result = await env.DB.prepare(
      `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`
    ).bind(...values).run();
    return json({ id: result.meta.last_row_id, ...body }, 201);
  }

  if (method === 'PUT' && id) {
    const body = (await request.json()) as Record<string, unknown>;
    const allowed = ALLOWED_COLUMNS[table] ?? [];
    const keys = Object.keys(body).filter(k => allowed.includes(k));
    const values = keys.map(k => body[k]);
    if (keys.length === 0) return json({ error: 'No valid fields' }, 400);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    await env.DB.prepare(
      `UPDATE ${table} SET ${setClause} WHERE id = ?`
    ).bind(...values, id).run();
    return json({ id: Number(id), ...body });
  }

  if (method === 'DELETE' && id) {
    await env.DB.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(id).run();
    return json({ success: true });
  }

  return json({ error: 'Method not allowed' }, 405);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);

    if (parts[0] !== 'api') return json({ error: 'Not found' }, 404);

    // ── POST /api/auth ──────────────────────────────────────────────────────
    if (parts[1] === 'auth' && request.method === 'POST') {
      const ip = clientIp(request);
      if (await isRateLimited(env, ip, 'auth_fail', 5, 15)) {
        return json({ error: 'Trop de tentatives. Réessayez dans quelques minutes.' }, 429);
      }
      const body = (await request.json()) as { password: string };
      if (body.password === env.ADMIN_PASSWORD) {
        return json({ token: env.ADMIN_SECRET });
      }
      await logAttempt(env, ip, 'auth_fail');
      return json({ error: 'Mot de passe incorrect' }, 401);
    }

    // ── GET /api/stats ──────────────────────────────────────────────────────
    if (parts[1] === 'stats' && request.method === 'GET') {
      const keys = [...Object.keys(TABLE_MAP), 'emails', 'recommendations'];
      const allTables = { ...TABLE_MAP, emails: 'emails', recommendations: 'video_recommendations' };
      const counts = await Promise.all(
        keys.map(k =>
          env.DB.prepare(`SELECT COUNT(*) as count FROM ${allTables[k]}`).first<{ count: number }>()
        )
      );
      const result: Record<string, number> = {};
      keys.forEach((key, i) => { result[key] = counts[i]?.count ?? 0; });
      return json(result);
    }

    // ── POST /api/upload ────────────────────────────────────────────────────
    if (parts[1] === 'upload' && request.method === 'POST') {
      if (!requireAuth(request, env)) return json({ error: 'Unauthorized' }, 401);
      const ct = request.headers.get('Content-Type') ?? '';
      if (!ct.includes('multipart/form-data')) {
        return json({ error: 'multipart/form-data requis' }, 400);
      }
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      if (!file || !(file instanceof File)) return json({ error: 'Aucun fichier fourni' }, 400);

      const rawExt = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
      if (!ALLOWED_EXTENSIONS.includes(rawExt)) {
        return json({ error: `Type de fichier non autorisé (.${rawExt})` }, 400);
      }

      const rand = Math.random().toString(36).slice(2, 8);
      const key = `${Date.now()}-${rand}.${rawExt}`;
      await env.MEDIA.put(key, file.stream(), {
        httpMetadata: { contentType: file.type || 'application/octet-stream' },
      });

      const fileUrl = `${url.origin}/api/files/${key}`;
      return json({ url: fileUrl, key });
    }

    // ── GET /api/files/:key ─────────────────────────────────────────────────
    if (parts[1] === 'files' && parts[2]) {
      const key = parts.slice(2).join('/');
      const object = await env.MEDIA.get(key);
      if (!object) return new Response('Not found', { status: 404, headers: CORS });
      return new Response(object.body, {
        headers: {
          ...CORS,
          'Content-Type': object.httpMetadata?.contentType ?? 'application/octet-stream',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // ── /api/emails ─────────────────────────────────────────────────────────
    if (parts[1] === 'emails') {
      // Public: subscribe
      if (request.method === 'POST' && !parts[2]) {
        const ip = clientIp(request);
        if (await isRateLimited(env, ip, 'email_subscribe', 5, 60)) {
          return json({ error: 'Trop de tentatives. Réessayez plus tard.' }, 429);
        }
        await logAttempt(env, ip, 'email_subscribe');
        const body = (await request.json()) as { email?: string; name?: string; source?: string };
        if (!body.email || !body.email.includes('@')) {
          return json({ error: 'Adresse email invalide' }, 400);
        }
        try {
          await env.DB.prepare(
            `INSERT INTO emails (email, name, source) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING`
          ).bind(body.email.toLowerCase().trim(), body.name ?? '', body.source ?? 'newsletter').run();
          return json({ success: true, message: 'Inscription réussie !' });
        } catch {
          return json({ error: 'Erreur serveur' }, 500);
        }
      }
      // Auth required for list & delete
      if (!requireAuth(request, env)) return json({ error: 'Unauthorized' }, 401);
      if (request.method === 'GET') {
        const { results } = await env.DB.prepare(
          `SELECT * FROM emails ORDER BY created_at DESC`
        ).all();
        return json(results);
      }
      if (request.method === 'DELETE' && parts[2]) {
        await env.DB.prepare(`DELETE FROM emails WHERE id = ?`).bind(parts[2]).run();
        return json({ success: true });
      }
    }

    // ── GET /api/link-preview?url= ─ (auto-fill for recommended videos) ──────
    if (parts[1] === 'link-preview' && request.method === 'GET') {
      if (!requireAuth(request, env)) return json({ error: 'Unauthorized' }, 401);
      const target = url.searchParams.get('url') ?? '';
      if (!/^https?:\/\//i.test(target)) return json({ error: 'URL invalide' }, 400);
      const platform = /youtu\.?be/i.test(target) ? 'YouTube' : /vimeo/i.test(target) ? 'Vimeo' : /tiktok/i.test(target) ? 'TikTok' : /facebook/i.test(target) ? 'Facebook' : 'Autre';
      const preview = { title: '', desc: '', thumbnail: '', platform };

      // 1) oEmbed first — reliable for YouTube/Vimeo/TikTok (title + thumbnail).
      const oembedUrl =
        platform === 'YouTube' ? `https://www.youtube.com/oembed?url=${encodeURIComponent(target)}&format=json` :
        platform === 'Vimeo' ? `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(target)}` :
        platform === 'TikTok' ? `https://www.tiktok.com/oembed?url=${encodeURIComponent(target)}` : '';
      if (oembedUrl) {
        try {
          const r = await fetch(oembedUrl, { cf: { cacheTtl: 300 } });
          if (r.ok) {
            const o = (await r.json()) as Record<string, unknown>;
            preview.title = String(o.title ?? '');
            preview.thumbnail = String(o.thumbnail_url ?? '');
            preview.desc = String(o.description ?? '');
          }
        } catch { /* fall through to OG scraping */ }
      }

      // 2) OG scraping to fill any gaps (works for generic pages).
      if (!preview.title || !preview.thumbnail || !preview.desc) {
        try {
          const res = await fetch(target, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JoyauxBot/1.0; +https://joyaux-precieux.pages.dev)' },
            cf: { cacheTtl: 300 },
          });
          const html = (await res.text()).slice(0, 400_000);
          const meta = (prop: string): string => {
            const patterns = [
              new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
              new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`, 'i'),
            ];
            for (const p of patterns) { const m = html.match(p); if (m) return decodeEntities(m[1]); }
            return '';
          };
          const titleTag = html.match(/<title[^>]*>([^<]*)<\/title>/i);
          preview.title = preview.title || meta('og:title') || meta('twitter:title') || (titleTag ? decodeEntities(titleTag[1]).trim() : '');
          preview.desc = preview.desc || meta('og:description') || meta('twitter:description') || meta('description');
          preview.thumbnail = preview.thumbnail || meta('og:image') || meta('twitter:image');
        } catch { /* ignore */ }
      }

      if (!preview.title) return json({ error: 'Impossible de récupérer les informations du lien.' }, 502);
      return json(preview);
    }

    // ── /api/bookings ─ public POST (create), auth GET/PUT/DELETE ────────────
    if (parts[1] === 'bookings') {
      if (request.method === 'POST' && !parts[2]) {
        const ip = clientIp(request);
        if (await isRateLimited(env, ip, 'booking', 8, 60)) {
          return json({ error: 'Trop de tentatives. Réessayez plus tard.' }, 429);
        }
        await logAttempt(env, ip, 'booking');
        const body = (await request.json()) as Record<string, unknown>;
        const cols = ALLOWED_COLUMNS.bookings.filter(c => c !== 'status');
        const vals = cols.map(c => String(body[c] ?? ''));
        try {
          const result = await env.DB.prepare(
            `INSERT INTO bookings (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`
          ).bind(...vals).run();
          return json({ success: true, id: result.meta.last_row_id }, 201);
        } catch {
          return json({ error: 'Erreur serveur' }, 500);
        }
      }
      if (!requireAuth(request, env)) return json({ error: 'Unauthorized' }, 401);
      if (request.method === 'GET') {
        const { results } = await env.DB.prepare(`SELECT * FROM bookings ORDER BY created_at DESC`).all();
        return json(results);
      }
      if (request.method === 'PUT' && parts[2]) {
        const body = (await request.json()) as Record<string, unknown>;
        if (typeof body.status === 'string') {
          await env.DB.prepare(`UPDATE bookings SET status = ? WHERE id = ?`).bind(body.status, parts[2]).run();
        }
        return json({ success: true });
      }
      if (request.method === 'DELETE' && parts[2]) {
        await env.DB.prepare(`DELETE FROM bookings WHERE id = ?`).bind(parts[2]).run();
        return json({ success: true });
      }
    }

    // ── Generic CRUD: /api/<resource>[/<id>] ────────────────────────────────
    const resource = parts[1];
    const id = parts[2] ?? null;
    const table = TABLE_MAP[resource];
    if (!table) return json({ error: 'Resource not found' }, 404);

    return handleResource(request, env, table, id);
  },
};
