import { PropsWithChildren } from 'react';
import { Draggable } from './Draggable';
import { WithLabel } from '../../_core/types';
import { useSetDragBlockType } from '../../_core/features/editor.hooks';
import { BlockType } from '../../_core/blocks/blocks';

type DraggableCardProps = Readonly<PropsWithChildren<{ data: WithLabel }>>;

/**
 * Tout bloc allant de l'interface vers la drop zone doit avoir ce composant pour parent
 */
export function DraggableCard({ data, children }: DraggableCardProps) {
  const setDragBlockType = useSetDragBlockType();

  return (
    <Draggable
      data={{ data }}
      className='p-3 xl:h-28 shadow-lg rounded-md bg-white w-full hover:shadow-[0_0_2px_2px_rgb(99,97,127)] focus:shadow-[0_0_2px_2px_rgb(99,97,127)] focus:outline-none'
      onDragStart={() => setDragBlockType(BlockType.CONTAINER)}
    >
      {children}
    </Draggable>
  );
}
