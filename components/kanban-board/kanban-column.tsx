'use client';

import React from "react"

import { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { KanbanColumn as KanbanColumnType } from './types';
import { KanbanCard } from './kanban-card';
import { Button, Input } from '@/components/ui-elements';

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
  const [draggedOver, setDraggedOver] = useState(false);

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onCardAdd(column.id, newCardTitle.trim());
      setNewCardTitle('');
      setShowAddInput(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOver(false);

    const cardId = e.dataTransfer.getData('cardId');
    if (cardId) {
      onCardMove(cardId, column.id);
    }
  };

  return (
    <div
      className={`bg-stone-100/80 backdrop-blur-sm rounded-2xl p-5 min-w-80 max-w-96 flex flex-col border border-stone-200/50 transition-all duration-300 shadow-sm hover:shadow-md ${draggedOver ? 'bg-violet-50 ring-2 ring-violet-200 ring-inset' : ''
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3 className="font-bold text-stone-900 tracking-tight text-lg">
        {column.title}
      </h3>

      <div className="flex-1 space-y-4 mb-6 min-h-[400px]">
        {column.cards.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-12 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50">
            <Plus className="h-8 w-8 text-stone-300 mb-2 opacity-20" />
            <p className="text-sm font-medium text-stone-400">
              No tasks yet
            </p>
          </div>
        ) : (
          column.cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onDelete={onCardDelete}
              onEdit={onCardEdit}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>

      <div className="mt-auto">
        {showAddInput ? (
          <div className="bg-white p-3 rounded-xl shadow-lg border border-stone-100 space-y-3 animate-in fade-in zoom-in duration-200">
            <Input
              autoFocus
              placeholder="What needs to be done?"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              className="text-sm border-stone-200 focus-visible:ring-violet-500 rounded-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddCard();
                if (e.key === 'Escape') setShowAddInput(false);
              }}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg px-3"
                onClick={() => setShowAddInput(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                className="h-8 bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 shadow-sm shadow-violet-200"
                onClick={handleAddCard}
              >
                Create Task
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-center text-stone-500 hover:text-violet-600 hover:bg-violet-50 border border-dashed border-stone-300 hover:border-violet-200 rounded-xl transition-all h-11"
            onClick={() => setShowAddInput(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="font-medium">Add Task</span>
          </Button>
        )}
      </div>
    </div>
  );
}
