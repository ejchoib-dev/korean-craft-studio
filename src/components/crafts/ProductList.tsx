import { crafts } from '@/lib/mock-data';
import type { CraftType } from '@/types';

interface ProductListProps {
  onOpenModal?: (craftId: string) => void;
}

const CRAFT_TYPE_LABELS: Record<CraftType, string> = {
  pottery: '도자기',
  lacquerware: '칠기',
  bojagi: '보자기',
  woodcraft: '목공예',
};

export default function ProductList({ onOpenModal }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6 lg:grid-cols-3 xl:grid-cols-4">
      {crafts.map((craft) => (
        // 임시 카드 (ProductCard 생성 시 교체)
        <div
          key={craft.id}
          className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <span className="text-xs text-gray-500">ID: {craft.id}</span>
          <h3 className="text-base font-semibold text-gray-900">{craft.name}</h3>
          <span className="w-fit rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
            {CRAFT_TYPE_LABELS[craft.type]}
          </span>
          <p className="text-sm text-gray-600">{craft.price.toLocaleString('ko-KR')}원</p>
          {onOpenModal && (
            <button
              type="button"
              onClick={() => onOpenModal(craft.id)}
              className="mt-2 rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            >
              상세 보기
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
