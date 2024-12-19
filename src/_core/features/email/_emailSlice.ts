import { createSlice } from '@reduxjs/toolkit';
import { removeBlockFromEmail } from './remove';
import { duplicateBlockFromEmail } from './duplicate';
import { onBlockInsertion } from './insertBlock';
import { defaultGlobalStyle } from './_defaultGlobalStyle';
import { chain } from '../../utils/chain';
import { ensureNonEmptySections } from './ensureNoEmptySections';
import { defaultEmail } from './_defaultEmail';
import { BlockType, injectSection } from '../../blocks/blocks';
import { generateID } from '../../utils/generateID';

export const emailSlice = createSlice({
  name: 'email',
  initialState: {
    globalStyle: defaultGlobalStyle,
    value: defaultEmail,
    block: null,
    currentBlockID: null,
  },
  selectors: {
    getEmail: (state) => state.value,
    getBlock: (state) => state.block,
    getGlobalStyle: (state) => state.globalStyle,
    getCurrentBlock2: (state) => {
      const searchChildren = (blocks, id) => {
        for (const block of blocks) {
          if (block.data_id === id) {
            return block;
          }
          if (block.children) {
            const found = searchChildren(block.children, id);
            if (found) {
              return found;
            }
          }
        }
        return null;
      };

      return searchChildren(state.value, state.currentBlockID);
    },
    getParentContainer: (state) => {
      if (!state.block) {
        return null;
      }
      const parentContainer = findParentContainer(state.value, state.block.data_id);
      return parentContainer;
    },
  },
  reducers: {
    setEmail: (state, action) => {
      state.value = action.payload;
    },
    selectBlock: (state, action) => {
      state.block = action.payload;
      state.currentBlockID = action.payload?.data_id;
    },
    saveToLocalStorage: (state) => {
      localStorage.setItem('last_email', JSON.stringify(state.value));
    },
    loadLastEmail: (state) => {
      const lastEmail = localStorage.getItem('last_email');
      if (lastEmail) {
        state.value = JSON.parse(lastEmail);
      }
    },
    // Update style for one block
    updateLocalStyle: (state, action) => {
      if (!state.block) {
        return;
      }

      state.block = {
        ...state.block,
        style: { ...state.block.style, [action.payload.style.attribute]: action.payload.style.value },
      };

      // Particularité si le block actuellement sélectionné est un bloc texte et qu'on veut modifier textAlign, alors on modifie le bloc de texte
      if (state.block.type === BlockType.TEXT && action.payload.style.attribute === 'textAlign') {
        state.value = findAndUpdateBlock(
          state.value,
          (state.block as any).data_id,
          action.payload.style.attribute,
          action.payload.style.value
        );
        return;
      }

      console.log('STATE BLCO', state.block.type, BlockType.IMAGE);

      if (state.block.type === BlockType.IMAGE && action.payload.style.attribute === 'textAlign') {
        console.log('UPDATE LOCAL STYLE IMAGE', action.payload);
        if (action.payload.style.value === 'center') {
          state.value = findAndUpdateBlock(state.value, (state.block as any).data_id, 'marginInline', 'auto');
          return;
        }

        if (action.payload.style.value === 'left') {
          state.value = findAndUpdateBlock(state.value, (state.block as any).data_id, 'marginInline', '0');
          return;
        }

        if (action.payload.style.value === 'right') {
          state.value = findAndUpdateBlock(state.value, (state.block as any).data_id, 'marginInline', 'auto 0');
          return;
        }

        return;
      }

      // en fait il se peut qu'on cherche à modifier le container ici
      if (action.payload?.type === 'container') {
        console.log('UPDATE LOCAL STYLE CONTAINER', action.payload);
        // Modifier l'entièreté du state pour le container
        state.value = findAndUpdateParentContainer(
          state.value,
          (state.block as any).data_id,
          action.payload.style.attribute,
          action.payload.style.value
        );
        return;
      }
      // Donc il faut ajouter la notion de type de modification
      // en gros si ça vient de la view block, on considère que c'est le parent qui est modifié
      console.log('UPDATE LOCAL STYLE', action.payload);

      // Modifier l'entièreté du state
      state.value = findAndUpdateBlock(
        state.value,
        (state.block as any).data_id,
        action.payload.style.attribute,
        action.payload.style.value
      );
    },
    updateContent: (state, action) => {
      if (!state.block) {
        return;
      }
      state.value = findAndUpdateBlockContent(state.value, (state.block as any).data_id, action.payload);
    },
    updateProperty: (state, action) => {
      if (!state.block) {
        return;
      }
      state.value = findAndUpdateBlockProperty(
        state.value,
        (state.block as any).data_id,
        action.payload.property,
        action.payload.value
      );
    },
    // Insertion
    insertBlock: (state, action) => {
      if (!action.payload.parent) {
        return;
      }
      state.value = onBlockInsertion(state, action);
    },
    insertSection(state, action) {
      // Injecter le style du mail ?
      const generateId = (block) => {
        const newBlock = { ...block, data_id: generateID() }; // Crée une copie avec un nouvel ID
        if (block.children) {
          newBlock.children = block.children.map(generateId); // Applique récursivement
        }
        return newBlock;
      };
      const section = chain(injectSection, generateId).withInitialArgs(
        action.payload.columns,
        action.payload.layout
      ) as any;

      if (!action.payload.insertAfter) {
        // Si insertAfter est null, on insère la section en premier
        state.value = [{ ...section, style: { ...section.style, ...state.globalStyle.section } }, ...state.value];
      } else {
        const insertIndex = state.value.findIndex((block) => block.data_id === action.payload.insertAfter);

        if (insertIndex === -1) {
          // Si l'ID n'est pas trouvé, on ajoute la section à la fin par défaut
          state.value = [...state.value, { ...section, style: { ...section.style, ...state.globalStyle.section } }];
        } else {
          // Sinon, on insère la section juste après l'index trouvé
          state.value = [
            ...state.value.slice(0, insertIndex + 1), // Tous les blocs jusqu'à l'élément trouvé inclus
            { ...section, style: { ...section.style, ...state.globalStyle.section } }, // La nouvelle section
            ...state.value.slice(insertIndex + 1), // Tous les blocs après l'élément trouvé
          ];
        }
      }
    },
    // Removal
    removeBlock: (state) => {
      if (!state.block) {
        return;
      }

      state.value = chain(removeBlockFromEmail, ensureNonEmptySections).withInitialArgs(
        state.value,
        (state.block as any).data_id
      ) as any;
      state.block = null;
    },
    duplicateBlock: (state) => {
      state.value = duplicateBlockFromEmail(state.value, (state.block as any)?.data_id);
    },
    // Update mailing style
    updateGlobalStyle: (state, action) => {
      // action.payload = { type: 'section' | 'global', property: string, value: any }

      if (!state.globalStyle[action.payload.type]) {
        return;
      }

      state.globalStyle[action.payload.type] = {
        ...state.globalStyle[action.payload.type],
        [action.payload.property]: action.payload.value,
      };
      // state.value = state.value.map((block) => applyGlobalStyle(block, state.globalStyle));
    },
  },
});

