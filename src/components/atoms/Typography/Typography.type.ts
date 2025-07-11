import type { ReactNode } from 'react';

export type TypographyVariant = 
  | 'heading1' 
  | 'heading2' 
  | 'heading3' 
  | 'heading4' 
  | 'heading5' 
  | 'heading6' 
  | 'body1' 
  | 'body2' 
  | 'caption' 
  | 'overline';

export type TypographyColor = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'success-light' 
  | 'success-dark' 
  | 'warning-light' 
  | 'warning-dark' 
  | 'error-light' 
  | 'error-dark';

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
}
