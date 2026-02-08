'use client';

import React, { useState } from "react";
import { Trash2, Edit2 } from 'lucide-react';
import { KanbanCard as KanbanCardType } from './types';
import { toast } from "sonner";

interface KanbanCardProps {
  card: KanbanCardType;
  onDelete: (cardId: string) => void;
  onEdit: (cardId: string, newTitle: string) => void;
  onDragStart: (e: React.DragEvent, cardId: string) => void;
}

export function KanbanCard({
  card,
  onDelete,
  onEdit,
  onDragStart,
}: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(card.title);

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    if (trimmedValue && trimmedValue !== card.title) {
      onEdit(card.id, trimmedValue);
      toast.success("Updated");
    }
    setIsEditing(false);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md hover:border-violet-200 transition-all cursor-grab active:cursor-grabbing group relative"
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') setIsEditing(false);
            }}
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1.5 text-xs font-medium text-stone-500 hover:bg-stone-100 rounded-md transition-colors"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1.5 text-xs font-medium bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p
            onDoubleClick={() => setIsEditing(true)}
            className="text-[14px] font-semibold text-stone-800 leading-snug break-words"
          >
            {card.title}
          </p>

          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-1.5 text-stone-400 hover:text-violet-600 hover:bg-violet-50 rounded-md transition-colors"
              onClick={() => setIsEditing(true)}
              title="Edit"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
            <button
              className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              onClick={() => onDelete(card.id)}
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
