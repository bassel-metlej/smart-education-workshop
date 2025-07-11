import { useState, useEffect, useCallback } from 'react';
import styles from './Products.module.scss';
import { allProducts } from '../../utils/products';
import { HomeCardContent, ProductCard } from '../../components/molecules';
import { ProductDetails } from '../../components/organisms';
import { Typography } from '../../components/atoms';

const Products = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [visibleProducts, setVisibleProducts] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number | undefined>();

  const handleImageLoad = (productId: number) => {
    setLoadedImages(prev => new Set(prev).add(productId));
  };

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProductId(undefined);
  };

  const loadMoreProducts = useCallback(() => {
    if (isLoading || visibleProducts >= allProducts.length) return;
    
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleProducts(prev => Math.min(prev + 20, allProducts.length));
      setIsLoading(false);
    }, 300);
  }, [isLoading, visibleProducts]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading && visibleProducts < allProducts.length) {
          loadMoreProducts();
        }
      },
      {
        rootMargin: '100px', // Start loading when user is 100px from bottom
        threshold: 0.1,
      }
    );

    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loadMoreProducts, isLoading, visibleProducts]);

  return (
    <div className={styles.Products}>
      <Typography variant="heading1" color='secondary'>Our Products</Typography>
      <div className={styles.productsGrid}>
        {allProducts.slice(0, visibleProducts).map((product) => (
          <div 
            key={product.id} 
            className={styles.productCardWrapper}
            onClick={() => handleProductClick(product.id)}
          >
            <ProductCard
              product={product}
              onImageLoad={handleImageLoad}
              isImageLoaded={loadedImages.has(product.id)}
              cardContent={<HomeCardContent name={product.name} description={product.description} price={product.price} />}
            />
          </div>
        ))}
      </div>
      
      <div id="scroll-sentinel" className={styles.scrollSentinel}>
        {isLoading && (
          <div className={styles.loadingIndicator}>
            <Typography variant="body2" color='secondary'>Loading more products...</Typography>
          </div>
        )}
        {!isLoading && visibleProducts >= allProducts.length && (
          <div className={styles.endMessage}>
            <Typography variant="body2" color='secondary'>You've reached the end of all products!</Typography>
          </div>
        )}
      </div>
      
      <ProductDetails
        isOpen={isModalOpen}
        onClose={handleModalClose}
        productId={selectedProductId}
        products={allProducts}
      />
    </div>
  );
};

export { Products }; 