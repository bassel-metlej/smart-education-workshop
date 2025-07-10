import React from 'react';
import styles from './ProductCard.module.scss';
import type {
    ProductCardProps,
} from './ProductCard.type';
import { CardImage, Typography } from '../../atoms';

// Main ProductCard component
const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onImageLoad,
    isImageLoaded = false,
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
            <div className={styles.productInfo}>
                <Typography variant="heading2" color='secondary'>{product.name}</Typography>
                <div className={styles.productInfoFooter}>
                    <Typography variant="body2" color='secondary' className={styles.productDescription}>{product.description}</Typography>
                    <Typography variant="body2" color='secondary'>$ {product.price}</Typography>
                </div>
            </div>
        </div>
    );
};

export { ProductCard };
