import React, { PropsWithChildren } from 'react';
import { Data } from '../../_core/types';
import { useResetAfterDrop } from '../../_core/features/editor.hooks';

type DraggableProps = Readonly<
  PropsWithChildren<{
    data: Data<unknown>;
    className?: string;
    onDragStart?: () => void;
  }>
>;

/**
 * Draggable component abstraction.
 *
 * Allows to drag element, and will automatically reset the state after drop.
 */
export function Draggable({ children, data, className = '', onDragStart }: DraggableProps) {
  const resetAfterDrop = useResetAfterDrop();

  function onDrag(event: React.DragEvent<HTMLButtonElement>) {
    if (onDragStart) {
      onDragStart();
    }

    event.dataTransfer.setData('text/plain', JSON.stringify(data));
  }

  return (
    <button onDragStart={onDrag} draggable={true} className={`cursor-grab ${className}`} onDragEnd={resetAfterDrop}>
      {children}
    </button>
  );
}
