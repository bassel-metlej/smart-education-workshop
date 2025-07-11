import React from 'react';
import styles from './DetailsCardContent.module.scss';
import type {
    DetailsCardContentProps,
} from './DetailsCardContent.type';
import { Typography } from '../../atoms';

const DetailsCardContent: React.FC<DetailsCardContentProps> = ({
    name,
    description,
    price,
}) => {

    return (
        <div className={styles.productInfo}>
            <Typography variant="heading2" color='secondary'>{name}</Typography>
            <div className={styles.productInfoFooter}>
                <Typography variant="body2" color='secondary'>{description}</Typography>
                <Typography variant="body2" color='secondary'>$ {price}</Typography>
            </div>
        </div>
    );
};

export { DetailsCardContent };
