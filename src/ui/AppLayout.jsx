import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../feutchers/cart/CartOverview';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoding = navigation.state === 'loading';
  // const isLoding = true;
  return (
    <>
      {' '}
      {isLoding && <Loader />}
      <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-stone-200">
        <Header />
        <div className="overflow-scroll">
          <main className="mx-auto max-w-3xl">
            <Outlet />{' '}
          </main>
        </div>
        <CartOverview />
      </div>
    </>
  );
}

export default AppLayout;
