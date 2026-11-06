import { useState } from 'react';
import { Button, Input, Select, Slider, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { brands } from '../../data/brands';
import { phoneModels } from '../../data/PhoneModels';
import { categoryLabels } from '../../data/Product';
import { priceBounds } from '../../hooks/useCatalogFilters';
import { formatPrice } from '../../utils/formatPrice';
import styles from './CatalogFilters.module.css';

const brandOptions = brands.map((brand) => ({ value: brand, label: brand }));
const categoryEntries = Object.entries(categoryLabels);

export default function CatalogFilters({ filters, setFilter, onClear, activeCount, resetKey }) {
  // El slider guarda su valor mientras se arrastra y solo cambia la URL al soltar
  const [range, setRange] = useState([filters.min, filters.max]);
  const [syncedRange, setSyncedRange] = useState([filters.min, filters.max]);
  if (syncedRange[0] !== filters.min || syncedRange[1] !== filters.max) {
    setSyncedRange([filters.min, filters.max]);
    setRange([filters.min, filters.max]);
  }

  const modelOptions = (phoneModels[filters.marca] ?? []).map((model) => ({
    value: model,
    label: model,
  }));

  return (
    <div className={styles.filters}>
      <div className={styles.group}>
        <span className={styles.label}>Buscar</span>
        <div className={styles.field}>
          {/* Sin `value`: el campo guarda su texto y la URL se actualiza al escribir */}
          <Input
            key={resetKey}
            variant="borderless"
            prefix={<SearchOutlined />}
            placeholder="Nombre del producto"
            allowClear
            defaultValue={filters.q}
            onChange={(event) => setFilter({ q: event.target.value })}
            aria-label="Buscar producto"
          />
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>Tu celular</span>
        <div className={styles.field}>
          <Select
            variant="borderless"
            style={{ width: '100%' }}
            placeholder="Todas las marcas"
            showSearch
            allowClear
            optionFilterProp="label"
            value={filters.marca}
            options={brandOptions}
            onChange={(marca) => setFilter({ marca, modelo: undefined })}
            aria-label="Marca"
          />
        </div>
        <div className={`${styles.field} ${filters.marca ? '' : styles.fieldDisabled}`}>
          <Select
            variant="borderless"
            style={{ width: '100%' }}
            placeholder="Todos los modelos"
            showSearch
            allowClear
            optionFilterProp="label"
            disabled={!filters.marca}
            value={filters.modelo}
            options={modelOptions}
            onChange={(modelo) => setFilter({ modelo })}
            aria-label="Modelo"
          />
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>Categoría</span>
        <div className={styles.chips} role="group" aria-label="Categoría">
          <button
            type="button"
            className={`${styles.chip} ${!filters.categoria ? styles.chipActive : ''}`}
            aria-pressed={!filters.categoria}
            onClick={() => setFilter({ categoria: undefined })}
          >
            Todas
          </button>
          {categoryEntries.map(([value, label]) => {
            const active = filters.categoria === value;
            return (
              <button
                key={value}
                type="button"
                className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                aria-pressed={active}
                onClick={() => setFilter({ categoria: active ? undefined : value })}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.label}>Precio</span>
        <Slider
          className={styles.slider}
          range
          min={priceBounds.min}
          max={priceBounds.max}
          step={1000}
          value={range}
          onChange={setRange}
          onChangeComplete={([min, max]) =>
            setFilter({
              min: min > priceBounds.min ? min : undefined,
              max: max < priceBounds.max ? max : undefined,
            })
          }
          tooltip={{ formatter: formatPrice }}
        />
        <div className={styles.rangeLabels}>
          <span>{formatPrice(range[0])}</span>
          <span>{formatPrice(range[1])}</span>
        </div>
      </div>

      <div className={styles.switches}>
        <label className={styles.switchRow}>
          <span>Solo ofertas</span>
          <Switch
            checked={filters.ofertas}
            onChange={(checked) => setFilter({ ofertas: checked })}
          />
        </label>
        <label className={styles.switchRow}>
          <span>Solo novedades</span>
          <Switch
            checked={filters.nuevos}
            onChange={(checked) => setFilter({ nuevos: checked })}
          />
        </label>
      </div>

      <Button block size="large" shape="round" disabled={activeCount === 0} onClick={onClear}>
        Limpiar filtros
      </Button>
    </div>
  );
}
