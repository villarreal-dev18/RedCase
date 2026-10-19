import { useCallback, useEffect, useRef, useState } from 'react';
import { Empty, Select } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import FeaturedCard from './FeaturedCard';
import { categoryLabels, products } from '../../data/product';
import styles from './FeaturedProducts.module.css';

const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({
  value,
  label,
}));

const filterOptions = [
  { value: 'todos', label: 'Todos' },
  { value: 'destacados', label: 'Destacados' },
  { value: 'novedades', label: 'Novedades' },
  { value: 'ofertas', label: 'Ofertas' },
];

const filterFns = {
  todos: () => true,
  destacados: (product) => product.featured,
  novedades: (product) => product.isNew,
  ofertas: (product) => Boolean(product.discount),
};

export default function FeaturedProducts() {
  const trackRef = useRef(null);
  const [category, setCategory] = useState(undefined);
  const [filter, setFilter] = useState('destacados');
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const visibleProducts = products.filter(
    (product) =>
      filterFns[filter](product) && (!category || product.category === category),
  );

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;

    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows, visibleProducts.length]);

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const backToStart = () => trackRef.current?.scrollTo({ left: 0 });

  return (
    <section className={styles.section} aria-labelledby="featured-title">
      <div className={styles.header}>
        <div className={styles.intro}>
          <h2 id="featured-title" className={styles.title}>
            Protege tu celular con estilo
          </h2>
          <p className={styles.description}>
            Las carcasas y accesorios favoritos de nuestros clientes, listos para
            que los lleves a casa. Elige tu categoría y encuentra el tuyo.
          </p>
        </div>

        <div className={styles.filters}>
          <div className={styles.pillSelect}>
            <Select
              variant="borderless"
              placeholder="Categorías"
              style={{ minWidth: 150, fontWeight: 500 }}
              popupMatchSelectWidth={false}
              allowClear
              value={category}
              options={categoryOptions}
              onChange={(value) => {
                setCategory(value);
                backToStart();
              }}
            />
          </div>

          <div className={styles.pillSelect}>
            <Select
              variant="borderless"
              style={{ minWidth: 130, fontWeight: 500 }}
              popupMatchSelectWidth={false}
              value={filter}
              options={filterOptions}
              onChange={(value) => {
                setFilter(value);
                backToStart();
              }}
            />
          </div>
        </div>
      </div>

      <ul ref={trackRef} className={styles.track}>
        {visibleProducts.map((product, index) => (
          <motion.li
            key={product.id}
            className={styles.slide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.06 }}
          >
            <FeaturedCard product={product} />
          </motion.li>
        ))}
      </ul>

      {visibleProducts.length === 0 && (
        <Empty description="No hay productos con ese filtro" />
      )}

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Productos anteriores"
        >
          <ArrowLeftOutlined />
        </button>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Productos siguientes"
        >
          <ArrowRightOutlined />
        </button>
      </div>
    </section>
  );
}