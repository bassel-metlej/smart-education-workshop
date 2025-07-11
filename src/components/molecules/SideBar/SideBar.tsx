import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router';
import styles from './SideBar.module.scss';
import type { SideBarProps } from './SideBar.type';
import { useIsMobile } from '../../../hooks/useIsMobile';

const { Sider } = Layout;

// Inline menu items
const MENU_ITEMS = [
  { key: '/', icon: <HomeOutlined />, label: 'Products' },
  { key: '/cart', icon: <BookOutlined />, label: 'Cart' },
];

const SideBar: React.FC<SideBarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const [mobileCollapsed, setMobileCollapsed] = useState(true);

  useEffect(() => {
    if (isMobile) {
      setMobileCollapsed(true);
    }
  }, [location.pathname, isMobile]);

  const handleMenuClick = useCallback(({ key }: { key: string }) => {
    navigate(key);
  }, [navigate]);

  const toggleMobileMenu = useCallback(() => {
    setMobileCollapsed(prev => !prev);
  }, []);

  if (isMobile) {
    return (
      <>
        <Button
          type="text"
          icon={mobileCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleMobileMenu}
          className={styles.mobileMenuButton}
          size="large"
          aria-label={mobileCollapsed ? 'Open menu' : 'Close menu'}
        />

        {!mobileCollapsed && (
          <div
            className={styles.mobileOverlay}
            onClick={toggleMobileMenu}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
          />
        )}

        <div
          className={`${styles.mobileSider} ${mobileCollapsed ? styles.mobileCollapsed : ''}`}
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <div className={styles.mobileHeader}>Smart Education</div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={MENU_ITEMS}
            onClick={handleMenuClick}
            className={styles.mobileMenu}
          />
        </div>
      </>
    );
  }

  return (
    <Sider
      trigger={null}
      collapsible
      width={250}
      className={styles.sider}
      role="navigation"
      aria-label="Desktop navigation menu"
    >
      <div className={styles.header}>Smart Education</div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={MENU_ITEMS}
        onClick={handleMenuClick}
        className={styles.menu}
      />
    </Sider>
  );
};

export { SideBar };
