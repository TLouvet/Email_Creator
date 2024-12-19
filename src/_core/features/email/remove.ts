import { hasChildren, isTarget, isTargetContainer } from './shared';

export function removeBlockFromEmail(blocks: any[], id: string): any[] {
  return blocks.filter((block) => shouldKeepBlock(block, id));
}

function shouldKeepBlock(block: any, id: string): boolean {
  if (isTarget(block, id)) {
    return false;
  }

  if (isTargetContainer(block, id)) {
    return false;
  }

  if (hasChildren(block)) {
    block.children = removeBlockFromEmail(block.children, id);
  }

  return true;
}
