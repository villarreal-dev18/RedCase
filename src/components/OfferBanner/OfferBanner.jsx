import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import {
  ArrowRightOutlined,
  MobileOutlined,
  ThunderboltFilled,
} from '@ant-design/icons';
import useCountdown from '../../hooks/useCountdown';
import { offer } from '../../data/offer';
import { products } from '../../data/Product';
import styles from './OfferBanner.module.css';

const pad = (value) => String(value).padStart(2, '0');

// Productos con descuento: primero los que tienen foto, luego el mayor descuento
const offerProducts = products
  .filter((product) => product.discount)
  .sort(
    (a, b) =>
      Number(Boolean(b.image)) - Number(Boolean(a.image)) ||
      b.discount - a.discount,
  )
  .slice(0, 3);

const maxDiscount = Math.max(0, ...offerProducts.map((product) => product.discount));

export default function OfferBanner() {
  const navigate = useNavigate();
  const { days, hours, minutes, seconds, finished } = useCountdown(offer.endsAt);

  if (finished || offerProducts.length === 0) return null;

  const units = [
    { label: 'Días', value: days },
    { label: 'Horas', value: hours },
    { label: 'Min', value: minutes },
    { label: 'Seg', value: seconds },
  ];

  return (
    <section className={styles.section} aria-labelledby="offer-title">
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className={`${styles.blob} ${styles.blobMain}`} />
        <span className={`${styles.blob} ${styles.blobSoft}`} />
        <span className={styles.acrylic} />

        <div className={styles.content}>
          <span className={styles.tag}>
            <ThunderboltFilled /> {offer.tag}
          </span>

          <h2 id="offer-title" className={styles.title}>
            {offer.title} <span className={styles.highlight}>{offer.highlight}</span>
          </h2>

          <p className={styles.description}>{offer.description}</p>

          <div className={styles.timer} role="timer" aria-label="Tiempo restante de la oferta">
            {units.map(({ label, value }) => (
              <div key={label} className={styles.unit}>
                <strong className={styles.value}>{pad(value)}</strong>
                <span className={styles.label}>{label}</span>
              </div>
            ))}
          </div>

          <Button
            type="primary"
            size="large"
            shape="round"
            onClick={() => navigate(offer.to)}
          >
            Aprovechar oferta <ArrowRightOutlined />
          </Button>
        </div>

        <div className={styles.visual}>
          <div className={styles.stack}>
            {offerProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/producto/${product.id}`}
                className={styles.item}
                style={{ '--i': index }}
                aria-label={`${product.name}, ${product.discount}% de descuento`}
              >
                {product.image ? (
                  <img className={styles.photo} src={product.image} alt="" />
                ) : (
                  <MobileOutlined className={styles.placeholder} />
                )}
                <span className={styles.pill}>-{product.discount}%</span>
              </Link>
            ))}

            <span className={styles.off}>Hasta {maxDiscount}% OFF</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}