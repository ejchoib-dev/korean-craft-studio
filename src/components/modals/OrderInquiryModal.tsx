'use client';

import { useState } from 'react';
import type { Craft } from '@/types';
import Modal from '@/components/modals/Modal';
import OrderInquiryForm from '@/components/forms/OrderInquiryForm';

interface OrderInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCraft?: Craft;
}

export default function OrderInquiryModal({
  isOpen,
  onClose,
  selectedCraft,
}: OrderInquiryModalProps) {
  // key 변경으로 폼을 다시 마운트하여 초기화
  const [formKey, setFormKey] = useState(0);

  const handleSuccess = () => {
    setFormKey((prev) => prev + 1);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="주문 문의" description="문의하실 공예품과 연락처를 입력하고 제출하세요. Esc 키로 닫을 수 있습니다.">
      <OrderInquiryForm
        key={formKey}
        selectedCraft={selectedCraft}
        onSuccess={handleSuccess}
        onClose={onClose}
      />
    </Modal>
  );
}
