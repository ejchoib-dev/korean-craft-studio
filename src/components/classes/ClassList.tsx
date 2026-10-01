'use client';

import { classes } from '@/lib/mock-data';
import ClassCard from './ClassCard';

interface ClassListProps {
  onOpenModal?: (classId: string) => void;
}

export default function ClassList({ onOpenModal }: ClassListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6 lg:grid-cols-3 xl:grid-cols-4">
      {classes.map((cls) => (
        <ClassCard key={cls.id} workshopClass={cls} onOpenModal={onOpenModal} />
      ))}
    </div>
  );
}
