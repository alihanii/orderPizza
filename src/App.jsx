import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Order, { orderLoader } from './feutchers/order/Order';
import CreateOrder, { avtionNewOrder } from './feutchers/order/CreateOrder';
import Menu, { menuLoader } from './feutchers/menu/Menu';
import Cart from './feutchers/cart/Cart';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import { actionPatchPriority } from './feutchers/order/UpdatePriority';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/order/new', element: <CreateOrder />, action: avtionNewOrder },
      {
        path: '/order/:orderID',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: actionPatchPriority,
      },
      { path: '/cart', element: <Cart /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
