import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FileUpload } from '../components/FileUpload';
import { LinkOrUpload } from '../components/LinkOrUpload';
import { api } from '../lib/api';

interface Video {
  id: number;
  title: string;
  duration: string;
  desc: string;
  category: string;
  img: string;
  url: string;
  speaker: string;
}

const CATEGORIES = ['Parentalité', 'Adolescents & Foi', 'Spiritualité', 'Psychologie'];

const EMPTY: Omit<Video, 'id'> = {
  title: '', duration: '10:00', desc: '',
  category: 'Parentalité', img: '', url: '',
  speaker: 'Lina NGUERELESSIO',
};

const COLUMNS: Column<Video>[] = [
  { key: 'img', label: '', render: v => v ? (
    <img src={String(v)} alt="" className="w-12 h-8 object-cover rounded-lg bg-gray-100" />
  ) : <div className="w-12 h-8 bg-gray-100 rounded-lg" /> },
  { key: 'title', label: 'Titre', truncate: true },
  { key: 'category', label: 'Catégorie', render: v => (
    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full">{String(v)}</span>
  )},
  { key: 'duration', label: 'Durée' },
  { key: 'speaker', label: 'Intervenant', truncate: true },
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

export function VideosAdmin() {
  const [data, setData] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Video>>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    api.list<Video>('videos').then(setData).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModalOpen(true); };
  const openEdit = (item: Video) => { setForm(item); setEditId(item.id); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) await api.update<Video>('videos', editId, form);
      else await api.create<Video>('videos', form);
      setModalOpen(false);
      load();
    } catch (e: unknown) { alert('Erreur : ' + (e instanceof Error ? e.message : '')); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette vidéo ?')) return;
    await api.remove('videos', id);
    load();
  };

  const set = (f: keyof Video, v: string) => setForm(prev => ({ ...prev, [f]: v }));

  return (
    <Layout title="Vidéos">
      <DataTable data={data} columns={COLUMNS} onEdit={openEdit} onDelete={handleDelete}
        onAdd={openAdd} isLoading={loading} addLabel="Nouvelle vidéo" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editId ? 'Modifier la vidéo' : 'Nouvelle vidéo'} onSubmit={handleSave} isLoading={saving}>
        <Field label="Titre"><input className={input} value={form.title ?? ''} onChange={e => set('title', e.target.value)} /></Field>
        <Field label="Description">
          <textarea className={`${input} h-24 resize-none`} value={form.desc ?? ''} onChange={e => set('desc', e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Catégorie">
            <select className={input} value={form.category ?? ''} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Durée (mm:ss)">
            <input className={input} value={form.duration ?? ''} onChange={e => set('duration', e.target.value)} placeholder="12:45" />
          </Field>
        </div>
        <Field label="Vidéo (lien YouTube/Vimeo ou fichier)">
          <LinkOrUpload
            value={form.url ?? ''}
            onChange={v => set('url', v)}
            accept="video/*,.mp4,.webm,.mov"
            label="une vidéo"
            linkPlaceholder="https://youtube.com/watch?v=..."
          />
        </Field>
        <Field label="Intervenant">
          <input className={input} value={form.speaker ?? ''} onChange={e => set('speaker', e.target.value)} />
        </Field>
        <Field label="Image miniature">
          <FileUpload value={form.img ?? ''} onChange={v => set('img', v)}
            accept="image/*" label="une miniature" previewType="image" />
        </Field>
      </Modal>
    </Layout>
  );
}
