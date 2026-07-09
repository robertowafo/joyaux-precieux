import { useRef, useState } from 'react';
import { Upload, X, Loader2, FileText } from 'lucide-react';
import { api } from '../lib/api';

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
  previewType?: 'image' | 'file';
}

export function FileUpload({
  value,
  onChange,
  accept = 'image/*',
  label = 'un fichier',
  previewType,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isImage = previewType === 'image' || (!previewType && accept.includes('image'));

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const { url } = await api.upload(file);
      onChange(url);
    } catch (e: unknown) {
      alert('Erreur lors de l\'envoi : ' + (e instanceof Error ? e.message : 'Erreur inconnue'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {value && (
        <div className="relative inline-flex items-start gap-2">
          {isImage ? (
            <img
              src={value}
              alt="Aperçu"
              className="h-20 w-auto rounded-xl border border-gray-200 object-cover shadow-sm"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl text-xs text-gray-600 border border-gray-200 max-w-xs truncate">
              <FileText size={14} className="shrink-0 text-[#1f4a38]" />
              <span className="truncate">{value.split('/').pop()}</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => onChange('')}
            className="shrink-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors -mt-1 -ml-1 shadow-sm"
          >
            <X size={10} />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-[#1f4a38] hover:text-[#1f4a38] hover:bg-[#1f4a38]/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Upload size={14} />
        )}
        {uploading ? 'Envoi en cours...' : value ? `Changer ${label}` : `Charger ${label}`}
      </button>
    </div>
  );
}
