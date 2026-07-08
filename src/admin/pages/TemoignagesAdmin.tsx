import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { api } from '../lib/api';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  rating: number;
  img: string;
}

const EMPTY: Omit<Testimonial, 'id'> = {
  text: '',
  author: '',
  role: '',
  rating: 5,
  img: '/images/avatar_1_young_mother.jpg',
};

const COLUMNS: Column<Testimonial>[] = [
  { key: 'author', label: 'Auteur' },
  { key: 'role', label: 'Rôle', truncate: true },
  { key: 'text', label: 'Témoignage', truncate: true },
  { key: 'rating', label: 'Note', render: v => <span>{'⭐'.repeat(Number(v))}</span> },
];

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}

export function TemoignagesAdmin() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Testimonial>>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => { setLoading(true); api.list<Testimonial>('testimonials').then(setData).finally(() => setLoading(false)); };
  useEffect(load, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModalOpen(true); };
  const openEdit = (item: Testimonial) => { setForm(item); setEditId(item.id); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) await api.update<Testimonial>('testimonials', editId, form);
      else await api.create<Testimonial>('testimonials', form);
      setModalOpen(false); load();
    } catch (e: any) { alert('Erreur : ' + e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce témoignage ?')) return;
    await api.remove('testimonials', id); load();
  };

  const set = (f: keyof Testimonial, v: string | number) => setForm(p => ({ ...p, [f]: v }));

  return (
    <Layout title="Témoignages">
      <DataTable data={data} columns={COLUMNS} onEdit={openEdit} onDelete={handleDelete} onAdd={openAdd} isLoading={loading} addLabel="Nouveau témoignage" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Modifier le témoignage' : 'Nouveau témoignage'} onSubmit={handleSave} isLoading={saving}>
        <Field label="Témoignage (texte entre « »)">
          <textarea className={`${input} h-32 resize-none`} value={form.text ?? ''} onChange={e => set('text', e.target.value)} placeholder="« Votre témoignage... »" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Prénom / Nom"><input className={input} value={form.author ?? ''} onChange={e => set('author', e.target.value)} placeholder="Sarah" /></Field>
          <Field label="Rôle"><input className={input} value={form.role ?? ''} onChange={e => set('role', e.target.value)} placeholder="Maman de Lucas (14 ans)" /></Field>
        </div>
        <Field label="Note (1-5)">
          <select className={input} value={form.rating ?? 5} onChange={e => set('rating', Number(e.target.value))}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} étoile{n > 1 ? 's' : ''}</option>)}
          </select>
        </Field>
        <Field label="Image avatar (/images/...)"><input className={input} value={form.img ?? ''} onChange={e => set('img', e.target.value)} placeholder="/images/avatar_1_young_mother.jpg" /></Field>
      </Modal>
    </Layout>
  );
}
