import { crafts } from '@/lib/mock-data';
import ProductCard from './ProductCard';

interface ProductListProps {
  onOpenModal?: (craftId: string) => void;
}

export default function ProductList({ onOpenModal }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6 lg:grid-cols-3 xl:grid-cols-4">
      {crafts.map((craft) => (
        <ProductCard key={craft.id} craft={craft} onOpenModal={onOpenModal} />
      ))}
    </div>
  );
}
