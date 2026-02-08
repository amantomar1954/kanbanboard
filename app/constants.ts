import { TreeNode } from '@/components/tree-view/types';

/**
 * Generates a unique short ID for cards and columns
 */
export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

export const SAMPLE_TREE_DATA: TreeNode[] = [
    {
        id: generateId(),
        name: 'Project Root',
        isExpanded: true,
        children: [
            {
                id: generateId(),
                name: 'Frontend',
                isExpanded: true,
                children: [
                    {
                        id: generateId(),
                        name: 'Components',
                        isExpanded: false,
                        children: [
                            { id: generateId(), name: 'Button.tsx', children: [] },
                            { id: generateId(), name: 'Card.tsx', children: [] },
                        ],
                    },
                    {
                        id: generateId(),
                        name: 'Pages',
                        isExpanded: false,
                        children: [
                            { id: generateId(), name: 'index.tsx', children: [] },
                            { id: generateId(), name: 'dashboard.tsx', children: [] },
                        ],
                    },
                ],
            },
            {
                id: generateId(),
                name: 'Backend',
                isExpanded: false,
                children: [
                    {
                        id: generateId(),
                        name: 'API',
                        isExpanded: false,
                        children: [
                            { id: generateId(), name: 'routes.ts', children: [] },
                            { id: generateId(), name: 'middleware.ts', children: [] },
                        ],
                    },
                    {
                        id: generateId(),
                        name: 'Database',
                        isExpanded: false,
                        children: [
                            { id: generateId(), name: 'schema.sql', children: [] },
                            { id: generateId(), name: 'migrations', children: [] },
                        ],
                    },
                ],
            },
            {
                id: generateId(),
                name: 'Config',
                isExpanded: false,
                children: [
                    { id: generateId(), name: 'package.json', children: [] },
                    { id: generateId(), name: 'tsconfig.json', children: [] },
                    { id: generateId(), name: '.env.local', children: [] },
                ],
            },
        ],
    },
];

export const KANBAN_FEATURES = [
    { title: "Dynamic Creation", desc: "Instantly add tasks to any stage of your workflow." },
    { title: "Smart Deletion", desc: "Safe removal of tasks with confirmation prompts." },
    { title: "Inline Editing", desc: "Update task details without losing focus or context." },
    { title: "Fluid Drag & Drop", desc: "Seamless movement of tasks between status columns." },
    { title: "Adaptive Layout", desc: "Fully responsive design that looks great on any device." },
    { title: "Rich Interactions", desc: "Micro-animations and hover states for better feedback." }
];

export const TREE_FEATURES = [
    { title: "Recursive Nodes", desc: "Infinite depth support for complex folder structures." },
    { title: "State Persistence", desc: "Maintains expansion state across interactions." },
    { title: "Bulk Operations", desc: "Manage entire subtrees with intuitive actions." },
    { title: "Drag Hierarchies", desc: "Reorganize nested lists with natural drag handles." },
    { title: "Visual Depth", desc: "Clear indentation and visual cues for relationship." },
    { title: "Instant Feedback", desc: "Keyboard shortcuts and hover states for power users." }
];
