import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './CartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const store = useSelector((store) => store.user);
  const cart1 = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const { cart } = cart1;
  const { username } = store;
  function handlerClearCart() {
    dispatch(clearCart());
  }
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="mx-4">
      <Link className="linkBack" to="/menu">
        &larr; بازگشن به منو
      </Link>

      <h2 className="text-bold mt-7 text-xl font-bold">سبد خرید {username}</h2>
      <ul className=" mb-2 mt-5 divide-y divide-stone-500 border-b border-stone-500">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 ssm:flex-row ssm:gap-6">
        <Link className="button text-sm" to="/order/new">
          تکمیل سفارش
        </Link>
        <button
          onClick={handlerClearCart}
          className="button bg-stone-200 text-sm text-stone-600 ring-stone-400 hover:bg-stone-400 focus:bg-stone-400 focus:ring-stone-400"
        >
          خالی کردن سبد خرید
        </button>
      </div>
    </div>
  );
}

export default Cart;
