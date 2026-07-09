import { useEffect, useRef } from 'react';
import {
  Bold, Italic, Underline, List, ListOrdered,
  Heading2, Heading3, Link2, AlignLeft, Minus
} from 'lucide-react';

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichEditor({
  value,
  onChange,
  placeholder = 'Écrivez votre contenu ici...',
  minHeight = '200px',
}: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  };

  const handleLink = () => {
    const url = window.prompt('URL du lien (ex: https://...)');
    if (url) exec('createLink', url);
  };

  const tools: { icon: React.ElementType; title: string; action: () => void }[] = [
    { icon: Bold, title: 'Gras', action: () => exec('bold') },
    { icon: Italic, title: 'Italique', action: () => exec('italic') },
    { icon: Underline, title: 'Souligné', action: () => exec('underline') },
    { icon: Heading2, title: 'Titre', action: () => exec('formatBlock', 'h2') },
    { icon: Heading3, title: 'Sous-titre', action: () => exec('formatBlock', 'h3') },
    { icon: List, title: 'Liste à puces', action: () => exec('insertUnorderedList') },
    { icon: ListOrdered, title: 'Liste numérotée', action: () => exec('insertOrderedList') },
    { icon: Link2, title: 'Lien', action: handleLink },
    { icon: Minus, title: 'Séparateur', action: () => exec('insertHorizontalRule') },
    { icon: AlignLeft, title: 'Paragraphe normal', action: () => exec('formatBlock', 'p') },
  ];

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#1f4a38]/20 focus-within:border-[#1f4a38] transition-all bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-2 bg-gray-50 border-b border-gray-200 flex-wrap">
        {tools.map(({ icon: Icon, title, action }) => (
          <button
            key={title}
            type="button"
            title={title}
            onMouseDown={e => { e.preventDefault(); action(); }}
            className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-500 hover:text-[#1f4a38] transition-all"
          >
            <Icon size={14} />
          </button>
        ))}
        <span className="w-px h-5 bg-gray-200 mx-1" />
        <button
          type="button"
          title="Effacer la mise en forme"
          onMouseDown={e => { e.preventDefault(); exec('removeFormat'); }}
          className="px-2 py-1 text-[10px] rounded hover:bg-white hover:shadow-sm text-gray-400 hover:text-[#1f4a38] transition-all font-medium"
        >
          Effacer
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={() => onChange(editorRef.current?.innerHTML ?? '')}
        className="outline-none p-4 text-sm text-gray-800 leading-relaxed
          [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#1f4a38] [&_h2]:mt-3 [&_h2]:mb-1
          [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#1f4a38] [&_h3]:mt-2 [&_h3]:mb-1
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2
          [&_li]:my-0.5
          [&_a]:text-[#1f4a38] [&_a]:underline
          [&_hr]:border-gray-200 [&_hr]:my-3
          [&_p]:my-1
          empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
        style={{ minHeight }}
      />
    </div>
  );
}
