import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { ArrowRightOutlined, ThunderboltFilled } from '@ant-design/icons';
import useCountdown from '../../hooks/useCountdown';
import { offer } from '../../data/offer';
import styles from './OfferBanner.module.css';

const pad = (value) => String(value).padStart(2, '0');

export default function OfferBanner() {
  const navigate = useNavigate();
  const { days, hours, minutes, seconds, finished } = useCountdown(offer.endsAt);

  if (finished) return null;

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

        <div className={styles.visual} aria-hidden="true">
          <span className={styles.big}>{offer.discount}</span>
          <span className={styles.percent}>%</span>
          <span className={styles.off}>OFF</span>
        </div>
      </motion.div>
    </section>
  );
}