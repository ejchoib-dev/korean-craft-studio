'use client';

import type { Craft, CraftType } from '@/types';

interface ProductCardProps {
  craft: Craft;
  onOpenModal?: (craftId: string) => void;
}

const CRAFT_TYPE_LABELS: Record<CraftType, string> = {
  pottery: '도자기',
  lacquerware: '칠기',
  bojagi: '보자기',
  woodcraft: '목공예',
};

export default function ProductCard({ craft, onOpenModal }: ProductCardProps) {
  return (
    <article
      aria-label={`${craft.name} 공예품 카드`}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow transition-shadow hover:shadow-lg"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={craft.imageUrl}
        alt={`${craft.name} - ${CRAFT_TYPE_LABELS[craft.type]}`}
        loading="lazy"
        className="aspect-square w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <span className="w-fit rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
          {CRAFT_TYPE_LABELS[craft.type]}
        </span>
        <h3 className="text-base font-semibold text-stone-900 sm:text-lg">{craft.name}</h3>
        <p className="line-clamp-2 text-sm text-stone-600">{craft.description}</p>
        <p className="mt-auto pt-2 text-right text-base font-bold text-stone-900 sm:text-lg">
          {craft.price.toLocaleString('ko-KR')}원
        </p>
        <button
          type="button"
          onClick={() => onOpenModal?.(craft.id)}
          aria-label={`${craft.name} 주문 문의하기`}
          className="w-full rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 sm:text-base"
        >
          주문 문의하기
        </button>
      </div>
    </article>
  );
}
