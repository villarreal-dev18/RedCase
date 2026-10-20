import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, Button, Image, Rate } from 'antd';
import {
  ArrowRightOutlined,
  LeftOutlined,
  PictureOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { testimonials } from '../../data/testimonials';
import styles from './Testimonials.module.css';

const variants = {
  enter: (direction) => ({ opacity: 0, x: direction * 70, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
};

const getInitials = (name) =>
  name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function Photos({ photos, name }) {
  if (!photos?.length) {
    return (
      <div className={styles.photoEmpty} aria-hidden="true">
        <PictureOutlined />
      </div>
    );
  }

  const shown = photos.slice(0, 3);

  return (
    <Image.PreviewGroup>
      <div className={`${styles.photos} ${styles[`photos${shown.length}`]}`}>
        {shown.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Foto enviada por ${name} (${index + 1})`}
            rootClassName={styles.photo}
            preview={{ mask: 'Ver' }}
          />
        ))}
      </div>
    </Image.PreviewGroup>
  );
}

export default function Testimonials() {
  const navigate = useNavigate();
  const [{ index, direction }, setState] = useState({ index: 0, direction: 1 });

  const total = testimonials.length;
  const current = testimonials[index];

  const move = (delta) =>
    setState((prev) => ({
      index: (prev.index + delta + total) % total,
      direction: delta,
    }));

  const goTo = (target) =>
    setState((prev) => ({
      index: target,
      direction: target >= prev.index ? 1 : -1,
    }));

  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobRed}`} />
        <span className={`${styles.blob} ${styles.blobPink}`} />
        <span className={`${styles.blob} ${styles.blobSoft}`} />
        <span className={styles.acrylic} />
      </div>

      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className={styles.eyebrow}>Testimonios</span>
        <h2 id="testimonials-title" className={styles.title}>
          Clientes felices,{' '}
          <span className={styles.accent}>celulares protegidos</span>
        </h2>
        <p className={styles.subtitle}>
          Opiniones reales de quienes ya recibieron su pedido. Mira cómo les
          llegó.
        </p>
      </motion.div>

      <div className={styles.stage}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          onClick={() => move(-1)}
          aria-label="Testimonio anterior"
        >
          <LeftOutlined />
        </button>

        <div className={styles.viewport} aria-live="polite">
          <span className={`${styles.layer} ${styles.layerA}`} />
          <span className={`${styles.layer} ${styles.layerB}`} />

          <motion.article
            key={current.id}
            className={styles.card}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Photos photos={current.photos} name={current.name} />

            <div className={styles.content}>
              <Rate disabled allowHalf value={current.rating} style={{ fontSize: 16 }} />

              <blockquote className={styles.quote}>
                <span className={styles.quoteMark} aria-hidden="true">
                  “
                </span>
                {current.quote}
              </blockquote>

              <div className={styles.author}>
                <Avatar size={46} className={styles.avatar}>
                  {getInitials(current.name)}
                </Avatar>
                <div className={styles.authorText}>
                  <strong>{current.name}</strong>
                  <span>{current.city}</span>
                </div>
              </div>

              <Link to={`/producto/${current.productId}`} className={styles.productLink}>
                Compró: {current.product} <ArrowRightOutlined />
              </Link>
            </div>
          </motion.article>
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          onClick={() => move(1)}
          aria-label="Testimonio siguiente"
        >
          <RightOutlined />
        </button>
      </div>

      <div className={styles.dots}>
        {testimonials.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Ver testimonio de ${item.name}`}
            aria-current={i === index}
          />
        ))}
      </div>

      <div className={styles.cta}>
        <p>Únete a quienes ya protegen su celular con RedCase.</p>
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => navigate('/catalogo')}
        >
          Ver catálogo <ArrowRightOutlined />
        </Button>
      </div>
    </section>
  );
}