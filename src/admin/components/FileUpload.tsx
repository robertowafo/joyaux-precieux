import { useRef, useState } from 'react';
import { Upload, X, Loader2, FileText, AlertCircle } from 'lucide-react';
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
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isImage = previewType === 'image' || (!previewType && accept.includes('image'));

  const handleFile = async (file: File) => {
    setUploading(true);
    setProgress(0);
    setError('');
    try {
      const { url } = await api.upload(file, setProgress);
      onChange(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue lors de l\'envoi.');
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

      {value && !uploading && (
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

      {uploading ? (
        <div className="w-full px-4 py-3 border-2 border-dashed border-[#1f4a38]/30 rounded-xl bg-[#1f4a38]/5">
          <div className="flex items-center gap-2 text-xs text-[#1f4a38] font-semibold mb-2">
            <Loader2 size={14} className="animate-spin shrink-0" />
            Envoi en cours... {progress}%
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1f4a38] rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-1.5">
            Peut prendre plusieurs minutes pour une vidéo, selon votre connexion — ne fermez pas cette page.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-[#1f4a38] hover:text-[#1f4a38] hover:bg-[#1f4a38]/5 transition-all cursor-pointer"
        >
          <Upload size={14} />
          {value ? `Changer ${label}` : `Charger ${label} depuis cet appareil`}
        </button>
      )}

      {error && (
        <div className="flex items-start gap-1.5 text-[11px] text-red-600 font-medium bg-red-50 border border-red-100 rounded-lg px-2.5 py-2">
          <AlertCircle size={13} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
