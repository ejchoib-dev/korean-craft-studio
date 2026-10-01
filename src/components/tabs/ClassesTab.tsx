'use client';

import { useState } from 'react';
import ClassList from '@/components/classes/ClassList';
import { classes } from '@/lib/mock-data';
import type { WorkshopClass } from '@/types';

export default function ClassesTab() {
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<WorkshopClass | null>(null);

  const handleOpenModal = (classId: string) => {
    setSelectedClass(classes.find((cls) => cls.id === classId) ?? null);
    setClassModalOpen(true);
  };

  const handleCloseModal = () => {
    setClassModalOpen(false);
    setSelectedClass(null);
  };

  return (
    <section>
      <ClassList onOpenModal={handleOpenModal} />

      {/* 임시 플레이스홀더 (ClassApplicationModal 작성 후 교체) */}
      {classModalOpen && selectedClass && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900">{selectedClass.name}</h2>
            <p className="mt-2 text-sm text-gray-600">신청 모달 준비 중입니다.</p>
            <button
              type="button"
              onClick={handleCloseModal}
              className="mt-4 rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-white hover:bg-amber-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
