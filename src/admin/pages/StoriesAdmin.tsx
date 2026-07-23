import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { api } from '../lib/api';

interface Story {
  id: number;
  emoji: string;
  title: string;
  hero: string;
  teaching: string;
  story_snippet: string;
  parent_tip: string;
  order_idx: number;
}

const EMPTY: Omit<Story, 'id'> = {
  emoji: '🦉', title: '', hero: '', teaching: '',
  story_snippet: '', parent_tip: '', order_idx: 0,
};

const COLUMNS: Column<Story>[] = [
  { key: 'emoji', label: '', render: v => <span className="text-xl">{String(v)}</span> },
  { key: 'title', label: 'Titre', truncate: true },
  { key: 'hero', label: 'Héros', truncate: true },
  { key: 'teaching', label: 'Thème', truncate: true },
  { key: 'order_idx', label: 'Ordre' },
];

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}

export function StoriesAdmin() {
  const [data, setData] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Story>>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    api.list<Story>('stories')
      .then(rows => setData([...rows].sort((a, b) => (a.order_idx ?? 0) - (b.order_idx ?? 0))))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModalOpen(true); };
  const openEdit = (item: Story) => { setForm(item); setEditId(item.id); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) await api.update<Story>('stories', editId, form);
      else await api.create<Story>('stories', form);
      setModalOpen(false);
      load();
    } catch (e: unknown) { alert('Erreur : ' + (e instanceof Error ? e.message : '')); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette histoire ?')) return;
    await api.remove('stories', id);
    load();
  };

  const set = (f: keyof Story, v: string | number) => setForm(p => ({ ...p, [f]: v }));

  return (
    <Layout title="Histoires Thérapeutiques — Moulin aux Contes">
      <div className="mb-4 p-4 bg-purple-50 border border-purple-100 rounded-xl text-sm text-purple-700">
        Ces contes alimentent « Le Moulin aux Contes Thérapeutiques » sur la page Ressources. Chaque histoire tourne dans le carrousel.
      </div>
      <DataTable data={data} columns={COLUMNS} onEdit={openEdit} onDelete={handleDelete}
        onAdd={openAdd} isLoading={loading} addLabel="Nouvelle histoire" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editId ? "Modifier l'histoire" : 'Nouvelle histoire'} onSubmit={handleSave} isLoading={saving}>
        <div className="grid grid-cols-4 gap-4">
          <Field label="Emoji">
            <input className={input} value={form.emoji ?? ''} onChange={e => set('emoji', e.target.value)} placeholder="🦉" />
          </Field>
          <div className="col-span-3">
            <Field label="Titre du conte">
              <input className={input} value={form.title ?? ''} onChange={e => set('title', e.target.value)} placeholder="La Chouette Somnolente" />
            </Field>
          </div>
        </div>
        <Field label="Héros">
          <input className={input} value={form.hero ?? ''} onChange={e => set('hero', e.target.value)} placeholder="Plume la Chouette" />
        </Field>
        <Field label="Thème pédagogique">
          <input className={input} value={form.teaching ?? ''} onChange={e => set('teaching', e.target.value)} placeholder="Transition de Coucher & Sommeil calme" />
        </Field>
        <Field label="L'histoire (texte du conte)">
          <textarea className={`${input} h-32 resize-none`} value={form.story_snippet ?? ''} onChange={e => set('story_snippet', e.target.value)} />
        </Field>
        <Field label="Astuce clinique pour le parent">
          <textarea className={`${input} h-24 resize-none`} value={form.parent_tip ?? ''} onChange={e => set('parent_tip', e.target.value)}
            placeholder="Astuce Clinique : ..." />
        </Field>
        <Field label="Ordre d'affichage">
          <input type="number" className={input} value={form.order_idx ?? 0} onChange={e => set('order_idx', Number(e.target.value))} />
        </Field>
      </Modal>
    </Layout>
  );
}
