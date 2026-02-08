'use client';

import { useState, useCallback } from 'react';
import { TreeNode as TreeNodeType } from './types';

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function deleteNodeRecursive(nodes: TreeNodeType[], id: string): TreeNodeType[] {
    return nodes.filter((node) => {
        if (node.id === id) return false;
        if (node.children) {
            node.children = deleteNodeRecursive(node.children, id);
        }
        return true;
    });
}

function moveNodeRecursive(
    nodes: TreeNodeType[],
    nodeId: string,
    newParentId: string,
): TreeNodeType[] {
    let nodeToMove: TreeNodeType | null = null;

    // 1. Extract the node from its current position
    const nodesWithoutTarget = nodes.filter((node) => {
        if (node.id === nodeId) {
            nodeToMove = { ...node };
            return false;
        }
        if (node.children && node.children.length > 0) {
            node.children = moveNodeRecursive(node.children, nodeId, newParentId);
        }
        return true;
    });

    if (!nodeToMove && nodes === nodesWithoutTarget) return nodes;

    // 2. Insert into the new parent
    function insertIntoParent(list: TreeNodeType[]): boolean {
        for (const node of list) {
            if (node.id === newParentId) {
                if (nodeToMove) {
                    node.children = [...(node.children || []), nodeToMove];
                    node.isExpanded = true;
                }
                return true;
            }
            if (node.children && insertIntoParent(node.children)) return true;
        }
        return false;
    }

    insertIntoParent(nodesWithoutTarget);
    return nodesWithoutTarget;
}

export function useTreeView(initialData: TreeNodeType[]) {
    const [nodes, setNodes] = useState<TreeNodeType[]>(initialData);

    const toggleNode = useCallback((nodeId: string) => {
        setNodes((prevNodes) => {
            const updateNode = (list: TreeNodeType[]): TreeNodeType[] => {
                return list.map((node) => {
                    if (node.id === nodeId) {
                        return {
                            ...node,
                            isExpanded: !node.isExpanded,
                        };
                    }
                    if (node.children && node.children.length > 0) {
                        return {
                            ...node,
                            children: updateNode(node.children),
                        };
                    }
                    return node;
                });
            };
            return updateNode(prevNodes);
        });
    }, []);

    const addNode = useCallback((parentId: string, nodeName: string) => {
        setNodes((prevNodes) => {
            const newNode: TreeNodeType = {
                id: generateId(),
                name: nodeName,
                children: [],
                isExpanded: false,
            };

            const updateNode = (list: TreeNodeType[]): TreeNodeType[] => {
                return list.map((node) => {
                    if (node.id === parentId) {
                        return {
                            ...node,
                            children: [...(node.children || []), newNode],
                            isExpanded: true,
                        };
                    }
                    if (node.children && node.children.length > 0) {
                        return {
                            ...node,
                            children: updateNode(node.children),
                        };
                    }
                    return node;
                });
            };
            return updateNode(prevNodes);
        });
    }, []);

    const deleteNode = useCallback((nodeId: string) => {
        setNodes((prevNodes) => deleteNodeRecursive([...prevNodes], nodeId));
    }, []);

    const renameNode = useCallback((nodeId: string, newName: string) => {
        setNodes((prevNodes) => {
            const updateNode = (list: TreeNodeType[]): TreeNodeType[] => {
                return list.map((node) => {
                    if (node.id === nodeId) {
                        return { ...node, name: newName };
                    }
                    if (node.children && node.children.length > 0) {
                        return {
                            ...node,
                            children: updateNode(node.children),
                        };
                    }
                    return node;
                });
            };
            return updateNode(prevNodes);
        });
    }, []);

    const moveNode = useCallback(
        (nodeId: string, newParentId: string) => {
            setNodes((prevNodes) => moveNodeRecursive([...prevNodes], nodeId, newParentId));
        },
        [],
    );

    return {
        nodes,
        toggleNode,
        addNode,
        deleteNode,
        renameNode,
        moveNode,
    };
}
