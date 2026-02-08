'use client';

import React from "react";
import { KanbanBoardProps } from './types';
import { KanbanColumnComponent } from './kanban-column';
import { useKanbanBoard } from './use-kanban-board';
import { cn } from "./utils";

export function KanbanBoard({ initialColumns }: KanbanBoardProps) {
  const {
    columns,
    addCard,
    deleteCard,
    editCard,
    moveCard,
    handleDragStart
  } = useKanbanBoard(initialColumns);

  return (
    <div className={cn(
      "flex flex-col sm:flex-row gap-6 pb-4 pt-2",
      "items-stretch sm:items-start sm:justify-center"
    )}>
      {columns.map((column) => (
        <KanbanColumnComponent
          key={column.id}
          column={column}
          onCardAdd={addCard}
          onCardDelete={deleteCard}
          onCardEdit={editCard}
          onCardMove={moveCard}
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  );
}
