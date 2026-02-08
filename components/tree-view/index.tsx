'use client';

import { TreeViewProps } from './types';
import { TreeNode } from './tree-node';
import { useTreeView } from './use-tree-view';

export function TreeView({ data }: TreeViewProps) {
  const {
    nodes,
    toggleNode,
    addNode,
    deleteNode,
    renameNode,
    moveNode,
  } = useTreeView(data);

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">Tree <span className="text-violet-600">Hierarchy</span></h2>
        <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">Explore and manage nested structures with our interactive hierarchy explorer.</p>
      </div>
      <div className="space-y-1">
        {nodes.map((node, idx) => (
          <TreeNode
            key={node.id}
            node={node}
            onToggle={toggleNode}
            onAdd={addNode}
            onDelete={deleteNode}
            onRename={renameNode}
            onMove={moveNode}
            level={0}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
