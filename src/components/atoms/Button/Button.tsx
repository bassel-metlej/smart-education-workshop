import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import styles from './Button.module.scss';

export interface ButtonProps extends Omit<AntButtonProps, 'type' | 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const buttonClassName = `${styles.customButton} ${styles[`customButton--${variant}`]} ${styles[`customButton--${size}`]} ${className}`.trim();

  return (
    <AntButton
      className={buttonClassName}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export { Button };