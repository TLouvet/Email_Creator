import { EMPTY_BLOCK } from '../../blocks/blocks';
import { generateID } from '../../utils/generateID';
import { hasChildren, hasEmptyChildren } from './shared';

/**
 * A section should always have one child and should never be empty.
 * If it happens that a section is empty at some point (e.g after a block removal), insert
 * the special Empty block which creates a placeholder zone waiting for a drop
 */
export function ensureNonEmptySections(blocks: any[]): any[] {
  return blocks.map(processBlock);
}

function processBlock(block: any): any {
  if (hasEmptyChildren(block)) {
    return addEmptyBlock(block);
  }

  if (hasChildren(block)) {
    return processChildren(block);
  }

  return block;
}

function processChildren(block: any): any {
  return {
    ...block,
    children: ensureNonEmptySections(block.children),
  };
}

function addEmptyBlock(block: Record<string | number | symbol, unknown>): any {
  return {
    ...block,
    children: [{ ...EMPTY_BLOCK, data_id: generateID() }],
  };
}
