import { generateID } from '../../utils/generateID';
import { hasChildren } from './shared';
import { AnyBlockWithChildren } from './types';

/**
 * Deeply clones a block and all its children, assigning new IDs to each.
 *
 * This process involves several steps:
 * 1. Cloning the block itself and assigning a new ID.
 * 2. Checking if the block has children.
 * 3. If the block has children, recursively cloning each child and assigning new IDs to them.
 *
 * @param block - The block to clone.
 * @returns A new block with new IDs.
 */
export function deepCloneWithNewIds(block: AnyBlockWithChildren): AnyBlockWithChildren {
  const newBlock = cloneBlockWithNewId(block);

  if (hasChildren(block)) {
    newBlock.children = cloneChildrenWithNewIds(block.children);
  }

  return newBlock;
}

function cloneBlockWithNewId(block: AnyBlockWithChildren): AnyBlockWithChildren {
  return {
    ...block,
    data_id: generateID(),
  };
}

function cloneChildrenWithNewIds(children: AnyBlockWithChildren[]): AnyBlockWithChildren[] {
  return children.map(deepCloneWithNewIds);
}
