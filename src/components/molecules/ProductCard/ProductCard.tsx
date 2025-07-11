import React from 'react';
import styles from './ProductCard.module.scss';
import type {
    ProductCardProps,
} from './ProductCard.type';
import { CardImage } from '../../atoms';

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onImageLoad,
    isImageLoaded = false,
    cardContent,
}) => {
    const handleImageLoad = () => {
        onImageLoad?.(product.id);
    };

    return (
        <div className={styles.productCard}>
            <CardImage
                src={product.image}
                alt={product.name}
                isLoaded={isImageLoaded}
                onLoad={handleImageLoad}
            />
            {cardContent}
        </div>
    );
};

export { ProductCard };
