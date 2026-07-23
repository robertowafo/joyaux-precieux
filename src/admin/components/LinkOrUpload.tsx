import { useState } from 'react';
import { FileUpload } from './FileUpload';

interface LinkOrUploadProps {
  value: string;
  onChange: (v: string) => void;
  accept?: string;
  label?: string;
  linkPlaceholder?: string;
}

const input = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1f4a38]/20 focus:border-[#1f4a38] transition-all';

// Toggle between pasting an external link and uploading a file straight from
// the device — both write to the same value, so switching tabs never loses data.
export function LinkOrUpload({ value, onChange, accept = 'video/*', label = 'un fichier', linkPlaceholder }: LinkOrUploadProps) {
  const [mode, setMode] = useState<'link' | 'upload'>(value.includes('/api/files/') ? 'upload' : 'link');

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5 p-1 bg-gray-100 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setMode('link')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            mode === 'link' ? 'bg-white text-[#1f4a38] shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🔗 Lien externe
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            mode === 'upload' ? 'bg-white text-[#1f4a38] shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          📤 Depuis cet appareil
        </button>
      </div>

      {mode === 'link' ? (
        <input
          className={input}
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={linkPlaceholder}
        />
      ) : (
        <FileUpload value={value} onChange={onChange} accept={accept} label={label} previewType="file" />
      )}
    </div>
  );
}
