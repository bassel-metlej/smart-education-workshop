import React from 'react';
import styles from './CardImage.module.scss';
import type { CardImageProps } from './CardImage.type';

 const CardImage: React.FC<CardImageProps> = ({ 
  src, 
  alt, 
  isLoaded = false, 
  onLoad, 
  className = '' 
}) => {
  return (
    <div className={`${styles.cardImage} ${className}`}>
      {!isLoaded && (
        <div className={styles.imageSkeleton}>
          <div className={styles.skeletonShimmer}></div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt}
        loading="lazy"
        onLoad={onLoad}
        className={`${styles.image} ${isLoaded ? styles.loaded : styles.loading}`}
      />
    </div>
  );
};

export { CardImage };