export interface Env {
  DB: D1Database;
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
  audio: 'audio_capsules',
};

// Safe column whitelist per table
const ALLOWED_COLUMNS: Record<string, string[]> = {
  articles: ['title', 'desc', 'content', 'tag', 'date', 'read_time', 'img', 'author', 'role', 'featured'],
  videos: ['title', 'duration', 'desc', 'category', 'img', 'url', 'speaker'],
  books: ['title', 'author', 'rating', 'desc', 'benefits', 'img'],
  pdf_resources: ['title', 'desc', 'type', 'color', 'accent', 'badge', 'img'],
  faqs: ['question', 'answer', 'order_idx'],
  testimonials: ['text', 'author', 'role', 'rating', 'img'],
  pillars: ['title', 'desc', 'icon', 'badge', 'time', 'order_idx'],
  methodology_steps: ['ref', 'title', 'desc', 'order_idx'],
  audio_capsules: ['title', 'duration', 'duration_sec', 'speaker', 'desc', 'bg_color', 'accent', 'badge'],
};

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
    // Expected: ['api', 'resource', 'id?']

    if (parts[0] !== 'api') return json({ error: 'Not found' }, 404);

    // POST /api/auth  → login
    if (parts[1] === 'auth' && request.method === 'POST') {
      const body = (await request.json()) as { password: string };
      if (body.password === env.ADMIN_PASSWORD) {
        return json({ token: env.ADMIN_SECRET });
      }
      return json({ error: 'Mot de passe incorrect' }, 401);
    }

    // GET /api/stats  → counts per table
    if (parts[1] === 'stats' && request.method === 'GET') {
      const tables = Object.values(TABLE_MAP);
      const counts = await Promise.all(
        tables.map(t =>
          env.DB.prepare(`SELECT COUNT(*) as count FROM ${t}`).first<{ count: number }>()
        )
      );
      const result: Record<string, number> = {};
      Object.keys(TABLE_MAP).forEach((key, i) => {
        result[key] = counts[i]?.count ?? 0;
      });
      return json(result);
    }

    // CRUD routes: /api/<resource>[/<id>]
    const resource = parts[1];
    const id = parts[2] ?? null;
    const table = TABLE_MAP[resource];

    if (!table) return json({ error: 'Resource not found' }, 404);

    return handleResource(request, env, table, id);
  },
};
