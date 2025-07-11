import React from 'react';
import styles from './HomeCardContent.module.scss';
import type {
    HomeCardContentProps,
} from './HomeCardContent.type';
import { Typography } from '../../atoms';

const HomeCardContent: React.FC<HomeCardContentProps> = ({
    name,
    description,
    price,
}) => {

    return (
        <div className={styles.productInfo}>
            <Typography variant="heading2" color='secondary' className={styles.productName} title={name}>{name}</Typography>
            <div className={styles.productInfoFooter}>
                <Typography variant="body2" color='secondary' className={styles.productDescription}>{description}</Typography>
                <Typography variant="body2" color='secondary'>$ {price}</Typography>
            </div>
        </div>
    );
};

export { HomeCardContent };
