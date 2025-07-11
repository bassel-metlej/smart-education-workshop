import React from 'react';
import { Empty, Button, InputNumber } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../../store';
import { Button as CustomButton, Typography } from '../../atoms';
import styles from './ShoppingCartDetails.module.scss';
import { useNavigate } from 'react-router';

interface ShoppingCartDetailsProps {
    onContinueShopping?: () => void;
}

const ShoppingCartDetails: React.FC<ShoppingCartDetailsProps> = ({ onContinueShopping }) => {
    const { state, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    
    const handleQuantityChange = (productId: number, quantity: number) => {
        updateQuantity(productId, quantity);
    };

    const handleRemoveItem = (productId: number) => {
        removeFromCart(productId);
    };

    if (state.items.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <Empty
                    image={<ShoppingCartOutlined style={{ fontSize: 64, color: '#d9d9d9' }} />}
                    description="Your cart is empty"
                >
                    <CustomButton variant="primary" size="lg" onClick={onContinueShopping}>
                        Continue Shopping
                    </CustomButton>
                </Empty>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.cartItems}>
                {state.items.map((item) => (
                    <div key={item.product.id} className={styles.cartItem}>
                        <div className={styles.itemImage}>
                            <img src={item.product.image} alt={item.product.name} />
                        </div>
                        <div className={styles.itemDetails}>
                            <Typography variant="heading4" color="secondary">{item.product.name}</Typography>
                            <Typography variant="body2" color="secondary">{item.product.description}</Typography>
                            <Typography variant="body1" color="secondary">
                                ${item.product.price.toFixed(2)}
                            </Typography>
                        </div>
                        <div className={styles.itemActionsContainer}>
                            <div className={styles.itemQuantity}>
                                <InputNumber
                                    min={1}
                                    max={99}
                                    value={item.quantity}
                                    onChange={(value) => handleQuantityChange(item.product.id, value || 1)}
                                    size="large"
                                    controls
                                    style={{ width: '100px' }}
                                />
                            </div>
                            <div className={styles.itemActions}>
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleRemoveItem(item.product.id)}
                                    danger
                                    size="large"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.cartFooter}>
                <div className={styles.cartTotal}>
                    <Typography variant="heading5" color="secondary">Total:</Typography>
                    <Typography variant="heading4" color="secondary">
                        ${state.totalPrice.toFixed(2)}
                    </Typography>
                </div>
                <div className={styles.cartActions}>
                    <CustomButton variant="secondary" size="md" onClick={clearCart}>
                        Clear Cart
                    </CustomButton>
                    <CustomButton variant="primary" size="md" onClick={() => navigate('/')}>
                        Continue Shopping
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export { ShoppingCartDetails };
