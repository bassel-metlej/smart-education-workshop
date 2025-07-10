import { Outlet } from 'react-router';
import { Layout } from 'antd';
import { AppSuspense, SideBar } from '../../components/molecules';

const { Content } = Layout;

const RootLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar  />
      <Layout>
        <Content 
          style={{ 
            padding: 24, 
            minHeight: 280,
            transition: 'margin-left 0.2s ease'
          }}
        >
          <AppSuspense>
            <Outlet />
          </AppSuspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export { RootLayout };