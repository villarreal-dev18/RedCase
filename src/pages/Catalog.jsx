import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge, Button, Drawer, Empty, Pagination, Select, Tag } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import CatalogFilters from '../components/CatalogFilters/CatalogFilters';
import FeaturedCard from '../components/FeaturedProducts/FeaturedCard';
import useCatalogFilters, { PAGE_SIZE, sortOptions } from '../hooks/useCatalogFilters';
import { colors } from '../theme/tokens';
import styles from './Catalog.module.css';

export default function Catalog() {
  const { filters, setFilter, clearFilters, chips, items, total, page } = useCatalogFilters();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const resultsRef = useRef(null);

  // Al quitar la búsqueda desde fuera del campo, se reinicia el texto escrito
  const handleClear = () => {
    clearFilters();
    setResetKey((key) => key + 1);
  };

  const handleRemoveChip = (chip) => {
    setFilter(chip.clear);
    if ('q' in chip.clear) setResetKey((key) => key + 1);
  };

  const handlePageChange = (nextPage) => {
    setFilter({ pagina: nextPage > 1 ? nextPage : undefined });
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filtersProps = {
    filters,
    setFilter,
    onClear: handleClear,
    activeCount: chips.length,
    resetKey,
  };

  const target = filters.modelo ?? filters.marca;

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobRed}`} />
        <span className={`${styles.blob} ${styles.blobPink}`} />
        <span className={styles.acrylic} />
      </div>

      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className={styles.eyebrow}>Catálogo</span>
        <h1 className={styles.title}>
          Encuentra la <span className={styles.accent}>carcasa ideal</span> para tu celular
        </h1>
        <p className={styles.description}>
          Filtra por marca, modelo, categoría o precio y quédate solo con lo que de verdad le
          queda a tu celular.
        </p>
      </motion.header>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Filtros del catálogo">
          <CatalogFilters {...filtersProps} />
        </aside>

        <section ref={resultsRef} className={styles.results} aria-label="Productos">
          <div className={styles.toolbar}>
            <p className={styles.count} aria-live="polite">
              <strong>{total}</strong> {total === 1 ? 'producto' : 'productos'}
              {target && (
                <>
                  {' '}
                  para <strong>{target}</strong> (incluye accesorios universales)
                </>
              )}
            </p>

            <div className={styles.tools}>
              <span className={styles.filterTrigger}>
                <Badge count={chips.length} size="small" color={colors.primary}>
                  <Button
                    shape="round"
                    size="large"
                    icon={<FilterOutlined />}
                    onClick={() => setDrawerOpen(true)}
                  >
                    Filtros
                  </Button>
                </Badge>
              </span>

              <div className={styles.sort}>
                <span className={styles.sortLabel}>Ordenar por</span>
                <Select
                  variant="borderless"
                  style={{ minWidth: 150, fontWeight: 500 }}
                  popupMatchSelectWidth={false}
                  value={filters.orden}
                  options={sortOptions}
                  onChange={(orden) => setFilter({ orden: orden === 'relevancia' ? undefined : orden })}
                  aria-label="Ordenar productos"
                />
              </div>
            </div>
          </div>

          {chips.length > 0 && (
            <div className={styles.chips}>
              {chips.map((chip) => (
                <Tag
                  key={chip.key}
                  className={styles.chip}
                  closable
                  onClose={(event) => {
                    event.preventDefault();
                    handleRemoveChip(chip);
                  }}
                >
                  {chip.label}
                </Tag>
              ))}
              <button type="button" className={styles.clearAll} onClick={handleClear}>
                Limpiar todo
              </button>
            </div>
          )}

          {items.length > 0 ? (
            <ul className={styles.grid}>
              {items.map((product, index) => (
                <motion.li
                  key={product.id}
                  className={styles.cell}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05 }}
                >
                  <FeaturedCard product={product} />
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              <Empty description="No encontramos productos con esos filtros" />
              <Button type="primary" shape="round" size="large" onClick={handleClear}>
                Limpiar filtros
              </Button>
            </div>
          )}

          {total > PAGE_SIZE && (
            <div className={styles.pagination}>
              <Pagination
                current={page}
                pageSize={PAGE_SIZE}
                total={total}
                showSizeChanger={false}
                onChange={handlePageChange}
              />
            </div>
          )}
        </section>
      </div>

      <Drawer
        title="Filtros"
        placement="left"
        size={360}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        destroyOnHidden
        footer={
          <Button
            type="primary"
            block
            size="large"
            shape="round"
            onClick={() => setDrawerOpen(false)}
          >
            Ver {total} {total === 1 ? 'producto' : 'productos'}
          </Button>
        }
      >
        <CatalogFilters {...filtersProps} />
      </Drawer>
    </div>
  );
}
