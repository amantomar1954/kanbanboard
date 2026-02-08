'use client';

import { KanbanBoard } from '@/components/kanban-board';

export default function Page() {
  return (
    <main className="p-2 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-stone-100 p-3 sm:p-8">
          <KanbanBoard />
        </div>
      </div>
    </main>
  );
}
