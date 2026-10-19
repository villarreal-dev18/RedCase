import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Select } from 'antd';
import { MobileOutlined, SearchOutlined } from '@ant-design/icons';
import { brands } from '../../data/brands';
import { phoneModels } from '../../data/phoneModels';
import styles from './ModelFinder.module.css';

const brandOptions = brands.map((brand) => ({ value: brand, label: brand }));

export default function ModelFinder() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();

  const modelOptions = brand
    ? phoneModels[brand].map((item) => ({ value: item, label: item }))
    : [];

  const handleBrandChange = (value) => {
    setBrand(value);
    setModel(undefined); // al cambiar de marca, se borra el modelo
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('marca', brand);
    if (model) params.set('modelo', model);
    navigate(`/catalogo?${params.toString()}`);
  };

  return (
    <section className={styles.wrapper} aria-label="Busca tu modelo de celular">
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className={styles.blob} aria-hidden="true" />
        <MobileOutlined className={styles.bgIcon} aria-hidden="true" />

        <div className={styles.text}>
          <span className={styles.eyebrow}>Busca tu modelo</span>
          <h2 className={styles.title}>¿Qué celular tienes?</h2>
          <p className={styles.lead}>
            Elige tu marca y tu modelo, y te mostramos solo lo que le queda perfecto.
          </p>
        </div>

        <div className={styles.panel}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="finder-brand">
              Marca
            </label>
            <Select
              id="finder-brand"
              size="large"
              showSearch
              allowClear
              optionFilterProp="label"
              placeholder="Selecciona tu marca"
              options={brandOptions}
              value={brand}
              onChange={handleBrandChange}
              style={{ width: '100%' }}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="finder-model">
              Modelo
            </label>
            <Select
              id="finder-model"
              size="large"
              showSearch
              allowClear
              optionFilterProp="label"
              placeholder={brand ? 'Selecciona tu modelo' : 'Primero elige una marca'}
              options={modelOptions}
              value={model}
              onChange={setModel}
              disabled={!brand}
              style={{ width: '100%' }}
            />
          </div>

          <Button
            type="primary"
            size="large"
            shape="round"
            block
            icon={<SearchOutlined />}
            disabled={!brand}
            onClick={handleSearch}
          >
            Buscar mi carcasa
          </Button>
        </div>
      </motion.div>
    </section>
  );
}