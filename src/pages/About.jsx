import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import {
  ArrowRightOutlined,
  CustomerServiceOutlined,
  MobileOutlined,
  SafetyCertificateOutlined,
  TagOutlined,
  ThunderboltFilled,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { products } from '../data/Product';
import styles from './About.module.css';

/* ---------- Contenido ----------
   ⚠️ EJEMPLO: ajusta estos textos a la historia real del negocio
   (quiénes son, desde cuándo, qué los diferencia). */

const WHATSAPP_URL = 'https://wa.me/57TUNUMERO'; // TODO: el mismo número del Footer

const story = [
  'RedCase nació de una idea sencilla: encontrar la carcasa de tu celular no debería ser una búsqueda interminable. Queríamos una tienda donde bastara con elegir tu marca y tu modelo para ver, de una vez, lo que realmente te queda.',
  'Por eso reunimos carcasas, protectores y accesorios con diseños cuidados, materiales resistentes y precios honestos, y los acompañamos con una atención cercana, antes y después de tu compra.',
];

const pillars = [
  {
    label: 'Misión',
    text: 'Que cualquier persona encuentre, en pocos clics, la protección y los accesorios perfectos para su celular.',
  },
  {
    label: 'Visión',
    text: 'Ser la tienda de referencia para quienes quieren cuidar su celular con estilo, en todo el país.',
  },
];

const values = [
  {
    icon: <SafetyCertificateOutlined />,
    title: 'Calidad que protege',
    text: 'Materiales resistentes y bordes elevados para cuidar la pantalla y la cámara.',
  },
  {
    icon: <MobileOutlined />,
    title: 'Ajuste exacto',
    text: 'Cada producto está pensado para tu modelo, sin holguras ni sorpresas.',
  },
  {
    icon: <TagOutlined />,
    title: 'Precios honestos',
    text: 'Buenos precios y sin letra pequeña: lo que ves es lo que pagas.',
  },
  {
    icon: <CustomerServiceOutlined />,
    title: 'Atención cercana',
    text: 'Te asesoramos por WhatsApp para que elijas bien, antes y después de comprar.',
  },
];

const steps = [
  {
    title: 'Elige tu modelo',
    text: 'Busca tu marca y tu modelo y te mostramos solo lo que le queda a tu celular.',
  },
  {
    title: 'Compra fácil y seguro',
    text: 'Revisa tu pedido con calma y págalo en línea, sin pasos de más.',
  },
  {
    title: 'Recíbelo en casa',
    text: 'Enviamos a todo el país para que lo tengas lo antes posible.',
  },
];

// Fotos reales de la tienda: las primeras carcasas con imagen
const mosaic = products.filter((product) => product.category === 'carcasa' && product.image).slice(0, 4);

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

export default function About() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobRed}`} />
        <span className={`${styles.blob} ${styles.blobPink}`} />
        <span className={styles.acrylic} />
      </div>

      {/* ---------- Portada ---------- */}
      <section className={styles.hero} aria-labelledby="about-title">
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className={styles.eyebrow}>Nosotros</span>
          <h1 id="about-title" className={styles.title}>
            Protegemos lo que <span className={styles.accent}>más usas</span>
          </h1>
          <p className={styles.lead}>
            En RedCase creemos que cuidar tu celular no tiene por qué ser aburrido ni
            complicado. Reunimos carcasas, protectores y accesorios con diseños únicos,
            para el modelo exacto que tienes.
          </p>

          <div className={styles.actions}>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={() => navigate('/catalogo')}
            >
              Ver catálogo <ArrowRightOutlined />
            </Button>
            <Button
              size="large"
              shape="round"
              icon={<WhatsAppOutlined />}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Escríbenos
            </Button>
          </div>
        </motion.div>

        <motion.ul
          className={styles.mosaic}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {mosaic.map((product) => (
            <li key={product.id} className={styles.tile}>
              <img className={styles.tileImage} src={product.image} alt="" loading="lazy" />
            </li>
          ))}
        </motion.ul>
      </section>

      {/* ---------- Historia ---------- */}
      <motion.section className={styles.story} aria-labelledby="story-title" {...reveal()}>
        <div className={styles.storyHead}>
          <span className={styles.eyebrow}>Nuestra historia</span>
          <h2 id="story-title" className={styles.heading}>
            Hecha para que <span className={styles.accent}>elegir sea fácil</span>
          </h2>
        </div>

        <div className={styles.storyBody}>
          {story.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}

          <div className={styles.pillars}>
            {pillars.map(({ label, text }) => (
              <div key={label} className={styles.pillar}>
                <strong>{label}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ---------- Valores ---------- */}
      <section className={styles.values} aria-labelledby="values-title">
        <motion.div className={styles.sectionHead} {...reveal()}>
          <span className={styles.eyebrow}>Lo que nos mueve</span>
          <h2 id="values-title" className={styles.heading}>
            Nuestros <span className={styles.accent}>valores</span>
          </h2>
        </motion.div>

        <ul className={styles.valueGrid}>
          {values.map(({ icon, title, text }, index) => (
            <motion.li key={title} className={styles.value} {...reveal(index * 0.08)}>
              <span className={styles.valueIcon}>{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* ---------- Cómo funciona ---------- */}
      <section className={styles.steps} aria-labelledby="steps-title">
        <motion.div className={styles.sectionHead} {...reveal()}>
          <span className={styles.eyebrow}>Cómo comprar</span>
          <h2 id="steps-title" className={styles.heading}>
            Así de <span className={styles.accent}>fácil</span>
          </h2>
        </motion.div>

        <ol className={styles.stepList}>
          {steps.map(({ title, text }, index) => (
            <motion.li key={title} className={styles.step} {...reveal(index * 0.1)}>
              <span className={styles.stepNumber} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* ---------- Llamada a la acción ---------- */}
      <section className={styles.ctaSection} aria-labelledby="cta-title">
        <motion.div className={styles.cta} {...reveal()}>
          <span className={`${styles.ctaBlob} ${styles.ctaBlobMain}`} />
          <span className={`${styles.ctaBlob} ${styles.ctaBlobSoft}`} />

          <span className={styles.ctaTag}>
            <ThunderboltFilled /> Encuentra la tuya
          </span>
          <h2 id="cta-title" className={styles.ctaTitle}>
            ¿Listo para proteger tu celular con <span className={styles.ctaAccent}>estilo</span>?
          </h2>
          <p className={styles.ctaText}>
            Elige tu marca y tu modelo y descubre todo lo que RedCase tiene para ti.
          </p>

          <div className={styles.actions}>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={() => navigate('/catalogo')}
            >
              Ir al catálogo <ArrowRightOutlined />
            </Button>
            <Button
              ghost
              size="large"
              shape="round"
              icon={<WhatsAppOutlined />}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Hablar con nosotros
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
