import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FileUpload } from '../components/FileUpload';
import { api } from '../lib/api';

interface VideoCapsule {
  id: number;
  title: string;
  duration: string;
  duration_sec: number;
  speaker: string;
  desc: string;
  bg_color: string;
  accent: string;
  badge: string;
  video_url: string;
}

const BG_OPTIONS = [
  { label: 'Vert Menthe', bg: 'bg-mint', accent: 'text-lead-green' },
  { label: 'Jaune', bg: 'bg-yellow-bg', accent: 'text-[#ff9d00]' },
  { label: 'Corail', bg: 'bg-[#fbebeb]', accent: 'text-coral' },
];

const EMPTY: Omit<VideoCapsule, 'id'> = {
  title: '', duration: '04:00', duration_sec: 240,
  speaker: 'Lina NGUERELESSIO', desc: '',
  bg_color: 'bg-mint', accent: 'text-lead-green',
  badge: '👶 Petite Enfance • 4 min', video_url: '',
};

const parseDurationSec = (mmss: string): number => {
  const parts = mmss.split(':').map(Number);
  if (parts.length === 2) return (parts[0] || 0) * 60 + (parts[1] || 0);
  return 0;
};

const COLUMNS: Column<VideoCapsule>[] = [
  { key: 'title', label: 'Titre', truncate: true },
  { key: 'badge', label: 'Badge', truncate: true },
  { key: 'duration', label: 'Durée' },
  { key: 'video_url', label: 'Fichier', render: v => v ? (
    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-full">✓ Chargé</span>
  ) : <span className="text-gray-300 text-xs">Aucun</span> },
];

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}

export function VideoCapsulesAdmin() {
  const [data, setData] = useState<VideoCapsule[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<VideoCapsule>>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    api.list<VideoCapsule>('video_capsules').then(setData).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setModalOpen(true); };
  const openEdit = (item: VideoCapsule) => { setForm(item); setEditId(item.id); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) await api.update<VideoCapsule>('video_capsules', editId, form);
      else await api.create<VideoCapsule>('video_capsules', form);
      setModalOpen(false);
      load();
    } catch (e: unknown) { alert('Erreur : ' + (e instanceof Error ? e.message : '')); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette capsule vidéo ?')) return;
    await api.remove('video_capsules', id);
    load();
  };

  const set = (f: keyof VideoCapsule, v: string | number) => setForm(p => ({ ...p, [f]: v }));

  const handleDurationChange = (val: string) => {
    set('duration', val);
    set('duration_sec', parseDurationSec(val));
  };

  const handleBgChange = (bg: string) => {
    const opt = BG_OPTIONS.find(o => o.bg === bg);
    setForm(p => ({ ...p, bg_color: bg, accent: opt?.accent ?? 'text-lead-green' }));
  };

  return (
    <Layout title="Capsules Vidéo — Minutes Précieuses">
      <DataTable data={data} columns={COLUMNS} onEdit={openEdit} onDelete={handleDelete}
        onAdd={openAdd} isLoading={loading} addLabel="Nouvelle capsule" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editId ? 'Modifier la capsule' : 'Nouvelle capsule vidéo'} onSubmit={handleSave} isLoading={saving}>
        <Field label="Titre"><input className={input} value={form.title ?? ''} onChange={e => set('title', e.target.value)} /></Field>
        <Field label="Description">
          <textarea className={`${input} h-24 resize-none`} value={form.desc ?? ''} onChange={e => set('desc', e.target.value)} />
        </Field>
        <Field label="Fichier vidéo (MP4, WEBM...)">
          <FileUpload
            value={form.video_url ?? ''} onChange={v => set('video_url', v)}
            accept="video/*,.mp4,.webm,.mov"
            label="un fichier vidéo" previewType="file"
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Durée (mm:ss)">
            <input className={input} value={form.duration ?? ''} onChange={e => handleDurationChange(e.target.value)} placeholder="04:00" />
          </Field>
          <Field label="Durée en secondes">
            <input type="number" className={input} value={form.duration_sec ?? 0}
              onChange={e => set('duration_sec', Number(e.target.value))} readOnly />
          </Field>
        </div>
        <Field label="Intervenant"><input className={input} value={form.speaker ?? ''} onChange={e => set('speaker', e.target.value)} /></Field>
        <Field label="Badge affiché">
          <input className={input} value={form.badge ?? ''} onChange={e => set('badge', e.target.value)} placeholder="👶 Petite Enfance • 4 min" />
        </Field>
        <Field label="Couleur de fond">
          <select className={input} value={form.bg_color ?? ''} onChange={e => handleBgChange(e.target.value)}>
            {BG_OPTIONS.map(o => <option key={o.bg} value={o.bg}>{o.label}</option>)}
          </select>
        </Field>
      </Modal>
    </Layout>
  );
}
