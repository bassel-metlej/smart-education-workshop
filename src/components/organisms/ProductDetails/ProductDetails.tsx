import React, { useMemo, useState } from 'react';
import { Modal } from 'antd';
import styles from './ProductDetails.module.scss';
import type { ProductDetailsProps } from './ProductDetails.type';
import { ProductCard } from '../../molecules/ProductCard';
import { Button, QuantitySelector } from '../../atoms';
import { DetailsCardContent } from '../../molecules';
import { useCart } from '../../store';
import { useNavigate } from 'react-router';

const ProductDetails: React.FC<ProductDetailsProps> = ({
  isOpen,
  onClose,
  productId,
  products,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
    
  // Find the product based on the productId
  const selectedProduct = useMemo(() => {
    if (!productId) return null;
    return products.find(product => product.id === productId);
  }, [productId, products]);

  const handleClose = () => {
    onClose();
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
      handleClose();
      navigate('/cart');
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={600}
      centered
      className={styles.productDetailsModal}
    >
      <div className={styles.productDetailsContent}>
        {selectedProduct ? (
          <>
            <div className={styles.productCardContainer}>
              <ProductCard
                product={selectedProduct}
                isImageLoaded={true}
                cardContent={<DetailsCardContent name={selectedProduct.name} description={selectedProduct.description} price={selectedProduct.price} />}
              />
            </div>
            <div className={styles.productActions}>
              <div className={styles.quantitySection}>
                <label>Quantity:</label>
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={99}
                  size="large"
                />
              </div>
              <div className={styles.actionButtons}>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.noProduct}>
            <p>Product not found</p>
            <Button 
              variant="primary" 
              size="md"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export { ProductDetails };
