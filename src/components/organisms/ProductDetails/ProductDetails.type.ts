import type { Product } from '../../molecules/ProductCard/ProductCard.type';

export interface ProductDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: number;
  products: Product[];
} 