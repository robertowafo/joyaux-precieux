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

  linkPreview: (url: string) =>
    req<{ title: string; desc: string; thumbnail: string; platform: string; error?: string }>(`/link-preview?url=${encodeURIComponent(url)}`),

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

  // File upload to R2 — uses XHR (not fetch) so we can report real upload progress,
  // which matters a lot on slow connections with large phone-recorded videos.
  upload: (file: File, onProgress?: (pct: number) => void): Promise<{ url: string; key: string }> => {
    return new Promise((resolve, reject) => {
      const token = getToken();
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${BASE}/upload`);
      if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.timeout = 10 * 60 * 1000; // 10 min — generous for large videos on slow connections

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch {
            reject(new Error('Réponse invalide du serveur'));
          }
        } else {
          let message = `Erreur HTTP ${xhr.status}`;
          try {
            const parsed = JSON.parse(xhr.responseText) as { error?: string };
            if (parsed.error) message = parsed.error;
          } catch { /* ignore parse failure, keep default message */ }
          reject(new Error(message));
        }
      };
      xhr.onerror = () => reject(new Error("Erreur réseau pendant l'envoi. Vérifiez votre connexion et réessayez."));
      xhr.ontimeout = () => reject(new Error('Délai dépassé — fichier trop volumineux ou connexion trop lente.'));

      const formData = new FormData();
      formData.append('file', file);
      xhr.send(formData);
    });
  },
};
