import { Link } from 'react-router-dom';
import { ArrowRightOutlined, MobileOutlined } from '@ant-design/icons';
import { categoryLabels } from '../../data/product';
import { formatPrice } from '../../utils/formatPrice';
import styles from './FeaturedCard.module.css';

export default function FeaturedCard({ product }) {
  const { id, name, category, price, image, isNew, discount } = product;
  const finalPrice = discount
    ? Math.round((price * (1 - discount / 100)) / 100) * 100
    : price;

  return (
    <article className={styles.card}>
      <div className={styles.tags}>
        {isNew && <span className={`${styles.pill} ${styles.pillNew}`}>Nuevo</span>}
        {discount && (
          <span className={`${styles.pill} ${styles.pillSale}`}>-{discount}%</span>
        )}
        <span className={styles.pill}>{categoryLabels[category]}</span>
      </div>

      <div className={styles.media}>
        {image ? (
          <img className={styles.image} src={image} alt="" loading="lazy" />
        ) : (
          <MobileOutlined className={styles.placeholder} />
        )}
      </div>

      <div className={styles.bottom}>
        <div className={styles.text}>
          <h3 className={styles.name}>
            {/* El ::after de este enlace cubre toda la tarjeta */}
            <Link to={`/producto/${id}`} className={styles.link}>
              {name}
            </Link>
          </h3>
          <div className={styles.prices}>
            <strong className={styles.price}>{formatPrice(finalPrice)}</strong>
            {discount && <del className={styles.oldPrice}>{formatPrice(price)}</del>}
          </div>
        </div>

        <span className={styles.go} aria-hidden="true">
          <ArrowRightOutlined />
        </span>
      </div>
    </article>
  );
}