// Function to find the parent container of a block with a given data_id
function findParentContainer(blocks: any[], data_id: string): any | null {
  for (const block of blocks) {
    if (block.children) {
      for (const child of block.children) {
        if (child.data_id === data_id) {
          return block;
        }
      }
      const parent = findParentContainer(block.children, data_id);
      if (parent) {
        return parent;
      }
    }
  }
  return null;
}

export function applyGlobalStyle(block, globalStyle) {
  const style = globalStyle[block.type.toLowerCase()] || {};
  const styledBlock = { ...block, style: { ...style, ...block.style } };
  if (block.children) {
    styledBlock.children = block.children.map((child) => applyGlobalStyle(child, globalStyle));
  }

  return styledBlock;
}

function findAndUpdateBlockProperty(blocks: any[], id: string, property: string, value: any): any[] {
  return blocks.map((block) => {
    if (block.data_id === id) {
      // Crée une copie du block et met à jour la propriété cible
      return {
        ...block,
        properties: {
          ...block.properties,
          [property]: value,
        },
      };
    }
    if (block.children) {
      // Applique récursivement findAndUpdateBlock sur les enfants
      return {
        ...block,
        children: findAndUpdateBlockProperty(block.children, id, property, value),
      };
    }
    return block; // Retourne le block inchangé
  });
}

function findAndUpdateBlockContent(blocks: any[], id: string, value: any): any[] {
  return blocks.map((block) => {
    if (block.data_id === id) {
      // Crée une copie du block et met à jour la propriété cible
      return {
        ...block,
        data: {
          ...block.data,
          text: value,
        },
      };
    }
    if (block.children) {
      // Applique récursivement findAndUpdateBlock sur les enfants
      return {
        ...block,
        children: findAndUpdateBlockContent(block.children, id, value),
      };
    }
    return block; // Retourne le block inchangé
  });
}

function findAndUpdateParentContainer(blocks: any[], childId: string, property: string, value: any): any[] {
  return blocks.map((block) => {
    if (block.children) {
      const isParent = block.children.some((child: any) => child.data_id === childId);

      if (isParent) {
        // Met à jour le parent (le conteneur)
        return {
          ...block,
          style: {
            ...block.style,
            [property]: value,
          },
        };
      }

      // Continue à chercher récursivement dans les enfants
      return {
        ...block,
        children: findAndUpdateParentContainer(block.children, childId, property, value),
      };
    }

    return block; // Retourne le bloc inchangé
  });
}

function findAndUpdateBlock(blocks: any[], id: string, property: string, value: any): any[] {
  return blocks.map((block) => {
    if (block.data_id === id) {
      // Crée une copie du block et met à jour la propriété cible
      return {
        ...block,
        style: {
          ...block.style,
          [property]: value,
        },
      };
    }
    if (block.children) {
      // Applique récursivement findAndUpdateBlock sur les enfants
      return {
        ...block,
        children: findAndUpdateBlock(block.children, id, property, value),
      };
    }
    return block; // Retourne le block inchangé
  });
}

export const {
  setEmail,
  updateLocalStyle,
  updateGlobalStyle,
  selectBlock,
  removeBlock,
  duplicateBlock,
  insertBlock,
  updateContent,
  insertSection,
  updateProperty,
  saveToLocalStorage,
  loadLastEmail,
} = emailSlice.actions;
export const { getEmail, getBlock, getGlobalStyle, getParentContainer, getCurrentBlock2 } = emailSlice.selectors;
export default emailSlice.reducer;
