import React from 'react';
import { InputNumber, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './QuantitySelector.module.scss';

export interface QuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  size = 'middle',
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (newValue: number | null) => {
    if (newValue !== null) {
      const clampedValue = Math.max(min, Math.min(max, newValue));
      onChange(clampedValue);
    }
  };

  return (
    <div className={styles.quantitySelector}>
      <Button
        type="text"
        icon={<MinusOutlined />}
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        size={size}
        className={styles.quantityButton}
      />
      <InputNumber
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        size={size}
        className={styles.quantityInput}
        controls={false}
      />
      <Button
        type="text"
        icon={<PlusOutlined />}
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        size={size}
        className={styles.quantityButton}
      />
    </div>
  );
};

export { QuantitySelector }; 