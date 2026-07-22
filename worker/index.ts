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
};

const ALLOWED_COLUMNS: Record<string, string[]> = {
  articles: ['title', 'desc', 'content', 'tag', 'date', 'read_time', 'img', 'author', 'role', 'featured'],
  videos: ['title', 'duration', 'desc', 'category', 'img', 'url', 'speaker'],
  books: ['title', 'author', 'rating', 'desc', 'benefits', 'img'],
  pdf_resources: ['title', 'desc', 'type', 'color', 'accent', 'badge', 'img', 'file_url'],
  faqs: ['question', 'answer', 'order_idx'],
  testimonials: ['text', 'author', 'role', 'rating', 'img'],
  pillars: ['title', 'desc', 'icon', 'badge', 'time', 'order_idx'],
  methodology_steps: ['ref', 'title', 'desc', 'order_idx'],
  video_capsules: ['title', 'duration', 'duration_sec', 'speaker', 'desc', 'bg_color', 'accent', 'badge', 'video_url'],
  video_recommendations: ['title', 'url', 'platform', 'desc', 'thumbnail'],
};

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'mp3', 'wav', 'ogg', 'm4a', 'mp4', 'webm', 'pdf'];

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
      const body = (await request.json()) as { password: string };
      if (body.password === env.ADMIN_PASSWORD) {
        return json({ token: env.ADMIN_SECRET });
      }
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

    // ── Generic CRUD: /api/<resource>[/<id>] ────────────────────────────────
    const resource = parts[1];
    const id = parts[2] ?? null;
    const table = TABLE_MAP[resource];
    if (!table) return json({ error: 'Resource not found' }, 404);

    return handleResource(request, env, table, id);
  },
};
