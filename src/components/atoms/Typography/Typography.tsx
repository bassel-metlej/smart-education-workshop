import React from 'react';
import styles from './Typography.module.scss';
import type { TypographyProps, TypographyVariant, TypographyColor } from './Typography.type';
import classNames from 'classnames';

const colorMap: Record<TypographyColor, string> = {
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  tertiary: styles.colorTertiary,
  success: styles.colorSuccess,
  warning: styles.colorWarning,
  error: styles.colorError,
  'success-light': styles.colorSuccessLight,
  'success-dark': styles.colorSuccessDark,
  'warning-light': styles.colorWarningLight,
  'warning-dark': styles.colorWarningDark,
  'error-light': styles.colorErrorLight,
  'error-dark': styles.colorErrorDark,
};

const variantMap: Record<TypographyVariant, string> = {
  heading1: styles.heading1,
  heading2: styles.heading2,
  heading3: styles.heading3,
  heading4: styles.heading4,
  heading5: styles.heading5,
  heading6: styles.heading6,
  body1: styles.body1,
  body2: styles.body2,
  caption: styles.caption,
  overline: styles.overline,
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  title,
  variant = 'body1',
  color,
  className = '',
  style,
  ...props
}) => {
  const variantClass = variantMap[variant];
  const colorClass = color ? colorMap[color] : '';

  return (
    <div
      {...props}
      className={classNames(variantClass, colorClass, className)}
      title={title}
      style={style}
    >
      {children}
    </div>
  );
};
