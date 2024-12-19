import { BlockType } from '../../blocks/blocks';
import { chain } from '../../utils/chain';
import { applyGlobalStyle } from './_emailSlice';

export function onBlockInsertion(initialState, action): any[] {
  return chain(insertIntoSection, removeEmptyBlocksOnInsert).withInitialArgs(initialState, action);
}

export function insertIntoSection(initialState, action): any[] {
  const blocks = initialState.value;
  const targetID = action.payload.parent;
  const block = action.payload.data;
  const styledBlock = applyGlobalStyle(block, initialState.globalStyle); // Applique les styles globaux au bloc

  return blocks.map((section) => {
    if (section.data_id === targetID) {
      // Cas où l'élément correspondant est une section
      if (section.type === BlockType.BASIC_SECTION) {
        return {
          ...section,
          children: [...section.children, styledBlock], // Ajouter à la fin des enfants
        };
      }
    }

    if (section.children) {
      // Cherche dans les enfants pour voir si le targetID correspond à un enfant
      const index = section.children.findIndex((child) => child.data_id === targetID);

      if (index !== -1) {
        // Cas où targetID correspond à un enfant, insère juste après
        return {
          ...section,
          children: [
            ...section.children.slice(0, index + 1), // Tous les enfants jusqu'à l'élément trouvé inclus
            styledBlock, // Insère le nouveau bloc avec le style appliqué
            ...section.children.slice(index + 1), // Le reste des enfants
          ],
        };
      }

      // Sinon, continue récursivement dans les enfants
      return {
        ...section,
        children: insertIntoSection({ ...initialState, value: section.children }, action),
      };
    }

    // Retourne la section inchangée si rien ne correspond
    return section;
  });
}

function removeEmptyBlocksOnInsert(blocks: any[]): any[] {
  return blocks.map((block) => {
    // Vérifie si le bloc est de type BASIC_SECTION
    if (
      block.type === BlockType.BASIC_SECTION &&
      block.children?.length > 1 && // Plus d'un enfant
      block.children?.[0]?.children?.[0]?.type === BlockType.EMPTY // Le premier enfant contient un EMPTY_BLOCK
    ) {
      // Supprime le EMPTY_BLOCK en filtrant les enfants
      return {
        ...block,
        children: block.children.slice(1),
      };
    }

    // Si le bloc a des enfants, applique récursivement la fonction
    if (block.children) {
      return {
        ...block,
        children: removeEmptyBlocksOnInsert(block.children),
      };
    }

    return block; // Retourne le bloc inchangé
  });
}
