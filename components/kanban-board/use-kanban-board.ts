import { useState, useCallback } from 'react';
import { KanbanColumn, KanbanCard } from './types';
import { generateId } from './utils';

export const DEFAULT_COLUMNS: KanbanColumn[] = [
    {
        id: 'todo',
        title: 'Todo',
        cards: [
            { id: generateId(), title: 'Design UI mockups', columnId: 'todo' },
            { id: generateId(), title: 'Setup project structure', columnId: 'todo' },
            { id: generateId(), title: 'Refine color palette', columnId: 'todo' },
        ],
    },
    {
        id: 'in-progress',
        title: 'In Progress',
        cards: [
            { id: generateId(), title: 'Implement drag and drop', columnId: 'in-progress' },
            { id: generateId(), title: 'Add responsive tests', columnId: 'in-progress' },
        ],
    },
    {
        id: 'done',
        title: 'Done',
        cards: [
            { id: generateId(), title: 'Project setup', columnId: 'done' },
        ],
    },
];

export function useKanbanBoard(initialColumns?: KanbanColumn[]) {
    const [columns, setColumns] = useState<KanbanColumn[]>(
        initialColumns || DEFAULT_COLUMNS,
    );

    const addCard = useCallback((columnId: string, cardTitle: string) => {
        setColumns((prevColumns) =>
            prevColumns.map((col) => {
                if (col.id === columnId) {
                    return {
                        ...col,
                        cards: [
                            ...col.cards,
                            {
                                id: generateId(),
                                title: cardTitle,
                                columnId: col.id,
                            },
                        ],
                    };
                }
                return col;
            }),
        );
    }, []);

    const deleteCard = useCallback((cardId: string) => {
        setColumns((prevColumns) =>
            prevColumns.map((col) => ({
                ...col,
                cards: col.cards.filter((card) => card.id !== cardId),
            })),
        );
    }, []);

    const editCard = useCallback((cardId: string, newTitle: string) => {
        setColumns((prevColumns) =>
            prevColumns.map((col) => ({
                ...col,
                cards: col.cards.map((card) =>
                    card.id === cardId ? { ...card, title: newTitle } : card,
                ),
            })),
        );
    }, []);

    const moveCard = useCallback(
        (cardId: string, targetColumnId: string) => {
            setColumns((prevColumns) => {
                let cardToMove: KanbanCard | null = null;

                const updatedColumns = prevColumns
                    .map((col) => {
                        const cardIndex = col.cards.findIndex((c) => c.id === cardId);
                        if (cardIndex !== -1) {
                            cardToMove = { ...col.cards[cardIndex] };
                            return {
                                ...col,
                                cards: col.cards.filter((c) => c.id !== cardId),
                            };
                        }
                        return col;
                    })
                    .map((col) => {
                        if (col.id === targetColumnId && cardToMove) {
                            return {
                                ...col,
                                cards: [...col.cards, { ...cardToMove, columnId: col.id }],
                            };
                        }
                        return col;
                    });

                return updatedColumns;
            });
        },
        [],
    );

    const handleDragStart = (e: React.DragEvent, cardId: string) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('cardId', cardId);
    };

    return {
        columns,
        addCard,
        deleteCard,
        editCard,
        moveCard,
        handleDragStart,
    };
}
