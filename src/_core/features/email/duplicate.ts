import { BlockType } from '../../blocks/blocks';
import { deepCloneWithNewIds } from './deepClone';
import { hasChildren, isTargetContainer } from './shared';

export function duplicateBlockFromEmail(blocks: any[], id: string): any[] {
  if (!id) {
    return blocks;
  }

  return blocks.map((block) => processBlockForDuplication(block, id)).flat();
}

function processBlockForDuplication(block: any, id: string): any {
  if (isTargetContainer(block, id) || isTargetSectionContainer(block, id)) {
    return duplicateAndInsertBlock(block);
  }

  if (hasChildren(block)) {
    return processChildren(block, id);
  }

  return block;
}

function isTargetSectionContainer(block: any, id: string): boolean {
  return block.type === BlockType.SECTION_CONTAINER && block.data_id === id;
}

function processChildren(block: any, id: string): any {
  return {
    ...block,
    children: duplicateBlockFromEmail(block.children, id),
  };
}

function duplicateAndInsertBlock(block: any): any[] {
  const duplicatedBlock = deepCloneWithNewIds(block);
  return [block, duplicatedBlock];
}
