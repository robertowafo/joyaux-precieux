const BASE = import.meta.env.VITE_API_URL || 'https://joyaux-precieux-api.impacttech237.workers.dev/api';

async function get<T>(resource: string): Promise<T[]> {
  const res = await fetch(`${BASE}/${resource}?limit=50`);
  if (!res.ok) return [];
  const data = await res.json() as { items?: T[] } | T[];
  return (Array.isArray(data) ? data : data.items) ?? [];
}

export const publicApi = {
  articles: () => get<Record<string, unknown>>('articles'),
  videoCapsules: () => get<Record<string, unknown>>('video_capsules'),
  resources:() => get<Record<string, unknown>>('resources'),
  faqs:     () => get<Record<string, unknown>>('faqs'),
  videos:   () => get<Record<string, unknown>>('videos'),
  books:    () => get<Record<string, unknown>>('books'),
  testimonials: () => get<Record<string, unknown>>('testimonials'),
  pillars:  () => get<Record<string, unknown>>('pillars'),
  steps:    () => get<Record<string, unknown>>('steps'),
};
