import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import About from '../pages/About';
import NotFound from '../pages/404';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'catalogo', element: <Catalog /> },
      { path: 'producto/:id', element: <ProductDetail /> },
      { path: 'carrito', element: <Cart /> },
      { path: 'pago', element: <Checkout /> },
      { path: 'nosotros', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);