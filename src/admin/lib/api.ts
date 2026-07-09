const BASE = import.meta.env.VITE_API_URL ?? '/api';

function getToken(): string | null {
  return localStorage.getItem('joyaux_admin_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
}

async function req<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: authHeaders(), ...options });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur réseau' }));
    throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  login: (password: string) =>
    req<{ token: string }>('/auth', { method: 'POST', body: JSON.stringify({ password }) }),

  stats: () => req<Record<string, number>>('/stats'),

  list: <T>(resource: string) => req<T[]>(`/${resource}`),
  get: <T>(resource: string, id: number) => req<T>(`/${resource}/${id}`),
  create: <T>(resource: string, data: Partial<T>) =>
    req<T>(`/${resource}`, { method: 'POST', body: JSON.stringify(data) }),
  update: <T>(resource: string, id: number, data: Partial<T>) =>
    req<T>(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (resource: string, id: number) =>
    req<{ success: boolean }>(`/${resource}/${id}`, { method: 'DELETE' }),

  // Public email subscription (no auth)
  subscribe: (email: string, name = '', source = 'newsletter') =>
    fetch(`${BASE}/emails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, source }),
    }).then(r => r.json()),

  // File upload to R2
  upload: async (file: File): Promise<{ url: string; key: string }> => {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${BASE}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Erreur upload' }));
      throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
    }
    return res.json();
  },
};
