import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { api } from '../lib/api';
import { Trash2, Mail, Download, RefreshCw } from 'lucide-react';

interface Email {
  id: number;
  email: string;
  name: string;
  source: string;
  created_at: string;
}

export function EmailsAdmin() {
  const [data, setData] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    setLoading(true);
    api.list<Email>('emails').then(setData).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleDelete = async (id: number, email: string) => {
    if (!confirm(`Supprimer ${email} de la liste ?`)) return;
    await api.remove('emails', id);
    load();
  };

  const exportCsv = () => {
    const rows = [['ID', 'Email', 'Nom', 'Source', 'Date']];
    filtered.forEach(e => rows.push([String(e.id), e.email, e.name, e.source, e.created_at]));
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'emails-joyaux-precieux.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = search
    ? data.filter(e => e.email.toLowerCase().includes(search.toLowerCase()) || e.name.toLowerCase().includes(search.toLowerCase()))
    : data;

  return (
    <Layout title="Emails collectés">
      {/* Header actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#1f4a38] text-white rounded-xl px-4 py-2 text-sm font-bold">
            {data.length} contact{data.length !== 1 ? 's' : ''}
          </div>
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] w-48"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={14} /> Actualiser
          </button>
          <button
            onClick={exportCsv}
            disabled={data.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#1f4a38] text-white rounded-xl text-sm font-bold hover:bg-[#e05a47] transition-colors disabled:opacity-50"
          >
            <Download size={14} /> Exporter CSV
          </button>
        </div>
      </div>

      {/* Endpoint info */}
      <div className="mb-4 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800">
        <strong>Pour collecter des emails depuis le site :</strong> faites un POST vers{' '}
        <code className="bg-amber-100 px-1 rounded">/api/emails</code> avec{' '}
        <code className="bg-amber-100 px-1 rounded">{'{"email":"...","name":"...","source":"contact"}'}</code>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-[#1f4a38]/20 border-t-[#1f4a38] rounded-full animate-spin mx-auto" />
            <p className="text-sm text-gray-400 mt-3">Chargement...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Mail size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">
              {search ? 'Aucun résultat pour cette recherche.' : 'Aucun email collecté pour l\'instant.'}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 w-12">#</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">Email</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">Nom</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">Source</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">Date</th>
                <th className="w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400 text-xs font-mono">{row.id}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${row.email}`} className="text-[#1f4a38] text-xs hover:underline font-medium">
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{row.name || '—'}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                      {row.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(row.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(row.id, row.email)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
