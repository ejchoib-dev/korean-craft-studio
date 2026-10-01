'use client';

import { useState } from 'react';
import ProductList from '@/components/crafts/ProductList';
import { crafts } from '@/lib/mock-data';
import type { Craft } from '@/types';

export default function CraftsTab() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState<Craft | null>(null);

  const handleOpenModal = (craftId: string) => {
    setSelectedCraft(crafts.find((craft) => craft.id === craftId) ?? null);
    setOrderModalOpen(true);
  };

  const handleCloseModal = () => {
    setOrderModalOpen(false);
    setSelectedCraft(null);
  };

  return (
    <div>
      <ProductList onOpenModal={handleOpenModal} />

      {/* 임시 플레이스홀더 (OrderInquiryModal 생성 시 교체) */}
      {orderModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900">주문 문의</h2>
            <p className="mt-2 text-sm text-gray-600">
              {selectedCraft ? selectedCraft.name : '선택된 공예품 없음'}
            </p>
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
    </div>
  );
}
