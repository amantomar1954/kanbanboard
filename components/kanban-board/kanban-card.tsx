'use client';

import React from "react"

import { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { KanbanCard as KanbanCardType } from './types';
import { Button, Input } from '@/components/ui-elements';

import { toast } from "sonner"
import { MoreVertical } from "lucide-react"

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
    if (editValue.trim() && editValue !== card.title) {
      onEdit(card.id, editValue.trim());
      toast.success("Task updated");
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(card.id);
    toast.success("Task deleted", {
      description: `"${card.title}" has been removed.`,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo delete"), // Logic for undo would be more complex, but providing UI
      },
    });
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md hover:border-violet-200 cursor-grab active:cursor-grabbing transition-all duration-200 group relative"
    >
      {isEditing ? (
        <div className="space-y-3 animate-in fade-in duration-200">
          <Input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="text-sm border-stone-200 focus-visible:ring-violet-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') setIsEditing(false);
            }}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-stone-500 hover:bg-stone-100 rounded-md"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="h-7 text-xs bg-violet-600 hover:bg-violet-700 text-white rounded-md"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <p
            onDoubleClick={() => setIsEditing(true)}
            className="text-sm font-semibold text-stone-800 leading-snug break-words group-hover:text-violet-600 transition-colors mb-4"
          >
            {card.title}
          </p>

          <div className="flex items-center justify-center w-full opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-7 w-7 text-stone-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg"
                onClick={() => setIsEditing(true)}
                title="Edit task"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-7 w-7 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                onClick={handleDelete}
                title="Delete task"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
