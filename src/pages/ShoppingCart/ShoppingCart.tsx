import React from 'react';
import { useCart } from '../../components/store';
import { Typography } from '../../components/atoms';
import { ShoppingCartDetails } from '../../components/organisms';
import styles from './ShoppingCart.module.scss';
import { useNavigate } from 'react-router';

const ShoppingCart: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.cartHeader}>
        <Typography variant="heading1">Shopping Cart</Typography>
        <div className={styles.cartSummary}>
          <Typography variant="body2" color="secondary">
            {state.totalItems} items
          </Typography>
          <Typography variant="heading5" color="secondary" >
            ${state.totalPrice.toFixed(2)}
          </Typography>
        </div>
      </div>

      <ShoppingCartDetails onContinueShopping={handleContinueShopping} />
    </div>
  );
};

export { ShoppingCart };
