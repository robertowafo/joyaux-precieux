import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { api } from '../lib/api';

interface AudioCapsule {
  id: number;
  title: string;
  duration: string;
  duration_sec: number;
  speaker: string;
  desc: string;
  bg_color: string;
  accent: string;
  badge: string;
}

const BG_OPTIONS = [
  { label: 'Vert Menthe', bg: 'bg-mint', accent: 'text-lead-green' },
  { label: 'Jaune', bg: 'bg-yellow-bg', accent: 'text-[#ff9d00]' },
  { label: 'Corail', bg: 'bg-[#fbebeb]', accent: 'text-coral' },
];

const EMPTY: Omit<AudioCapsule, 'id'> = {
  title: '',
  duration: '04:00',
  duration_sec: 240,
  speaker: 'Lina NGUERELESSIO',
  desc: '',
  bg_color: 'bg-mint',
  accent: 'text-lead-green',
  badge: '👶 Petite Enfance • 4 min',
};

const COLUMNS: Column<AudioCapsule>[] = [
  { key: 'title', label: 'Titre', truncate: true },
  { key: 'badge', label: 'Badge' },
  { key: 'duration', label: 'Durée' },
  { key: 'speaker', label: 'Intervenant', truncate: true },
];

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}

export function AudioAdmin() {
  const [data, setData] = useState<AudioCapsule[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<AudioCapsule>>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => { setLoading(true); api.list<AudioCapsule>('audio').then(setData).finally(() => setLoading(false)); };
  useEffect(load, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModalOpen(true); };
  const openEdit = (item: AudioCapsule) => { setForm(item); setEditId(item.id); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) await api.update<AudioCapsule>('audio', editId, form);
      else await api.create<AudioCapsule>('audio', form);
      setModalOpen(false); load();
    } catch (e: any) { alert('Erreur : ' + e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette capsule audio ?')) return;
    await api.remove('audio', id); load();
  };

  const set = (f: keyof AudioCapsule, v: string | number) => setForm(p => ({ ...p, [f]: v }));

  const handleBgChange = (bg: string) => {
    const opt = BG_OPTIONS.find(o => o.bg === bg);
    setForm(p => ({ ...p, bg_color: bg, accent: opt?.accent ?? 'text-lead-green' }));
  };

  return (
    <Layout title="Capsules Audio — Minutes Précieuses">
      <DataTable data={data} columns={COLUMNS} onEdit={openEdit} onDelete={handleDelete} onAdd={openAdd} isLoading={loading} addLabel="Nouvelle capsule" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Modifier la capsule' : 'Nouvelle capsule audio'} onSubmit={handleSave} isLoading={saving}>
        <Field label="Titre"><input className={input} value={form.title ?? ''} onChange={e => set('title', e.target.value)} /></Field>
        <Field label="Description"><textarea className={`${input} h-24 resize-none`} value={form.desc ?? ''} onChange={e => set('desc', e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Durée (mm:ss)"><input className={input} value={form.duration ?? ''} onChange={e => set('duration', e.target.value)} placeholder="04:00" /></Field>
          <Field label="Durée en secondes"><input type="number" className={input} value={form.duration_sec ?? 0} onChange={e => set('duration_sec', Number(e.target.value))} /></Field>
        </div>
        <Field label="Intervenant"><input className={input} value={form.speaker ?? ''} onChange={e => set('speaker', e.target.value)} /></Field>
        <Field label="Badge affiché"><input className={input} value={form.badge ?? ''} onChange={e => set('badge', e.target.value)} placeholder="👶 Petite Enfance • 4 min" /></Field>
        <Field label="Couleur de fond">
          <select className={input} value={form.bg_color ?? ''} onChange={e => handleBgChange(e.target.value)}>
            {BG_OPTIONS.map(o => <option key={o.bg} value={o.bg}>{o.label}</option>)}
          </select>
        </Field>
      </Modal>
    </Layout>
  );
}
