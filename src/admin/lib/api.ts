const BASE = import.meta.env.VITE_API_URL ?? '/api';

function getToken(): string | null {
  return localStorage.getItem('joyaux_admin_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: authHeaders(),
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur réseau' }));
    throw new Error((err as any).error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  // Auth
  login: (password: string) =>
    request<{ token: string }>('/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),

  // Stats
  stats: () => request<Record<string, number>>('/stats'),

  // Generic CRUD
  list: <T>(resource: string) => request<T[]>(`/${resource}`),
  get: <T>(resource: string, id: number) => request<T>(`/${resource}/${id}`),
  create: <T>(resource: string, data: Partial<T>) =>
    request<T>(`/${resource}`, { method: 'POST', body: JSON.stringify(data) }),
  update: <T>(resource: string, id: number, data: Partial<T>) =>
    request<T>(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (resource: string, id: number) =>
    request<{ success: boolean }>(`/${resource}/${id}`, { method: 'DELETE' }),
};
