import { useRef } from 'react';
import { BlockType } from '../../_core/blocks/blocks';
import { useCurrentBlockView, useUpdateBlockText } from '../../_core/features/hooks';

export function HTMLTextEditor() {
  const currentBlock = useCurrentBlockView();
  const updateBlockContent = useUpdateBlockText();
  const editorRef = useRef<HTMLDivElement>(null);

  if (currentBlock?.type !== BlockType.TEXT) {
    return null;
  }

  const applyStyleToSelection = (tag: string) => {
    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    const wrapper = document.createElement(tag);
    range.surroundContents(wrapper);

    if (editorRef.current) {
      updateBlockContent(editorRef.current.innerHTML); // Met à jour Redux avec le nouveau HTML
    }
  };

  return (
    <div
      className='absolute bg-white z-50 p-4 rounded-lg shadow border border-gray-200 w-full'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex space-x-2 mb-2 w-full'>
        <button
          onClick={() => applyStyleToSelection('strong')}
          className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
        >
          Bold
        </button>
        <button onClick={() => applyStyleToSelection('em')} className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'>
          Italic
        </button>
        <button onClick={() => applyStyleToSelection('u')} className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'>
          Underline
        </button>
      </div>
      <div>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning={true} // Pour éviter les warnings
          dangerouslySetInnerHTML={{ __html: currentBlock.data.text }} // Injecte le contenu initial
          onInput={() => {
            if (editorRef.current) {
              updateBlockContent(editorRef.current.innerHTML); // Met à jour Redux en temps réel
            }
          }}
          style={{
            border: '1px solid #ddd',
            padding: '10px',
            minHeight: '150px',
            backgroundColor: '#f9f9f9',
          }}
        ></div>
      </div>
    </div>
  );
}
