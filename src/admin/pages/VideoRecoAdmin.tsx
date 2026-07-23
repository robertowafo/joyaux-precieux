import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FileUpload } from '../components/FileUpload';
import { LinkOrUpload } from '../components/LinkOrUpload';
import { api } from '../lib/api';
import { ExternalLink } from 'lucide-react';

interface VideoReco {
  id: number;
  title: string;
  url: string;
  platform: string;
  desc: string;
  thumbnail: string;
}

const PLATFORMS = ['YouTube', 'Vimeo', 'TED', 'Instagram', 'Facebook', 'Autre'];

const EMPTY: Omit<VideoReco, 'id'> = {
  title: '',
  url: '',
  platform: 'YouTube',
  desc: '',
  thumbnail: '',
};

const COLUMNS: Column<VideoReco>[] = [
  { key: 'thumbnail', label: '', render: v => v ? (
    <img src={String(v)} alt="" className="w-12 h-8 object-cover rounded-lg bg-gray-100" />
  ) : <div className="w-12 h-8 bg-gray-100 rounded-lg" /> },
  { key: 'title', label: 'Titre', truncate: true },
  { key: 'platform', label: 'Plateforme', render: v => (
    <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-bold rounded-full">{String(v)}</span>
  )},
  { key: 'url', label: 'Lien', render: v => (
    <a href={String(v)} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-1 text-[#1f4a38] text-xs hover:underline" onClick={e => e.stopPropagation()}>
      <ExternalLink size={11} /> Ouvrir
    </a>
  )},
];

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export function VideoRecoAdmin() {
  const [data, setData] = useState<VideoReco[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<VideoReco>>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    api.list<VideoReco>('recommendations').then(setData).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModalOpen(true); };
  const openEdit = (item: VideoReco) => { setForm(item); setEditId(item.id); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) await api.update<VideoReco>('recommendations', editId, form);
      else await api.create<VideoReco>('recommendations', form);
      setModalOpen(false);
      load();
    } catch (e: unknown) {
      alert('Erreur : ' + (e instanceof Error ? e.message : 'Erreur inconnue'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette recommandation ?')) return;
    await api.remove('recommendations', id);
    load();
  };

  const set = (f: keyof VideoReco, v: string) => setForm(p => ({ ...p, [f]: v }));

  return (
    <Layout title="Vidéos Recommandées">
      <div className="mb-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
        Ajoutez ici des liens vers des vidéos YouTube, Vimeo ou autres que vous recommandez à votre communauté.
      </div>

      <DataTable
        data={data}
        columns={COLUMNS}
        onEdit={openEdit}
        onDelete={handleDelete}
        onAdd={openAdd}
        isLoading={loading}
        addLabel="Ajouter une vidéo"
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Modifier la recommandation' : 'Nouvelle recommandation vidéo'}
        onSubmit={handleSave}
        isLoading={saving}
      >
        <Field label="Titre de la vidéo">
          <input className={input} value={form.title ?? ''} onChange={e => set('title', e.target.value)}
            placeholder="Nom de la vidéo ou de la conférence" />
        </Field>
        <Field label="Vidéo (lien ou fichier) *">
          <LinkOrUpload
            value={form.url ?? ''}
            onChange={v => set('url', v)}
            accept="video/*,.mp4,.webm,.mov"
            label="une vidéo"
            linkPlaceholder="https://www.youtube.com/watch?v=..."
          />
        </Field>
        <Field label="Plateforme">
          <select className={input} value={form.platform ?? 'YouTube'} onChange={e => set('platform', e.target.value)}>
            {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Description (optionnelle)">
          <textarea className={`${input} h-20 resize-none`} value={form.desc ?? ''}
            onChange={e => set('desc', e.target.value)}
            placeholder="Pourquoi recommandez-vous cette vidéo ?" />
        </Field>
        <Field label="Miniature (image d'aperçu)">
          <FileUpload
            value={form.thumbnail ?? ''}
            onChange={v => set('thumbnail', v)}
            accept="image/*"
            label="une miniature"
            previewType="image"
          />
        </Field>
      </Modal>
    </Layout>
  );
}
