import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FileUpload } from '../components/FileUpload';
import { api } from '../lib/api';

interface PdfResource {
  id: number;
  title: string;
  desc: string;
  type: string;
  color: string;
  accent: string;
  badge: string;
  img: string;
  file_url: string;
}

const EMPTY: Omit<PdfResource, 'id'> = {
  title: '', desc: '', type: '📥 KIT PDF À IMPRIMER',
  color: 'bg-mint border-lead-green/10', accent: 'text-lead-green',
  badge: '🌱 Psychologie de l\'enfant', img: '', file_url: '',
};

const COLOR_OPTIONS = [
  { label: 'Vert (Menthe)', value: 'bg-mint border-lead-green/10', accent: 'text-lead-green' },
  { label: 'Jaune', value: 'bg-yellow-bg border-highlight/10', accent: 'text-[#ff9d00]' },
  { label: 'Rouge (Corail)', value: 'bg-[#fbebeb] border-coral/10', accent: 'text-coral' },
];

const COLUMNS: Column<PdfResource>[] = [
  { key: 'img', label: '', render: v => v ? (
    <img src={String(v)} alt="" className="w-10 h-7 object-cover rounded-lg bg-gray-100" />
  ) : <div className="w-10 h-7 bg-gray-100 rounded-lg" /> },
  { key: 'title', label: 'Titre', truncate: true },
  { key: 'badge', label: 'Badge', truncate: true },
  { key: 'file_url', label: 'Fichier PDF', render: v => v ? (
    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-bold rounded-full">✓ PDF chargé</span>
  ) : <span className="text-gray-300 text-xs">Aucun</span> },
];

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}

export function RessourcesAdmin() {
  const [data, setData] = useState<PdfResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<PdfResource>>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    api.list<PdfResource>('resources').then(setData).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModalOpen(true); };
  const openEdit = (item: PdfResource) => { setForm(item); setEditId(item.id); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) await api.update<PdfResource>('resources', editId, form);
      else await api.create<PdfResource>('resources', form);
      setModalOpen(false);
      load();
    } catch (e: unknown) { alert('Erreur : ' + (e instanceof Error ? e.message : '')); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette ressource ?')) return;
    await api.remove('resources', id);
    load();
  };

  const set = (f: keyof PdfResource, v: string) => setForm(p => ({ ...p, [f]: v }));

  const handleColorChange = (val: string) => {
    const opt = COLOR_OPTIONS.find(o => o.value === val);
    setForm(p => ({ ...p, color: val, accent: opt?.accent ?? 'text-lead-green' }));
  };

  return (
    <Layout title="Ressources PDF">
      <DataTable data={data} columns={COLUMNS} onEdit={openEdit} onDelete={handleDelete}
        onAdd={openAdd} isLoading={loading} addLabel="Nouvelle ressource" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editId ? 'Modifier la ressource' : 'Nouvelle ressource PDF'} onSubmit={handleSave} isLoading={saving}>
        <Field label="Titre"><input className={input} value={form.title ?? ''} onChange={e => set('title', e.target.value)} /></Field>
        <Field label="Description">
          <textarea className={`${input} h-24 resize-none`} value={form.desc ?? ''} onChange={e => set('desc', e.target.value)} />
        </Field>
        <Field label="Fichier PDF à télécharger">
          <FileUpload value={form.file_url ?? ''} onChange={v => set('file_url', v)}
            accept=".pdf,application/pdf" label="le fichier PDF" previewType="file" />
        </Field>
        <Field label="Image de couverture">
          <FileUpload value={form.img ?? ''} onChange={v => set('img', v)}
            accept="image/*" label="une image" previewType="image" />
        </Field>
        <Field label="Type de ressource">
          <input className={input} value={form.type ?? ''} onChange={e => set('type', e.target.value)} placeholder="📥 KIT PDF À IMPRIMER" />
        </Field>
        <Field label="Badge affiché">
          <input className={input} value={form.badge ?? ''} onChange={e => set('badge', e.target.value)} placeholder="🌱 Psychologie de l'enfant" />
        </Field>
        <Field label="Couleur de fond">
          <select className={input} value={form.color ?? ''} onChange={e => handleColorChange(e.target.value)}>
            {COLOR_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
      </Modal>
    </Layout>
  );
}
