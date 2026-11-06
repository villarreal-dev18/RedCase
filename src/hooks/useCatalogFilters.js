import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categoryLabels, products } from '../data/Product';
import { formatPrice } from '../utils/formatPrice';

export const PAGE_SIZE = 9;

export const sortOptions = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'menor-precio', label: 'Menor precio' },
  { value: 'mayor-precio', label: 'Mayor precio' },
  { value: 'mayor-descuento', label: 'Mayor descuento' },
  { value: 'nombre', label: 'Nombre (A-Z)' },
];

// "Accesorios" agrupa todo lo que no es carcasa (lo usa el Hero: ?categoria=accesorios)
const extraCategoryLabels = { accesorios: 'Accesorios' };

export const getCategoryLabel = (category) =>
  categoryLabels[category] ?? extraCategoryLabels[category];

const matchesCategory = (product, category) => {
  if (!category) return true;
  if (category === 'accesorios') return product.category !== 'carcasa';
  return product.category === category;
};

// Precio final con descuento (misma fórmula que FeaturedCard)
const finalPrice = ({ price, discount }) =>
  discount ? Math.round((price * (1 - discount / 100)) / 100) * 100 : price;

const allPrices = products.map(finalPrice);

export const priceBounds = {
  min: Math.floor(Math.min(...allPrices) / 1000) * 1000,
  max: Math.ceil(Math.max(...allPrices) / 1000) * 1000,
};

const clampPrice = (value) => Math.min(priceBounds.max, Math.max(priceBounds.min, value));

// Búsqueda sin tildes ni mayúsculas
const normalize = (text) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const sorters = {
  relevancia: (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  'menor-precio': (a, b) => finalPrice(a) - finalPrice(b),
  'mayor-precio': (a, b) => finalPrice(b) - finalPrice(a),
  'mayor-descuento': (a, b) => (b.discount ?? 0) - (a.discount ?? 0),
  nombre: (a, b) => a.name.localeCompare(b.name, 'es'),
};

/**
 * Los filtros viven en la URL, así se pueden compartir y funcionan con el
 * buscador de modelos y los banners:
 *   /catalogo?marca=iPhone&modelo=iPhone%2015&categoria=carcasa&ofertas=1
 * Parámetros: q, marca, modelo, categoria, ofertas, nuevos, min, max, orden, pagina
 */
export default function useCatalogFilters() {
  const [params, setParams] = useSearchParams();

  const categoria = params.get('categoria');
  const orden = params.get('orden');

  const filters = {
    q: params.get('q') ?? '',
    marca: params.get('marca') || undefined,
    modelo: params.get('modelo') || undefined,
    categoria: getCategoryLabel(categoria) ? categoria : undefined,
    ofertas: params.get('ofertas') === '1',
    nuevos: params.get('nuevos') === '1',
    min: clampPrice(Number(params.get('min')) || priceBounds.min),
    max: clampPrice(Number(params.get('max')) || priceBounds.max),
    orden: sortOptions.some((option) => option.value === orden) ? orden : 'relevancia',
    pagina: Math.max(1, Number(params.get('pagina')) || 1),
  };

  // Cambia uno o varios filtros. Un valor vacío, false o undefined lo quita de la URL.
  const setFilter = useCallback(
    (changes) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(changes).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '' || value === false) {
              next.delete(key);
            } else {
              next.set(key, value === true ? '1' : String(value));
            }
          });
          // Al cambiar un filtro se vuelve a la página 1
          if (!('pagina' in changes)) next.delete('pagina');
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  // Quita todos los filtros, pero conserva el orden elegido
  const clearFilters = useCallback(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams();
        if (prev.get('orden')) next.set('orden', prev.get('orden'));
        return next;
      },
      { replace: true },
    );
  }, [setParams]);

  // Con marca o modelo elegido también se muestran los accesorios universales
  const query = normalize(filters.q.trim());
  const matched = products.filter((product) => {
    const isUniversal = product.brand === 'Universal';

    if (query && !normalize(`${product.name} ${product.brand} ${product.model}`).includes(query)) {
      return false;
    }
    if (filters.marca && product.brand !== filters.marca && !isUniversal) return false;
    if (filters.modelo && product.model !== filters.modelo && !isUniversal) return false;
    if (!matchesCategory(product, filters.categoria)) return false;
    if (filters.ofertas && !product.discount) return false;
    if (filters.nuevos && !product.isNew) return false;

    const price = finalPrice(product);
    return price >= filters.min && price <= filters.max;
  });

  matched.sort(sorters[filters.orden]);

  const total = matched.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(filters.pagina, pageCount);
  const items = matched.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Filtros activos, para mostrarlos como etiquetas que se pueden quitar
  const chips = [];
  if (filters.q.trim()) {
    chips.push({ key: 'q', label: `“${filters.q.trim()}”`, clear: { q: '' } });
  }
  if (filters.marca) {
    chips.push({ key: 'marca', label: filters.marca, clear: { marca: undefined, modelo: undefined } });
  }
  if (filters.modelo) {
    chips.push({ key: 'modelo', label: filters.modelo, clear: { modelo: undefined } });
  }
  if (filters.categoria) {
    chips.push({
      key: 'categoria',
      label: getCategoryLabel(filters.categoria),
      clear: { categoria: undefined },
    });
  }
  if (filters.ofertas) chips.push({ key: 'ofertas', label: 'En oferta', clear: { ofertas: false } });
  if (filters.nuevos) chips.push({ key: 'nuevos', label: 'Novedades', clear: { nuevos: false } });
  if (filters.min > priceBounds.min || filters.max < priceBounds.max) {
    chips.push({
      key: 'precio',
      label: `${formatPrice(filters.min)} – ${formatPrice(filters.max)}`,
      clear: { min: undefined, max: undefined },
    });
  }

  return { filters, setFilter, clearFilters, chips, items, total, page };
}
