'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import TabNavigation from '@/components/tabs/TabNavigation';
import CraftsTab from '@/components/tabs/CraftsTab';
import ClassesTab from '@/components/tabs/ClassesTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<'crafts' | 'classes'>('crafts');

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Header />
      <Hero />
      <TabNavigation activeTab={activeTab} onChange={setActiveTab} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-10">
        {activeTab === 'crafts' ? (
          <CraftsTab />
        ) : (
          <ClassesTab />
        )}
      </main>
    </div>
  );
}
