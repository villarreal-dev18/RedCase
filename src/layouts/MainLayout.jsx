import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header><Navbar /></Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Layout.Footer>Footer (pendiente)</Layout.Footer>
    </Layout>
  );
}