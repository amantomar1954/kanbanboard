export interface TreeNode {
  id: string;
  name: string;
  children: TreeNode[];
  isExpanded?: boolean;
  isLoading?: boolean;
  isEditing?: boolean;
}

export interface TreeViewProps {
  data: TreeNode[];
  onNodeAdd?: (parentId: string, nodeName: string) => void;
  onNodeDelete?: (nodeId: string) => void;
  onNodeRename?: (nodeId: string, newName: string) => void;
  onNodeMove?: (nodeId: string, newParentId: string, newIndex: number) => void;
}
