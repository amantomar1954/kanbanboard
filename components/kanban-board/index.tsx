'use client';

import React from "react"

import { KanbanBoardProps } from './types';
import { KanbanColumnComponent } from './kanban-column';
import { useKanbanBoard } from './use-kanban-board';

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
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Board <span className="text-violet-600">Overview</span></h2>
        <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">Manage and track your project tasks with our intuitive Kanban system.</p>
      </div>
      <div className="flex gap-8 overflow-x-auto pb-8 sm:justify-center items-start scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent px-4">
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
    </div>
  );
}
