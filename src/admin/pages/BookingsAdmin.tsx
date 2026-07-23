import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { api } from '../lib/api';
import { Phone, Mail, Calendar, Clock, User, Baby, MessageSquare, Trash2, RefreshCw } from 'lucide-react';

interface Booking {
  id: number;
  service: string;
  date: string;
  time: string;
  full_name: string;
  phone: string;
  email: string;
  child_name: string;
  child_age: string;
  context: string;
  orientation: string;
  status: string;
  created_at: string;
}

const STATUSES = [
  { value: 'nouveau', label: '🆕 Nouveau', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'confirme', label: '✅ Confirmé', color: 'bg-green-50 text-green-700 border-green-200' },
  { value: 'termine', label: '🏁 Terminé', color: 'bg-gray-100 text-gray-600 border-gray-200' },
  { value: 'annule', label: '❌ Annulé', color: 'bg-red-50 text-red-600 border-red-200' },
];

export function BookingsAdmin() {
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.list<Booking>('bookings').then(setData).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const setStatus = async (id: number, status: string) => {
    await api.update<Booking>('bookings', id, { status } as Partial<Booking>);
    setData(d => d.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette réservation ?')) return;
    await api.remove('bookings', id);
    load();
  };

  const waLink = (b: Booking) => {
    const phone = b.phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Bonjour ${b.full_name}, je reviens vers vous concernant votre demande de rendez-vous « ${b.service} » du ${b.date} à ${b.time}.`);
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <Layout title="Réservations">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{data.length} demande{data.length > 1 ? 's' : ''} de rendez-vous</p>
        <button onClick={load} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200 transition-colors">
          <RefreshCw size={13} /> Actualiser
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 py-10 text-center">Chargement...</p>
      ) : data.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-3xl mb-2">📅</p>
          <p className="text-sm text-gray-500 font-medium">Aucune réservation pour le moment.</p>
          <p className="text-xs text-gray-400 mt-1">Les demandes de rendez-vous prises sur le site apparaîtront ici.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map(b => {
            const st = STATUSES.find(s => s.value === b.status) ?? STATUSES[0];
            return (
              <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-[#1f4a38] text-sm">{b.service || 'Consultation'}</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">Reçue le {b.created_at?.slice(0, 16)}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${st.color} shrink-0`}>{st.label}</span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-700 mb-3">
                  <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#1f4a38]" /> {b.date || '—'}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#1f4a38]" /> {b.time || '—'}</span>
                  <span className="flex items-center gap-1.5"><User size={12} className="text-[#1f4a38]" /> {b.full_name}</span>
                  <span className="flex items-center gap-1.5"><Phone size={12} className="text-[#1f4a38]" /> {b.phone}</span>
                  <span className="flex items-center gap-1.5 col-span-2 truncate"><Mail size={12} className="text-[#1f4a38] shrink-0" /> {b.email}</span>
                  {(b.child_name || b.child_age) && (
                    <span className="flex items-center gap-1.5 col-span-2"><Baby size={12} className="text-[#1f4a38]" /> {b.child_name} {b.child_age && `(${b.child_age})`}</span>
                  )}
                  {b.orientation && <span className="col-span-2 text-gray-500">Orientation : {b.orientation}</span>}
                </div>

                {b.context && (
                  <div className="flex items-start gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-lg p-2.5 mb-3">
                    <MessageSquare size={12} className="text-[#1f4a38] shrink-0 mt-0.5" />
                    <span className="italic">{b.context}</span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
                  <select
                    value={b.status}
                    onChange={e => setStatus(b.id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20"
                  >
                    {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  <div className="flex items-center gap-2">
                    <a href={waLink(b)} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-[11px] font-bold hover:opacity-90 transition-opacity">
                      📲 WhatsApp
                    </a>
                    <button onClick={() => handleDelete(b.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Supprimer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
