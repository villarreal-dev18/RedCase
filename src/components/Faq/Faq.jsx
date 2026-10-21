import { motion } from 'framer-motion';
import { Button, Collapse } from 'antd';
import { PlusOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { faqs } from '../../data/faqs';
import styles from './Faq.module.css';

const items = faqs.map(({ id, question, answer }) => ({
  key: id,
  label: question,
  className: styles.item,
  children: <p className={styles.answer}>{answer}</p>,
}));

export default function Faq() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.layout}>
        <motion.div
          className={styles.aside}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className={styles.eyebrow}>Preguntas frecuentes</span>
          <h2 id="faq-title" className={styles.title}>
            ¿Tienes dudas? <span className={styles.accent}>Aquí las resolvemos</span>
          </h2>
          <p className={styles.subtitle}>
            Reunimos lo que más nos preguntan antes de comprar, para que decidas
            con tranquilidad.
          </p>

          <div className={styles.help}>
            <span className={styles.helpBlob} />
            <h3 className={styles.helpTitle}>¿No encontraste tu respuesta?</h3>
            <p className={styles.helpText}>
              Escríbenos y te ayudamos a elegir la carcasa ideal para tu celular.
            </p>
            <Button
              size="large"
              shape="round"
              icon={<WhatsAppOutlined />}
              href="https://wa.me/57TUNUMERO"
              target="_blank"
              rel="noreferrer"
            >
              Escribir por WhatsApp
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <Collapse
            ghost
            accordion
            className={styles.list}
            items={items}
            defaultActiveKey={[faqs[0].id]}
            expandIconPosition="end"
            expandIcon={({ isActive }) => (
              <span className={`${styles.icon} ${isActive ? styles.iconOpen : ''}`}>
                <PlusOutlined />
              </span>
            )}
          />
        </motion.div>
      </div>
    </section>
  );
}