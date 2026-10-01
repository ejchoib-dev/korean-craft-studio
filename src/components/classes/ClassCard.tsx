'use client';

import Image from 'next/image';
import type { WorkshopClass } from '@/types';

interface ClassCardProps {
  workshopClass: WorkshopClass;
  onOpenModal?: (classId: string) => void;
}

export default function ClassCard({ workshopClass, onOpenModal }: ClassCardProps) {
  const { id, name, description, price, durationMinutes, capacity, imageUrl } = workshopClass;

  return (
    <article
      aria-label={`${name} 클래스`}
      className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full bg-stone-100">
        <Image
          src={imageUrl}
          alt={`${name} 클래스 이미지`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <h3 className="text-lg font-bold text-stone-900 sm:text-xl">{name}</h3>
        <p className="line-clamp-2 text-sm text-stone-600 sm:text-base">{description}</p>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm">{durationMinutes}분</span>
            <span className="text-sm text-gray-500">정원 {capacity}명</span>
          </div>
          <span className="text-right text-base font-semibold text-stone-900 sm:text-lg">
            {price.toLocaleString('ko-KR')}원
          </span>
        </div>

        <button
          type="button"
          aria-label={`${name} 클래스 신청`}
          onClick={() => onOpenModal?.(id)}
          className="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 text-sm sm:text-base"
        >
          클래스 신청
        </button>
      </div>
    </article>
  );
}
