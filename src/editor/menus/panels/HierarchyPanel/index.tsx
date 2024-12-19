import { useSelector } from 'react-redux';
import { BlockType } from '../../../../_core/blocks/blocks';
import { useSetHoverBlockID } from '../../../../_core/features/editor.hooks';

export function HierarchyPanel() {
  const mail = useSelector((state: any) => state.email.value);

  return (
    <div>
      <HierarchyChildren blocks={mail} />
    </div>
  );
}

const translations = {
  [BlockType.BASIC_SECTION]: 'Colonne',
  [BlockType.TEXT]: 'Texte',
  [BlockType.BUTTON]: 'Bouton',
  [BlockType.SECTION_CONTAINER]: 'Section',
  [BlockType.SPACER]: 'Espace',
  [BlockType.DIVIDER]: 'Diviseur',
  [BlockType.IMAGE]: 'Image',
};

function HierarchyChildren({ blocks }: { blocks: any[] }) {
  const setHoveredBlockID = useSetHoverBlockID();

  function handleMouseEnter(block: any) {
    setHoveredBlockID(block.data_id);
  }

  function handleMouseLeave() {
    setHoveredBlockID(null);
  }

  return (
    <div className='ps-5'>
      {blocks.map((block) => (
        <div key={block.data_id}>
          {block.type !== BlockType.CONTAINER && (
            <div
              className='hover:bg-gray-100 cursor-pointer px-4 py-2'
              onMouseEnter={() => handleMouseEnter(block)}
              onMouseLeave={handleMouseLeave}
            >
              {translations[block.type] || block.type}
            </div>
          )}
          <div className='ps-2'>
            {block.children && <HierarchyChildren key={block.data_id} blocks={block.children} />}
          </div>
        </div>
      ))}
    </div>
  );
}
