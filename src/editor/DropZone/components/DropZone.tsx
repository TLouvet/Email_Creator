import { createElement } from 'react';
import {
  useSelectCurrentMailDisplayWidth,
  useSelectHoverBlockID,
  useSetHoverBlockID,
} from '../../../_core/features/editor.hooks';
import { useInsertBlock, useInsertSection, useSelectBlock, useUpdateBlockText } from '../../../_core/features/hooks';
import { generateID } from '../../../_core/utils/generateID';
import { Hoverable } from '../Hoverable';
import { BlockType } from '../../../_core/blocks/blocks';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import { useSelectDragBlockType } from '../../../_react_builder/redux_hooks/selectors';

export function DropZone() {
  const hoveredBlockID = useSelectHoverBlockID();
  const insertBlock = useInsertBlock();
  const insertSection = useInsertSection();
  const currentViewType = useSelectCurrentMailDisplayWidth();
  const updateBlockContent = useUpdateBlockText();
  const setHoveredBlockID = useSetHoverBlockID();
  const setBlock = useSelectBlock();
  const mail = useSelector((state: any) => state.email.value);
  const draggedBlockType = useSelectDragBlockType();

  const handleDragOver = (event: any) => {
    // Empêche le comportement par défaut pour autoriser le drop
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();

    // Obtenir les données de l'élément glissé
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    if (data.type === BlockType.BASIC_SECTION) {
      data.data_id = generateID();
      data.children.forEach((child: any) => {
        child.data_id = generateID();
        child.children.forEach((child: any) => {
          child.data_id = generateID();
        });
      });
    } else {
      if (data.type !== BlockType.SECTION_CONTAINER) {
        data.data.data_id = generateID();
      }
    }

    (data?.data?.children || []).forEach((child: any) => {
      child.data_id = generateID();
    });

    if (data.type === BlockType.SECTION_CONTAINER) {
      insertSection({ ...data, insertAfter: hoveredBlockID });
    } else {
      // Ajouter dans le mail
      insertBlock({ ...data, parent: hoveredBlockID });
      // Changer le block sélectionné
      setBlock(data);
    }
  };

  function createTSXFromMail(mail: any[]) {
    return mail.map((element: any) => {
      const children = element.children ? createTSXFromMail(element.children) : null;
      const isTextBlock = element.type === BlockType.TEXT;

      return (
        <Hoverable
          key={element.data_id}
          data_id={element.data_id}
          db={element.type === BlockType.BASIC_SECTION || element.type === BlockType.SECTION_CONTAINER}
        >
          {createElement(
            element.tag,
            {
              ...(element?.properties || {}), // On peut ajouter des propriétés supplémentaires
              style: {
                ...element.style,
                maxWidth: '100%',
              },
              onChange: (e) => {
                console.log('change', element.type, element?.properties?.contentEditable);
              },
              onInput: (e) => {
                console.log('input', element.type, element?.properties?.contentEditable);
                if (element.type === BlockType.TEXT) {
                  const newText = (e.target as HTMLDivElement).innerText;
                  updateBlockContent(newText); // Met à jour Redux
                }
              },
              suppressContentEditableWarning: true,
              onClick: (e) => {
                // TODO Move cette logic dans redux
                if (element?.children?.at(0)?.type === BlockType.EMPTY) {
                  return;
                }

                if (element.type === BlockType.BASIC_SECTION) {
                  return;
                }

                e.stopPropagation();
                if (element.type === BlockType.CONTAINER) {
                  setBlock(element.children[0]);
                  return;
                }
                setBlock(element);
              },
              // Quand on va passer au dessus alors qu'on est en train de drag, on va donc pouvoir drop dessus ou en tout cas dans la session. L'idée c'est
              // de se limiter à la section en question
              onDragEnter: (e) => {
                if (
                  draggedBlockType !== BlockType.SECTION_CONTAINER &&
                  (element.type === BlockType.CONTAINER || element.type === BlockType.SECTION_CONTAINER)
                ) {
                  e.stopPropagation();
                }

                if (element.type === BlockType.CONTAINER || element.type === BlockType.SECTION_CONTAINER) {
                  setHoveredBlockID(element);
                  return;
                }
              },
              onDragOver: (e) => {
                // Si je suis en train de drag un section container, je ne veux pas set hoverblockid sur un autre block qu'u section container
                if (draggedBlockType === BlockType.SECTION_CONTAINER && element.type !== BlockType.SECTION_CONTAINER) {
                  return;
                }

                // Si je suis en train de drag un block de type section container, je veux pouvoir le dropper sur un container
                if (draggedBlockType === BlockType.SECTION_CONTAINER) {
                  setHoveredBlockID(element);
                  return;
                }

                if (
                  hoveredBlockID !== element.data_id &&
                  element.type === BlockType.CONTAINER &&
                  draggedBlockType !== BlockType.SECTION_CONTAINER
                ) {
                  setHoveredBlockID(element);
                }
              },

              onDragLeave: () => {
                // TODO: Trouver une meilleure solution pour le onDragLeave
                // L'idée c'est qu'on ne veut pas le mettre à null si on est en train de drag le dernier block
                // Mais on veut le mettre à null si on sort par le haut de la première section
                // setHoveredBlockID(null);
              },
              ...(isTextBlock && {
                dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(element.data.text) }, // Injecte le contenu HTML pour les blocs de texte
              }),
            },
            !isTextBlock ? children ?? element?.data?.text ?? null : null
          )}
        </Hoverable>
      );
    });
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragStart={(e) => e.preventDefault()}
      onDragEnd={() => setHoveredBlockID(null)}
      role='DropZone'
      style={{
        width: `${currentViewType + 100}px`,
        position: 'relative',
        minHeight: '100%',
        margin: 'auto',
        flex: 1,
        paddingTop: '50px',
        paddingBottom: '50px',
        paddingLeft: '50px',
        paddingRight: '50px',
      }}
      id='mail-contour'
    >
      {createTSXFromMail(mail)}
    </div>
  );
}
