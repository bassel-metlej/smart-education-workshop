export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface ProductCardProps {
  product: Product;
  onImageLoad?: (productId: number) => void;
  isImageLoaded?: boolean;
}