import { Pencil, Trash2, Plus } from 'lucide-react';

export interface Column<T> {
  key: string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  truncate?: boolean;
}

interface DataTableProps<T extends { id: number }> {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  isLoading?: boolean;
  addLabel?: string;
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
  onAdd,
  isLoading,
  addLabel = 'Ajouter',
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <div className="w-8 h-8 border-3 border-[#1f4a38]/20 border-t-[#1f4a38] rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-500 mt-3">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Table header with add button */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">{data.length} entrée{data.length !== 1 ? 's' : ''}</p>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#1f4a38] text-white text-sm font-bold rounded-xl hover:bg-[#e05a47] transition-colors"
        >
          <Plus size={15} />
          {addLabel}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {data.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            Aucune entrée. Cliquez sur « {addLabel} » pour commencer.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 w-12">ID</th>
                {columns.map(col => (
                  <th
                    key={col.key}
                    className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="text-right px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400 text-xs font-mono">{row.id}</td>
                  {columns.map(col => {
                    const value = (row as Record<string, unknown>)[col.key];
                    return (
                      <td key={col.key} className="px-4 py-3 text-gray-700">
                        {col.render ? (
                          col.render(value, row)
                        ) : col.truncate ? (
                          <span className="block max-w-xs truncate text-xs" title={String(value ?? '')}>
                            {String(value ?? '')}
                          </span>
                        ) : (
                          <span className="text-xs">{String(value ?? '')}</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(row)}
                        className="p-1.5 rounded-lg hover:bg-[#1f4a38]/10 text-[#1f4a38] transition-colors"
                        title="Modifier"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(row.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
