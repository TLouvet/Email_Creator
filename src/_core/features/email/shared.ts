import { BlockType } from '../../blocks/blocks';
import { WithDataId, WithMaybeChildren, WithType } from './types';

export function hasEmptyChildren(block: WithMaybeChildren): boolean {
  return hasChildren(block) && block.children!.length === 0;
}

export function hasChildren(block: WithMaybeChildren): boolean {
  return !!block.children;
}

export function isTargetContainer(block: WithType, id: string): boolean {
  return block.type === BlockType.CONTAINER && block.children.some((child: WithDataId) => isTarget(child, id));
}

export function isTarget(block: WithDataId, id: string): boolean {
  return block.data_id === id;
}
