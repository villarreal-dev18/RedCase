import { motion } from 'framer-motion';
import { Progress } from 'antd';
import {
  CarOutlined,
  CheckCircleFilled,
  CheckOutlined,
  CustomerServiceOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { colors } from '../../theme/tokens';
import styles from './WhyRedCase.module.css';

/* ---------- Dibujos de la derecha ---------- */

function FitVisual() {
  return (
    <div className={styles.stage}>
      <div className={`${styles.glass} ${styles.panel}`}>
        <span className={styles.panelTitle}>Tu modelo</span>
        <div className={styles.chips}>
          <span className={`${styles.chip} ${styles.chipActive}`}>iPhone 15</span>
          <span className={styles.chip}>Galaxy S24</span>
          <span className={styles.chip}>Redmi Note 13</span>
        </div>
        <div className={styles.lines}>
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={`${styles.glass} ${styles.float} ${styles.floatTop}`}>
        <SafetyCertificateOutlined className={styles.floatIcon} />
        <div>
          <strong>Garantía</strong>
          <small>En todos los productos</small>
        </div>
      </div>

      <div
        className={`${styles.glass} ${styles.float} ${styles.floatBottom}`}
        style={{ animationDelay: '-2s' }}
      >
        <CheckCircleFilled className={styles.floatIcon} />
        <strong>Ajuste exacto</strong>
      </div>
    </div>
  );
}

function BuyVisual() {
  return (
    <div className={styles.stage}>
      <div className={styles.ring}>
        <Progress
          type="circle"
          percent={100}
          size={170}
          strokeColor={colors.primary}
          trailColor="rgba(255,255,255,0.12)"
          format={() => (
            <span className={styles.ringText}>
              <strong>100%</strong>
              <small>Compra segura</small>
            </span>
          )}
        />
      </div>

      <div className={`${styles.glass} ${styles.float} ${styles.floatLeft}`}>
        <LockOutlined className={styles.floatIcon} />
        <strong>Pago seguro</strong>
      </div>

      <div
        className={`${styles.glass} ${styles.float} ${styles.floatRight}`}
        style={{ animationDelay: '-3s' }}
      >
        <CarOutlined className={styles.floatIcon} />
        <div>
          <strong>Envíos</strong>
          <small>A todo el país</small>
        </div>
      </div>
    </div>
  );
}

function HelpVisual() {
  return (
    <div className={styles.stage}>
      <div className={`${styles.glass} ${styles.float} ${styles.status}`}>
        <WhatsAppOutlined className={styles.floatIcon} />
        <strong>Atención por WhatsApp</strong>
      </div>

      <div className={`${styles.glass} ${styles.bubble}`}>
        ¿Esta carcasa sirve para mi Galaxy A55?
      </div>
      <div className={`${styles.bubble} ${styles.bubbleMe}`}>
        ¡Sí! Te ayudo a elegir la mejor para ti.
      </div>
    </div>
  );
}

/* ---------- Contenido (ajústalo a tu negocio real) ---------- */

const reasons = [
  {
    key: 'proteccion',
    icon: <SafetyCertificateOutlined />,
    title: 'Protección que sí se nota',
    Visual: FitVisual,
    points: [
      { lead: 'Ajuste exacto', text: 'cada carcasa está hecha para tu modelo, sin holguras.' },
      { lead: 'Materiales resistentes', text: 'antichoque y con bordes elevados para pantalla y cámara.' },
      { lead: 'Variedad de estilos', text: 'transparentes, de silicona, rígidas y reforzadas.' },
      { lead: 'Garantía', text: 'respaldo en todos nuestros productos.' },
    ],
  },
  {
    key: 'compra',
    icon: <ShoppingOutlined />,
    title: 'Comprar es fácil y seguro',
    Visual: BuyVisual,
    points: [
      { lead: 'Búsqueda por modelo', text: 'encuentra lo compatible con tu celular en segundos.' },
      { lead: 'Pago en línea', text: 'un proceso claro, rápido y seguro.' },
      { lead: 'Envíos', text: 'llegamos a todo el país.' },
      { lead: 'Todo en un solo lugar', text: 'carcasas, protectores, cargadores y más.' },
    ],
  },
  {
    key: 'atencion',
    icon: <CustomerServiceOutlined />,
    title: 'Atención que te acompaña',
    Visual: HelpVisual,
    points: [
      { lead: 'Asesoría por WhatsApp', text: 'resolvemos tus dudas antes de comprar.' },
      { lead: 'Respuesta rápida', text: 'sin formularios ni esperas largas.' },
      { lead: 'Te ayudamos a elegir', text: 'según tu modelo, tu estilo y tu presupuesto.' },
      { lead: 'Soporte posventa', text: 'estamos contigo después de tu compra.' },
    ],
  },
];

export default function WhyRedCase() {
  return (
    <section className={styles.section} aria-labelledby="why-title">
      <span className={`${styles.blob} ${styles.blobLeft}`} />
      <span className={`${styles.blob} ${styles.blobRight}`} />
      <span className={styles.grid} />
      <span className={styles.acrylic} />

      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 id="why-title" className={styles.title}>
          ¿Por qué elegir <span className={styles.accent}>RedCase</span>?
        </h2>
        <p className={styles.subtitle}>
          Más que una carcasa: protección a tu medida, una compra sencilla y
          alguien real que te ayuda cuando lo necesitas.
        </p>
      </motion.div>

      <div className={styles.list}>
        {reasons.map(({ key, icon, title, points, Visual }) => (
          <motion.article
            key={key}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={styles.info}>
              <div className={styles.head}>
                <span className={styles.step}>{icon}</span>
                <h3 className={styles.name}>{title}</h3>
              </div>

              <ul className={styles.points}>
                {points.map(({ lead, text }) => (
                  <li key={lead} className={styles.point}>
                    <span className={styles.check}>
                      <CheckOutlined />
                    </span>
                    <span>
                      <strong>{lead}:</strong> {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.visual} aria-hidden="true">
              <Visual />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}