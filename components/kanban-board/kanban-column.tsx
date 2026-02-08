'use client';

import React, { useState } from "react";
import { Plus } from 'lucide-react';
import { KanbanColumn as KanbanColumnType } from './types';
import { KanbanCard } from './kanban-card';
import { cn } from "./utils";

interface KanbanColumnProps {
  column: KanbanColumnType;
  onCardAdd: (columnId: string, cardTitle: string) => void;
  onCardDelete: (cardId: string) => void;
  onCardEdit: (cardId: string, newTitle: string) => void;
  onCardMove: (cardId: string, targetColumnId: string) => void;
  onDragStart: (e: React.DragEvent, cardId: string) => void;
}

export function KanbanColumnComponent({
  column,
  onCardAdd,
  onCardDelete,
  onCardEdit,
  onCardMove,
  onDragStart,
}: KanbanColumnProps) {
  const [showAddInput, setShowAddInput] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isOver, setIsOver] = useState(false);

  const handleAddCard = () => {
    const trimmedTitle = newCardTitle.trim();
    if (trimmedTitle) {
      onCardAdd(column.id, trimmedTitle);
      setNewCardTitle('');
      setShowAddInput(false);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        const cardId = e.dataTransfer.getData('cardId');
        if (cardId) onCardMove(cardId, column.id);
      }}
      className={cn(
        "flex flex-col w-full sm:w-80 h-auto sm:h-[80vh] min-h-[400px] sm:min-h-[500px] transition-all rounded-2xl bg-stone-100/50 border border-stone-200 p-4 sm:p-5",
        isOver && "bg-violet-50 border-violet-300"
      )}
    >
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="font-bold text-stone-900">{column.title}</h3>
        <span className="text-[11px] font-bold text-stone-500 bg-white px-2 py-0.5 rounded-full border border-stone-200">
          {column.cards.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {column.cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            onDelete={onCardDelete}
            onEdit={onCardEdit}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      <div className="mt-4">
        {showAddInput ? (
          <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-3 animate-in zoom-in-95 duration-200">
            <input
              autoFocus
              placeholder="What needs to be done?"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddCard();
                if (e.key === 'Escape') setShowAddInput(false);
              }}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1.5 text-xs font-medium text-stone-500 hover:bg-stone-50 rounded-md"
                onClick={() => setShowAddInput(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 text-xs font-medium bg-violet-600 text-white rounded-md hover:bg-violet-700"
                onClick={handleAddCard}
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddInput(true)}
            className="w-full flex items-center justify-center gap-2 h-10 rounded-xl border border-dashed border-stone-300 text-stone-500 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 transition-all text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        )}
      </div>
    </div>
  );
}
