import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { api } from '../lib/api';

interface Article {
  id: number;
  title: string;
  desc: string;
  content: string;
  tag: string;
  date: string;
  read_time: string;
  img: string;
  author: string;
  role: string;
  featured: number;
}

const TAGS = ['Psychologie', 'Parentalité', 'Adolescents & Foi', 'Spiritualité'];

const EMPTY: Omit<Article, 'id'> = {
  title: '',
  desc: '',
  content: '',
  tag: 'Psychologie',
  date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
  read_time: '5 min de lecture',
  img: '/images/article_1_mother_speaking.jpg',
  author: 'Lina NGUERELESSIO',
  role: 'Psychologue du Développement (stg)',
  featured: 0,
};

const COLUMNS: Column<Article>[] = [
  { key: 'title', label: 'Titre', truncate: true },
  { key: 'tag', label: 'Catégorie', render: v => (
    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">{String(v)}</span>
  )},
  { key: 'date', label: 'Date' },
  { key: 'read_time', label: 'Durée' },
  { key: 'featured', label: 'À la une', render: v => (
    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${Number(v) ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
      {Number(v) ? '⭐ Oui' : 'Non'}
    </span>
  )},
];

export function ArticlesAdmin() {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Article>>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    api.list<Article>('articles').then(setData).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModalOpen(true); };
  const openEdit = (item: Article) => { setForm(item); setEditId(item.id); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) {
        await api.update<Article>('articles', editId, form);
      } else {
        await api.create<Article>('articles', form);
      }
      setModalOpen(false);
      load();
    } catch (e: any) {
      alert('Erreur : ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cet article ?')) return;
    await api.remove('articles', id);
    load();
  };

  const set = (field: keyof Article, value: string | number) =>
    setForm(prev => ({ ...prev, [field]: value }));

  return (
    <Layout title="Articles">
      <DataTable
        data={data}
        columns={COLUMNS}
        onEdit={openEdit}
        onDelete={handleDelete}
        onAdd={openAdd}
        isLoading={loading}
        addLabel="Nouvel article"
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Modifier l\'article' : 'Nouvel article'}
        onSubmit={handleSave}
        isLoading={saving}
      >
        <Field label="Titre" required>
          <input className={input} value={form.title ?? ''} onChange={e => set('title', e.target.value)} placeholder="Titre de l'article" />
        </Field>
        <Field label="Description courte" required>
          <textarea className={`${input} h-20 resize-none`} value={form.desc ?? ''} onChange={e => set('desc', e.target.value)} placeholder="Résumé..." />
        </Field>
        <Field label="Contenu complet (Markdown)">
          <textarea className={`${input} h-40 resize-y font-mono text-xs`} value={form.content ?? ''} onChange={e => set('content', e.target.value)} placeholder="### Titre&#10;Contenu en Markdown..." />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Catégorie">
            <select className={input} value={form.tag ?? ''} onChange={e => set('tag', e.target.value)}>
              {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Date de publication">
            <input className={input} value={form.date ?? ''} onChange={e => set('date', e.target.value)} placeholder="25 Mai 2026" />
          </Field>
          <Field label="Temps de lecture">
            <input className={input} value={form.read_time ?? ''} onChange={e => set('read_time', e.target.value)} placeholder="5 min de lecture" />
          </Field>
          <Field label="Auteur">
            <input className={input} value={form.author ?? ''} onChange={e => set('author', e.target.value)} />
          </Field>
        </div>
        <Field label="Rôle de l'auteur">
          <input className={input} value={form.role ?? ''} onChange={e => set('role', e.target.value)} />
        </Field>
        <Field label="Image (chemin /images/...)">
          <input className={input} value={form.img ?? ''} onChange={e => set('img', e.target.value)} placeholder="/images/article_1_mother_speaking.jpg" />
        </Field>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(form.featured)}
            onChange={e => set('featured', e.target.checked ? 1 : 0)}
            className="rounded"
          />
          <span className="text-sm font-medium text-gray-700">Mettre à la une</span>
        </label>
      </Modal>
    </Layout>
  );
}

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
