import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { api } from '../lib/api';

interface Faq {
  id: number;
  question: string;
  answer: string;
  order_idx: number;
}

const EMPTY: Omit<Faq, 'id'> = { question: '', answer: '', order_idx: 0 };

const COLUMNS: Column<Faq>[] = [
  { key: 'order_idx', label: '#', render: v => <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold">{Number(v) + 1}</span> },
  { key: 'question', label: 'Question', truncate: true },
  { key: 'answer', label: 'Réponse', truncate: true },
];

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}

export function FaqAdmin() {
  const [data, setData] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Faq>>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => { setLoading(true); api.list<Faq>('faqs').then(setData).finally(() => setLoading(false)); };
  useEffect(load, []);

  const openAdd = () => { setForm({ ...EMPTY, order_idx: data.length }); setEditId(null); setModalOpen(true); };
  const openEdit = (item: Faq) => { setForm(item); setEditId(item.id); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) await api.update<Faq>('faqs', editId, form);
      else await api.create<Faq>('faqs', form);
      setModalOpen(false); load();
    } catch (e: any) { alert('Erreur : ' + e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette FAQ ?')) return;
    await api.remove('faqs', id); load();
  };

  const set = (f: keyof Faq, v: string | number) => setForm(p => ({ ...p, [f]: v }));

  return (
    <Layout title="FAQ">
      <DataTable data={data} columns={COLUMNS} onEdit={openEdit} onDelete={handleDelete} onAdd={openAdd} isLoading={loading} addLabel="Nouvelle question" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Modifier la FAQ' : 'Nouvelle question'} onSubmit={handleSave} isLoading={saving}>
        <Field label="Question"><input className={input} value={form.question ?? ''} onChange={e => set('question', e.target.value)} placeholder="Comment se déroule..." /></Field>
        <Field label="Réponse"><textarea className={`${input} h-36 resize-none`} value={form.answer ?? ''} onChange={e => set('answer', e.target.value)} placeholder="La réponse complète..." /></Field>
        <Field label="Ordre d'affichage">
          <input type="number" className={input} value={form.order_idx ?? 0} onChange={e => set('order_idx', Number(e.target.value))} min={0} />
        </Field>
      </Modal>
    </Layout>
  );
}
