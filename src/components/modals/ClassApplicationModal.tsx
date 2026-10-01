'use client';

import { useEffect, useRef } from 'react';
import Modal from '@/components/modals/Modal';
import ClassApplicationForm from '@/components/forms/ClassApplicationForm';
import type { WorkshopClass } from '@/types';

interface ClassApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClass?: WorkshopClass;
}

// Keep the success message (reception number) visible briefly before closing.
const CLOSE_DELAY_MS = 1500;

export default function ClassApplicationModal({
  isOpen,
  onClose,
  selectedClass,
}: ClassApplicationModalProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Modal unmounts its children when closed, so the form state resets on close.
  const handleSuccess = () => {
    timerRef.current = setTimeout(onClose, CLOSE_DELAY_MS);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="클래스 신청" description="신청자 정보를 입력하고 제출하세요. Esc 키로 닫을 수 있습니다.">
      <ClassApplicationForm
        key={selectedClass?.id ?? 'none'}
        selectedClass={selectedClass}
        onSuccess={handleSuccess}
      />
    </Modal>
  );
}
