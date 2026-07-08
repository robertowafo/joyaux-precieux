import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { api } from '../lib/api';

interface Pillar {
  id: number;
  title: string;
  desc: string;
  icon: string;
  badge: string;
  time: string;
  order_idx: number;
}

interface Step {
  id: number;
  ref: string;
  title: string;
  desc: string;
  order_idx: number;
}

const EMPTY_PILLAR: Omit<Pillar, 'id'> = { title: '', desc: '', icon: '🌱', badge: 'Individuel', time: '45 min par séance', order_idx: 0 };
const EMPTY_STEP: Omit<Step, 'id'> = { ref: '01', title: '', desc: '', order_idx: 0 };

const PILLAR_COLS: Column<Pillar>[] = [
  { key: 'icon', label: '  ', render: v => <span className="text-xl">{String(v)}</span> },
  { key: 'title', label: 'Service', truncate: true },
  { key: 'badge', label: 'Public' },
  { key: 'time', label: 'Durée' },
];

const STEP_COLS: Column<Step>[] = [
  { key: 'ref', label: 'Étape', render: v => <span className="font-mono font-bold text-[#1f4a38]">{String(v)}</span> },
  { key: 'title', label: 'Titre', truncate: true },
  { key: 'desc', label: 'Description', truncate: true },
];

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}

export function AccompagnementsAdmin() {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pillars' | 'steps'>('pillars');

  const [pillarModal, setPillarModal] = useState(false);
  const [stepModal, setStepModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pillarForm, setPillarForm] = useState<Partial<Pillar>>(EMPTY_PILLAR);
  const [stepForm, setStepForm] = useState<Partial<Step>>(EMPTY_STEP);
  const [editPillarId, setEditPillarId] = useState<number | null>(null);
  const [editStepId, setEditStepId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    Promise.all([api.list<Pillar>('pillars'), api.list<Step>('steps')])
      .then(([p, s]) => { setPillars(p); setSteps(s); })
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAddPillar = () => { setPillarForm({ ...EMPTY_PILLAR, order_idx: pillars.length }); setEditPillarId(null); setPillarModal(true); };
  const openEditPillar = (item: Pillar) => { setPillarForm(item); setEditPillarId(item.id); setPillarModal(true); };
  const openAddStep = () => { setStepForm({ ...EMPTY_STEP, order_idx: steps.length, ref: String(steps.length + 1).padStart(2, '0') }); setEditStepId(null); setStepModal(true); };
  const openEditStep = (item: Step) => { setStepForm(item); setEditStepId(item.id); setStepModal(true); };

  const savePillar = async () => {
    setSaving(true);
    try {
      if (editPillarId) await api.update<Pillar>('pillars', editPillarId, pillarForm);
      else await api.create<Pillar>('pillars', pillarForm);
      setPillarModal(false); load();
    } catch (e: any) { alert('Erreur : ' + e.message); }
    finally { setSaving(false); }
  };

  const saveStep = async () => {
    setSaving(true);
    try {
      if (editStepId) await api.update<Step>('steps', editStepId, stepForm);
      else await api.create<Step>('steps', stepForm);
      setStepModal(false); load();
    } catch (e: any) { alert('Erreur : ' + e.message); }
    finally { setSaving(false); }
  };

  const deletePillar = async (id: number) => { if (!confirm('Supprimer ce service ?')) return; await api.remove('pillars', id); load(); };
  const deleteStep = async (id: number) => { if (!confirm('Supprimer cette étape ?')) return; await api.remove('steps', id); load(); };

  const sp = (f: keyof Pillar, v: string | number) => setPillarForm(p => ({ ...p, [f]: v }));
  const ss = (f: keyof Step, v: string | number) => setStepForm(p => ({ ...p, [f]: v }));

  return (
    <Layout title="Accompagnements">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['pillars', 'steps'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-[#1f4a38] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            {tab === 'pillars' ? '🌟 Services & Piliers' : '📋 Étapes Méthodologie'}
          </button>
        ))}
      </div>

      {activeTab === 'pillars' && (
        <>
          <DataTable data={pillars} columns={PILLAR_COLS} onEdit={openEditPillar} onDelete={deletePillar} onAdd={openAddPillar} isLoading={loading} addLabel="Nouveau service" />
          <Modal isOpen={pillarModal} onClose={() => setPillarModal(false)} title={editPillarId ? 'Modifier le service' : 'Nouveau service'} onSubmit={savePillar} isLoading={saving}>
            <Field label="Titre du service"><input className={input} value={pillarForm.title ?? ''} onChange={e => sp('title', e.target.value)} /></Field>
            <Field label="Description"><textarea className={`${input} h-28 resize-none`} value={pillarForm.desc ?? ''} onChange={e => sp('desc', e.target.value)} /></Field>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Icône emoji"><input className={input} value={pillarForm.icon ?? ''} onChange={e => sp('icon', e.target.value)} placeholder="🌱" /></Field>
              <Field label="Public cible"><input className={input} value={pillarForm.badge ?? ''} onChange={e => sp('badge', e.target.value)} placeholder="Individuel • Enfants" /></Field>
              <Field label="Durée séance"><input className={input} value={pillarForm.time ?? ''} onChange={e => sp('time', e.target.value)} placeholder="45 min par séance" /></Field>
            </div>
            <Field label="Ordre"><input type="number" className={input} value={pillarForm.order_idx ?? 0} onChange={e => sp('order_idx', Number(e.target.value))} /></Field>
          </Modal>
        </>
      )}

      {activeTab === 'steps' && (
        <>
          <DataTable data={steps} columns={STEP_COLS} onEdit={openEditStep} onDelete={deleteStep} onAdd={openAddStep} isLoading={loading} addLabel="Nouvelle étape" />
          <Modal isOpen={stepModal} onClose={() => setStepModal(false)} title={editStepId ? 'Modifier l\'étape' : 'Nouvelle étape'} onSubmit={saveStep} isLoading={saving}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Référence (ex: 01)"><input className={input} value={stepForm.ref ?? ''} onChange={e => ss('ref', e.target.value)} placeholder="01" /></Field>
              <Field label="Ordre"><input type="number" className={input} value={stepForm.order_idx ?? 0} onChange={e => ss('order_idx', Number(e.target.value))} /></Field>
            </div>
            <Field label="Titre de l'étape"><input className={input} value={stepForm.title ?? ''} onChange={e => ss('title', e.target.value)} /></Field>
            <Field label="Description"><textarea className={`${input} h-28 resize-none`} value={stepForm.desc ?? ''} onChange={e => ss('desc', e.target.value)} /></Field>
          </Modal>
        </>
      )}
    </Layout>
  );
}
