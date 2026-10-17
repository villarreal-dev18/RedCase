import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Drawer, Input, Layout, Menu } from 'antd';
import {
  HeartOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { colors } from '../../theme/tokens';
import styles from './Navbar.module.css';

const menuItems = [
  { key: '/', label: 'INICIO' },
  { key: '/catalogo', label: 'CATALOGO' },
  { key: '/nosotros', label: 'NOSOTROS' },
];

// Marca como activo "Catálogo" también cuando estás en el detalle de un producto
function getSelectedKey(pathname) {
  if (pathname === '/') return '/';
  if (pathname.startsWith('/catalogo') || pathname.startsWith('/producto')) {
    return '/catalogo';
  }
  if (pathname.startsWith('/nosotros')) return '/nosotros';
  return '';
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const selectedKeys = [getSelectedKey(pathname)].filter(Boolean);
  const cartCount = 0; // TODO: conectar con el carrito (zustand)

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setDrawerOpen(false);
  };

  return (
    <>
      <div className={styles.topBar}>
        Envíos a todo el país · Garantía en todos los productos · Diferentes metodos de pago 
      </div>

      <Layout.Header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.nav}>
          <Button
            className={styles.menuButton}
            type="text"
            shape="circle"
            size="large"
            icon={<MenuOutlined style={{ fontSize: 20 }} />}
            aria-label="Abrir menú"
            onClick={() => setDrawerOpen(true)}
          />

          <Link to="/" className={styles.logo}>
            <img src="/src/assets/redcaselogo-removebg-preview.svg" alt="RedCase Logo" className={styles.logoImage} width={70} height={70}   />
            <span className={styles.logoRed}>Red</span>
            <span className={styles.logoCase}>Case</span>
          </Link>

          <Menu
            className={styles.menu}
            mode="horizontal"
            items={menuItems}
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
            disabledOverflow
          />

          <div className={styles.actions}>
            <Input
              className={styles.search}
              prefix={<SearchOutlined />}
              placeholder="Busca tu modelo de celular"
              variant="filled"
              allowClear
            />
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={<HeartOutlined style={{ fontSize: 20 }} />}
              aria-label="Favoritos"
            />
            <Badge count={cartCount} size="small" color={colors.primary}>
              <Button
                type="text"
                shape="circle"
                size="large"
                icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />}
                aria-label="Carrito"
                onClick={() => navigate('/carrito')}
              />
            </Badge>
          </div>
        </div>
      </Layout.Header>

      <Drawer
        title="RedCase"
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
          style={{ borderInlineEnd: 'none' }}
        />
      </Drawer>
    </>
  );
}