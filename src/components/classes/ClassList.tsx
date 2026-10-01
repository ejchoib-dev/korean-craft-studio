'use client';

import { classes } from '@/lib/mock-data';

interface ClassListProps {
  onOpenModal?: (classId: string) => void;
}

export default function ClassList({ onOpenModal }: ClassListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6 lg:grid-cols-3 xl:grid-cols-4">
      {classes.map((cls) => (
        // 임시 카드 (ClassCard 컴포넌트 작성 후 교체)
        <div
          key={cls.id}
          className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
          <p className="text-sm text-gray-600">{cls.description}</p>
          <dl className="mt-auto space-y-1 pt-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>가격</dt>
              <dd className="font-medium text-amber-700">{cls.price.toLocaleString('ko-KR')}원</dd>
            </div>
            <div className="flex justify-between">
              <dt>시간</dt>
              <dd>{cls.durationMinutes}분</dd>
            </div>
            <div className="flex justify-between">
              <dt>정원</dt>
              <dd>{cls.capacity}명</dd>
            </div>
          </dl>
          {onOpenModal && (
            <button
              type="button"
              onClick={() => onOpenModal(cls.id)}
              className="mt-2 rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            >
              신청하기
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
