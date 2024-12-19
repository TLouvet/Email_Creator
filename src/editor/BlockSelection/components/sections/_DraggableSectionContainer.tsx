import { PropsWithChildren } from 'react';
import { BlockType } from '../../../../_core/blocks/blocks';
import { useSetDragBlockType } from '../../../../_core/features/editor.hooks';
import { Draggable } from '../../../../_react_builder/components/Draggable';

type DraggableSectionContainerProps = Readonly<
  PropsWithChildren<{
    className?: string;
    columns: number;
    layout: string;
  }>
>;

export function DraggableSectionContainer({ className, columns, layout, children }: DraggableSectionContainerProps) {
  const setDragBlockType = useSetDragBlockType();

  return (
    <Draggable
      data={{ type: BlockType.SECTION_CONTAINER, columns, layout }}
      className={className}
      onDragStart={() => setDragBlockType(BlockType.SECTION_CONTAINER)}
    >
      {children}
    </Draggable>
  );
}
