import { brands } from '../../data/brands';
import styles from './BrandsMarquee.module.css';

export default function BrandsMarquee() {
  return (
    <section className={styles.section} aria-label="Marcas compatibles">
      <p className={styles.label}>Compatible con las marcas que usas</p>

      <div className={styles.viewport}>
        <div className={styles.track}>
          <ul className={styles.group}>
            {brands.map((brand) => (
              <li key={brand} className={styles.item}>
                {brand}
              </li>
            ))}
          </ul>

          {/* Copia idéntica: es lo que permite que el bucle no tenga saltos */}
          <ul className={`${styles.group} ${styles.groupClone}`} aria-hidden="true">
            {brands.map((brand) => (
              <li key={brand} className={styles.item}>
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}