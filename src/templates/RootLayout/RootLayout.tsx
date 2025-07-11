import { Outlet } from 'react-router';
import { AppSuspense, SideBar } from '../../components/molecules';
import styles from './RootLayout.module.scss';


const RootLayout = () => {
  return (
    <div className={styles.rootLayout}>
      <SideBar />
      <div
        className={styles.content}
      >
        <AppSuspense>
          <Outlet />
        </AppSuspense>
      </div>
    </div>
  );
};

export { RootLayout };