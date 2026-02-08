'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

import { TreeView } from '@/components/tree-view';
import { KanbanBoard } from '@/components/kanban-board';

import {
  SAMPLE_TREE_DATA,
  KANBAN_FEATURES,
  TREE_FEATURES
} from './constants';

export default function Page() {
  const [activeTab, setActiveTab] = useState('kanban');

  return (
    <main className="min-h-screen bg-stone-50 p-4 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            Component <span className="text-violet-600">Showcase</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            A premium collection of interactive components built with React, Tailwind, and a touch of elegance.
          </p>
        </header>

        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <Tabs.List className="grid w-full max-w-md grid-cols-2 bg-stone-200/50 p-1 rounded-xl">
              <Tabs.Trigger
                value="kanban"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm transition-all text-sm font-medium py-2 outline-none"
              >
                Kanban Board
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tree"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm transition-all text-sm font-medium py-2 outline-none"
              >
                Tree View
              </Tabs.Trigger>
            </Tabs.List>
          </div>

          <Tabs.Content value="kanban" className="mt-0 outline-none">
            <div className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 p-4 sm:p-10 transition-all">
              <KanbanBoard />

            </div>
          </Tabs.Content>

          <Tabs.Content value="tree" className="mt-0 outline-none">
            <div className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 p-4 sm:p-10 transition-all">
              <TreeView data={SAMPLE_TREE_DATA} />

            </div>
          </Tabs.Content>
        </Tabs.Root>

        <section className="mt-16 bg-stone-900 rounded-3xl p-10 sm:p-16 text-stone-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full -ml-32 -mb-32"></div>

          <header className="mb-12 border-b border-stone-800 pb-6 relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Technical Implementation
            </h2>
            <p className="text-stone-400 mt-2">Under the hood of our modular components</p>
          </header>

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <TechDetail
              number="01"
              title="Tree View Architecture"
              description="Utilizes a recursive component structure to handle arbitrary nesting levels. State management is centralized via custom hooks to handle expansion and mutations efficiently."
              items={["TypeScript Interfaces", "HTML5 DnD API", "Focus Trapping", "ARIA Landmarks"]}
              accentColor="bg-violet-600/20"
              dotColor="bg-violet-500"
            />
            <TechDetail
              number="02"
              title="Kanban Flow Control"
              description="Designed with a strict column-card relationship. Drag-and-drop logic is managed via a coordinate system to ensure tasks only move between valid states."
              items={["React Hooks API", "Lucide Integration", "Responsive Grid", "State Lifting"]}
              accentColor="bg-violet-600/20"
              dotColor="bg-violet-600"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

interface TechDetailItem {
  number: string;
  title: string;
  description: string;
  items: string[];
  accentColor: string;
  dotColor: string;
}

function TechDetail({ number, title, description, items, accentColor, dotColor }: TechDetailItem) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${accentColor} flex items-center justify-center border border-violet-500/30`}>
          <span className="text-violet-400 font-mono">{number}</span>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-stone-400 leading-relaxed">{description}</p>
      <ul className="grid grid-cols-2 gap-3 text-sm text-stone-500">
        {items.map((item: string) => (
          <li key={item} className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

