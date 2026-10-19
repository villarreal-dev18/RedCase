import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import {
  HeartFilled,
  HeartOutlined,
  MobileOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { colors } from '../../theme/tokens';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onAdd }) {
  const [liked, setLiked] = useState(false); // TODO: conectar con favoritos (zustand)
  const [imageFailed, setImageFailed] = useState(false);

  const { id, name, brand, model, price, image, isNew, discount } = product;
  const finalPrice = discount
    ? Math.round((price * (1 - discount / 100)) / 100) * 100
    : price;
  const detailPath = `/producto/${id}`;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Link to={detailPath} className={styles.mediaLink} aria-label={`Ver ${name}`}>
          {image && !imageFailed ? (
            <img
              className={styles.image}
              src={image}
              alt={name}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <MobileOutlined className={styles.placeholder} />
          )}
        </Link>

        <div className={styles.badges}>
          {isNew && <span className={`${styles.badge} ${styles.badgeNew}`}>Nuevo</span>}
          {discount && (
            <span className={`${styles.badge} ${styles.badgeSale}`}>-{discount}%</span>
          )}
        </div>

        <Button
          className={styles.like}
          shape="circle"
          icon={
            liked ? (
              <HeartFilled style={{ color: colors.primary }} />
            ) : (
              <HeartOutlined />
            )
          }
          aria-label={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-pressed={liked}
          onClick={() => setLiked((value) => !value)}
        />

        <Button
          className={styles.add}
          type="primary"
          shape="round"
          icon={<ShoppingCartOutlined />}
          onClick={() => onAdd?.(product)}
        >
          Agregar
        </Button>
      </div>

      <div className={styles.info}>
        <span className={styles.meta}>
          {brand} · {model}
        </span>
        <Link to={detailPath} className={styles.name}>
          {name}
        </Link>
        <div className={styles.prices}>
          <strong className={styles.price}>{formatPrice(finalPrice)}</strong>
          {discount && <del className={styles.oldPrice}>{formatPrice(price)}</del>}
        </div>
      </div>
    </article>
  );
}