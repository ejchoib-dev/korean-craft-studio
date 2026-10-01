'use client';

import type { KeyboardEvent } from 'react';

export type TabId = 'crafts' | 'classes';

interface TabNavigationProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

const TABS: ReadonlyArray<{ id: TabId; label: string; panelId: string }> = [
  { id: 'crafts', label: '공예품 전시·주문', panelId: 'crafts-panel' },
  { id: 'classes', label: '공방 클래스', panelId: 'classes-panel' },
];

export default function TabNavigation({ activeTab, onChange }: TabNavigationProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, tab: TabId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(tab);
      return;
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const index = TABS.findIndex((t) => t.id === tab);
      const step = e.key === 'ArrowRight' ? 1 : -1;
      const next = TABS[(index + step + TABS.length) % TABS.length];
      onChange(next.id);
      document.getElementById(`tab-${next.id}`)?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label="온결 공방 메뉴"
      className="flex w-full border-b border-gray-200"
    >
      {TABS.map(({ id, label, panelId }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={0}
            onClick={() => onChange(id)}
            onKeyDown={(e) => handleKeyDown(e, id)}
            className={`-mb-px flex-1 border-b-2 px-3 py-3 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:flex-none sm:px-6 sm:py-4 sm:text-base md:px-8 md:text-lg ${
              isActive
                ? 'border-amber-700 font-semibold text-amber-700 shadow-sm'
                : 'border-transparent text-gray-500 hover:border-amber-200 hover:text-amber-600 hover:bg-amber-50'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
