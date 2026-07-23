import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FileUpload } from '../components/FileUpload';
import { api } from '../lib/api';

interface Book {
  id: number;
  title: string;
  author: string;
  rating: string;
  desc: string;
  benefits: string;
  img: string;
  link: string;
  link_type: string;
}

const EMPTY: Omit<Book, 'id'> = {
  title: '', author: '', rating: '⭐⭐⭐⭐⭐',
  desc: '', benefits: '[]', img: '', link: '', link_type: 'buy',
};

const COLUMNS: Column<Book>[] = [
  { key: 'img', label: '', render: v => v ? (
    <img src={String(v)} alt="" className="w-8 h-11 object-cover rounded-lg bg-gray-100" />
  ) : <div className="w-8 h-11 bg-gray-100 rounded-lg" /> },
  { key: 'title', label: 'Titre', truncate: true },
  { key: 'author', label: 'Auteur', truncate: true },
  { key: 'rating', label: 'Note', truncate: true },
];

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}

export function LivresAdmin() {
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Book>>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);
  const [benefitsInput, setBenefitsInput] = useState('');

  const load = () => {
    setLoading(true);
    api.list<Book>('books').then(setData).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setForm(EMPTY); setBenefitsInput(''); setEditId(null); setModalOpen(true); };
  const openEdit = (item: Book) => {
    setForm(item);
    try { setBenefitsInput((JSON.parse(item.benefits) as string[]).join(', ')); } catch { setBenefitsInput(''); }
    setEditId(item.id); setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const benefits = JSON.stringify(benefitsInput.split(',').map(s => s.trim()).filter(Boolean));
      const payload = { ...form, benefits };
      if (editId) await api.update<Book>('books', editId, payload);
      else await api.create<Book>('books', payload);
      setModalOpen(false);
      load();
    } catch (e: unknown) { alert('Erreur : ' + (e instanceof Error ? e.message : '')); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce livre ?')) return;
    await api.remove('books', id);
    load();
  };

  const set = (f: keyof Book, v: string) => setForm(p => ({ ...p, [f]: v }));

  return (
    <Layout title="Livres recommandés">
      <DataTable data={data} columns={COLUMNS} onEdit={openEdit} onDelete={handleDelete}
        onAdd={openAdd} isLoading={loading} addLabel="Nouveau livre" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editId ? 'Modifier le livre' : 'Nouveau livre recommandé'} onSubmit={handleSave} isLoading={saving}>
        <Field label="Titre du livre">
          <input className={input} value={form.title ?? ''} onChange={e => set('title', e.target.value)} />
        </Field>
        <Field label="Auteur">
          <input className={input} value={form.author ?? ''} onChange={e => set('author', e.target.value)} />
        </Field>
        <Field label="Note / Label">
          <input className={input} value={form.rating ?? ''} onChange={e => set('rating', e.target.value)}
            placeholder="⭐⭐⭐⭐⭐ Excellent ref de développement" />
        </Field>
        <Field label="Description">
          <textarea className={`${input} h-28 resize-none`} value={form.desc ?? ''} onChange={e => set('desc', e.target.value)} />
        </Field>
        <Field label="Points clés (séparés par des virgules)">
          <input className={input} value={benefitsInput} onChange={e => setBenefitsInput(e.target.value)}
            placeholder="Pragmatique, Illustrations concrètes, Basé sur les neurosciences" />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Type de lien">
            <select className={input} value={form.link_type ?? 'buy'} onChange={e => set('link_type', e.target.value)}>
              <option value="buy">🛒 Acheter</option>
              <option value="download">📥 Télécharger (gratuit)</option>
            </select>
          </Field>
          <div className="col-span-2">
            <Field label="Lien (achat ou téléchargement)">
              <input className={input} type="url" value={form.link ?? ''} onChange={e => set('link', e.target.value)}
                placeholder="https://... (Amazon, PDF, librairie...)" />
            </Field>
          </div>
        </div>
        <Field label="Couverture du livre">
          <FileUpload value={form.img ?? ''} onChange={v => set('img', v)}
            accept="image/*" label="la couverture" previewType="image" />
        </Field>
      </Modal>
    </Layout>
  );
}
