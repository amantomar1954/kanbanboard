'use client';

import React from "react"

import { useState } from 'react';
import { ChevronRight, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { TreeNode as TreeNodeType } from './types';
import { Button, Input } from '@/components/ui-elements';
import { toast } from "sonner";

interface TreeNodeProps {
  node: TreeNodeType;
  onToggle: (nodeId: string) => void;
  onAdd: (parentId: string, nodeName: string) => void;
  onDelete: (nodeId: string) => void;
  onRename: (nodeId: string, newName: string) => void;
  onMove: (nodeId: string, newParentId: string, index: number) => void;
  level: number;
  index: number;
}

export function TreeNode({
  node,
  onToggle,
  onAdd,
  onDelete,
  onRename,
  onMove,
  level,
  index,
}: TreeNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.name);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [draggedOver, setDraggedOver] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    onToggle(node.id);
  };

  const handleAddNode = () => {
    if (newNodeName.trim()) {
      onAdd(node.id, newNodeName.trim());
      setNewNodeName('');
      setShowAddInput(false);
      toast.success("Branch added");
    }
  };

  const handleRename = () => {
    if (editValue.trim() && editValue !== node.name) {
      onRename(node.id, editValue.trim());
      toast.success("Node renamed");
    }
    setIsEditing(false);
  };

  /**
   * Triggers the removal of this node and all its descendants.
   */
  const handleDelete = () => {
    onDelete(node.id);
    toast.success("Node deleted", {
      description: `"${node.name}" and sub-nodes removed.`,
    });
  };

  /**
   * Handles the start of a drag-and-drop operation.
   * Stores the nodeId and the original parent's index for reference.
   */
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('nodeId', node.id);
    e.dataTransfer.setData('parentIndex', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  /**
   * Handles the drop operation. Moves the dragged node to become
   * the first child of this node.
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOver(false);

    const draggedId = e.dataTransfer.getData('nodeId');
    // Prevent dropping a node onto itself or into a recursive loop
    if (draggedId && draggedId !== node.id) {
      onMove(draggedId, node.id, 0);
      toast.success("Hierarchy updated");
    }
  };

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-1 py-1.5 px-3 rounded-xl transition-all duration-200 group ${draggedOver ? 'bg-violet-50 ring-2 ring-violet-200 ring-inset' : 'hover:bg-stone-100/80'
          }`}
        style={{ marginLeft: `${level * 20}px` }}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {hasChildren ? (
            <button
              onClick={handleToggle}
              className="p-0.5 rounded-md hover:bg-stone-200 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-300 ${node.isExpanded ? 'rotate-90' : ''
                  }`}
              />
            </button>
          ) : (
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-stone-300" />
            </div>
          )}

          {isEditing ? (
            <div className="flex items-center gap-2 flex-1 animate-in fade-in duration-200">
              <Input
                autoFocus
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="h-7 text-sm py-0 border-stone-200 focus-visible:ring-violet-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRename();
                  if (e.key === 'Escape') setIsEditing(false);
                }}
              />
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7 text-violet-600" onClick={handleRename}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-stone-400" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <span
                onDoubleClick={() => setIsEditing(true)}
                className="truncate text-sm font-medium text-stone-700 cursor-default group-hover:text-violet-600 transition-colors py-1"
              >
                {node.name}
              </span>

              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-stone-400 hover:text-violet-600 hover:bg-violet-50"
                  onClick={() => setShowAddInput(true)}
                  title="Add child node"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-stone-400 hover:text-violet-600 hover:bg-violet-50"
                  onClick={() => setIsEditing(true)}
                  title="Edit node"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-stone-400 hover:text-red-500 hover:bg-red-50"
                  onClick={handleDelete}
                  title="Delete node"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {showAddInput && (
        <div
          className="flex items-center gap-2 py-2 px-3 animate-in fade-in slide-in-from-left-2 duration-200"
          style={{ marginLeft: `${(level + 1) * 20}px` }}
        >
          <Input
            autoFocus
            placeholder="Name your branch..."
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            className="h-8 text-sm border-stone-200 focus-visible:ring-violet-500 flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddNode();
              if (e.key === 'Escape') setShowAddInput(false);
            }}
          />
          <div className="flex gap-1">
            <Button size="sm" className="h-8 px-3 bg-violet-600 hover:bg-violet-700" onClick={handleAddNode}>
              Create
            </Button>
            <Button size="sm" variant="ghost" className="h-8 px-2 text-stone-400" onClick={() => setShowAddInput(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {node.isExpanded && hasChildren && (
        <div className="mt-0.5">
          {node.children.map((child, idx) => (
            <TreeNode
              key={child.id}
              node={child}
              onToggle={onToggle}
              onAdd={onAdd}
              onDelete={onDelete}
              onRename={onRename}
              onMove={onMove}
              level={level + 1}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}
