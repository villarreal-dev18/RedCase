/**
 * @typedef {Object} Testimonial
 * @property {string} id
 * @property {string} name
 * @property {string} city
 * @property {number} rating          1 a 5 (admite .5)
 * @property {string} quote
 * @property {string} product         Nombre del producto que compró
 * @property {string} productId       Debe coincidir con un id de products.js
 * @property {string[]} photos        Rutas en public/testimonials/ (máx. 3 se muestran)
 */

// ⚠️ EJEMPLO: reemplazar por clientes reales (con su permiso) antes de entregar.
/** @type {Testimonial[]} */
export const testimonials = [
    {
      id: 't1',
      name: 'Laura Gómez',
      city: 'Neiva',
      rating: 5,
      quote:
        'Pedí la carcasa transparente para mi iPhone y llegó perfecta: ajusta exacto en los botones y la cámara. Se nota que es resistente, ya se me cayó dos veces y ni un rayón.',
      product: 'Carcasa Transparente Antichoque',
      productId: '1',
      photos: [],
    },
    {
      id: 't2',
      name: 'Carlos Ramírez',
      city: 'Bogotá',
      rating: 5,
      quote:
        'Compré el cargador rápido y los audífonos. El empaque llegó impecable y todo funciona de maravilla. Además me ayudaron por WhatsApp a elegir lo compatible con mi Samsung.',
      product: 'Cargador Rápido 25W USB-C',
      productId: '6',
      photos: [],
    },
    {
      id: 't3',
      name: 'Valentina Ortiz',
      city: 'Medellín',
      rating: 4.5,
      quote:
        'Me encantó el acabado de la carcasa, el color es igual al de las fotos de la página. La entrega fue rápida y la atención muy amable.',
      product: 'Carcasa Silicona Soft Touch',
      productId: '2',
      photos: [],
    },
  ];