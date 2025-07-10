import React, { type PropsWithChildren, Suspense } from "react";
import { Spin } from "antd";
import styles from "./AppSuspense.module.scss";

const AppSuspense: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Suspense
            fallback={
                <div className={styles.fallback}>
                    <Spin size="large" />
                </div>
            }
        >
            {children}
        </Suspense>
    );
};

export { AppSuspense };