import { Link } from 'react-router-dom';
import { Button, Col, Layout, Row, Space } from 'antd';
import {
  FacebookOutlined,
  InstagramOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import styles from './Footer.module.css';

// TODO: cuando existan las páginas, cambia cada `to` por su ruta real
const columns = [
  {
    title: 'Tienda',
    links: [
      { label: 'Carcasas', to: '/catalogo' },
      { label: 'Protectores de pantalla', to: '/catalogo' },
      { label: 'Cargadores', to: '/catalogo' },
      { label: 'Audífonos', to: '/catalogo' },
      { label: 'Soportes', to: '/catalogo' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', to: '/nosotros' },
      { label: 'Mi carrito', to: '/carrito' },
      { label: 'Garantía y cambios', to: '/nosotros' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'contacto@redcase.com', href: 'mailto:contacto@redcase.com' },
      { label: 'WhatsApp', href: 'https://wa.me/57TUNUMERO' },
      { label: 'Instagram', href: 'https://instagram.com/' },
    ],
  },
];

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/', icon: <InstagramOutlined /> },
  { label: 'Facebook', href: 'https://facebook.com/', icon: <FacebookOutlined /> },
  { label: 'WhatsApp', href: 'https://wa.me/57TUNUMERO', icon: <WhatsAppOutlined /> },
];

export default function Footer() {
  return (
    <Layout.Footer className={styles.footer}>
      <div className={styles.bg} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobRed}`} />
        <span className={`${styles.blob} ${styles.blobDeep}`} />
        <span className={`${styles.blob} ${styles.blobBright}`} />
        <span className={`${styles.blob} ${styles.blobWhiteA}`} />
        <span className={`${styles.blob} ${styles.blobWhiteB}`} />
        <span className={`${styles.blob} ${styles.blobWhiteC}`} />
      </div>
      <div className={styles.acrylic} aria-hidden="true" />

      <div className={styles.inner}>
        <Row gutter={[32, 40]}>
          <Col xs={24} lg={9}>
            <h3 className={styles.headline}>
              ¿No encuentras la carcasa de tu celular?{' '}
              <span className={styles.muted}>Escríbenos y te ayudamos.</span>
            </h3>
            <Button
              className={styles.cta}
              type="primary"
              size="large"
              shape="round"
              icon={<WhatsAppOutlined />}
              href="https://wa.me/57TUNUMERO"
              target="_blank"
              rel="noreferrer"
            >
              Escríbenos por WhatsApp
            </Button>
          </Col>

          {columns.map((column) => (
            <Col key={column.title} xs={12} sm={8} lg={5}>
              <h4 className={styles.colTitle}>{column.title}</h4>
              <ul className={styles.list}>
                {column.links.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className={styles.link}>
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className={styles.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>

        <div className={styles.wordmark} aria-hidden="true">
          Red <span className={styles.wordmarkCase}>Case</span>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} RedCase. Todos los derechos reservados.</span>
          <Space size={4}>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className={styles.social}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </Space>
        </div>
      </div>
    </Layout.Footer>
  );
}