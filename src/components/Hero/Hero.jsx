import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, Button, Rate } from 'antd';
import {
  ArrowRightOutlined,
  FireOutlined,
  MobileOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { colors } from '../../theme/tokens';
import heroPhone from '../../assets/hero-phone.png';
import styles from './Hero.module.css';

// TODO: cuando exista el filtro por categoría, cambia cada `to`
const categories = [
  { label: 'Novedades', hint: 'Lo más nuevo', icon: <FireOutlined />, to: '/catalogo' },
  { label: 'Carcasas', hint: 'Tu modelo', icon: <MobileOutlined />, to: '/catalogo' },
  { label: 'Accesorios', hint: 'Y mucho más', icon: <ThunderboltOutlined />, to: '/catalogo' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.bg} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobCore}`} />
        <span className={`${styles.blob} ${styles.blobDeep}`} />
        <span className={`${styles.blob} ${styles.blobBright}`} />
        <span className={`${styles.blob} ${styles.blobWhiteA}`} />
        <span className={`${styles.blob} ${styles.blobWhiteB}`} />
        <span className={`${styles.blob} ${styles.blobWhiteC}`} />
      </div>
      <div className={styles.acrylic} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div className={styles.headline} {...fadeUp(0.1)}>
          <span className={styles.badge}>Nueva colección</span>
          <h1 className={styles.title}>
            Tu celular, <span className={styles.accent}>protegido</span> con estilo.
          </h1>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            className={styles.phone}
            src={heroPhone}
            alt="Celular con carcasa de RedCase"
          />
        </motion.div>

        <motion.div className={styles.side} {...fadeUp(0.25)}>
          <p className={styles.lead}>
            Carcasas, protectores y accesorios con diseños únicos y precios honestos,
            para el modelo que tienes.
          </p>
          <Button
            type="primary"
            size="large"
            shape="round"
            onClick={() => navigate('/catalogo')}
          >
            Ver colección <ArrowRightOutlined />
          </Button>
        </motion.div>

        <motion.ul className={styles.categories} {...fadeUp(0.4)}>
          {categories.map((category) => (
            <li key={category.label} className={styles.item}>
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <span className={styles.categoryLabel}>{category.label}</span>
                  <span className={styles.hint}>{category.hint}</span>
                </div>

                {/* Enlace invisible que hace clicable toda la tarjeta */}
                <Link to={category.to} className={styles.cardLink} aria-label={category.label} />

                <Button
                  className={styles.buy}
                  type="primary"
                  size="small"
                  shape="round"
                  onClick={() => navigate(category.to)}
                >
                  Comprar
                </Button>
              </div>
            </li>
          ))}
        </motion.ul>

        {/* TODO: datos de ejemplo. Reemplázalos por reales o quita este bloque */}
        <motion.div className={styles.trust} {...fadeUp(0.5)}>
          <div className={styles.rating}>
            <strong>5.0</strong>
            <Rate disabled defaultValue={5} />
          </div>
          <p className={styles.trustText}>Clientes felices en todo el país</p>
          <Avatar.Group size="small">
            <Avatar style={{ background: colors.primary }}>A</Avatar>
            <Avatar style={{ background: colors.primaryActive }}>M</Avatar>
            <Avatar style={{ background: colors.black }}>J</Avatar>
          </Avatar.Group>
        </motion.div>
      </div>
    </section>
  );
}