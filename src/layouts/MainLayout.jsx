import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header>Navbar (pendiente)</Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Layout.Footer>Footer (pendiente)</Layout.Footer>
    </Layout>
  );
}