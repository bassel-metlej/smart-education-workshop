export interface CardImageProps {
  src: string;
  alt: string;
  isLoaded?: boolean;
  onLoad?: () => void;
  className?: string;
} 