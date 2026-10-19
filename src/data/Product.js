/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} brand        Debe coincidir con una marca de phoneModels.js, o 'Universal'
 * @property {string} model        Debe coincidir con phoneModels.js, o 'Todos los modelos'
 * @property {'carcasa'|'protector'|'cargador'|'audifonos'|'soporte'} category
 * @property {number} price        Precio normal, en pesos
 * @property {string} image        Ruta en la carpeta public, por ejemplo '/products/carcasa-1.png'
 * @property {boolean} [isNew]
 * @property {boolean} [featured]
 * @property {number} [discount]   Porcentaje, por ejemplo 15
 */

/** @type {Product[]} */
export const products = [
  {
    id: '1',
    name: 'Carcasa Transparente Antichoque',
    brand: 'iPhone',
    model: 'iPhone 15',
    category: 'carcasa',
    price: 39900,
    image: '/products/antichoque-1.png',
    isNew: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Carcasa Silicona Soft Touch',
    brand: 'iPhone',
    model: 'iPhone 15 Pro',
    category: 'carcasa',
    price: 45900,
    image: '/products/silitouch-1.png',
    featured: true,
  },
  {
    id: '3',
    name: 'Carcasa Rígida con Anillo',
    brand: 'Samsung',
    model: 'Galaxy S24',
    category: 'carcasa',
    price: 42900,
    image: '/products/rigidaanillo-1.png',
    featured: true,
    discount: 15,
  },
  {
    id: '4',
    name: 'Carcasa Armor Reforzada',
    brand: 'Samsung',
    model: 'Galaxy A55',
    category: 'carcasa',
    price: 36900,
    image: '',
    isNew: true,
  },
  {
    id: '5',
    name: 'Protector de Pantalla Vidrio 9H',
    brand: 'iPhone',
    model: 'iPhone 15',
    category: 'protector',
    price: 19900,
    image: '',
  },
  {
    id: '6',
    name: 'Cargador Rápido 25W USB-C',
    brand: 'Universal',
    model: 'Todos los modelos',
    category: 'cargador',
    price: 54900,
    image: '',
    featured: true,
    discount: 20,
  },
  {
    id: '7',
    name: 'Audífonos Bluetooth True Wireless',
    brand: 'Universal',
    model: 'Todos los modelos',
    category: 'audifonos',
    price: 89900,
    image: '',
    isNew: true,
  },
  {
    id: '8',
    name: 'Soporte Magnético para Carro',
    brand: 'Universal',
    model: 'Todos los modelos',
    category: 'soporte',
    price: 29900,
    image: '',
    discount: 10,
  },
];
export const categoryLabels = {
  carcasa: 'Carcasas',
  protector: 'Protectores',
  cargador: 'Cargadores',
  audifonos: 'Audífonos',
  soporte: 'Soportes',
};