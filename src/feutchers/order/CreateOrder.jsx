import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress, updateName } from '../user/userSlice';
import { clearCart, getTotalPrice } from '../cart/CartSlice';
// import Loader from "../../ui/Loader";
import EmptyCart from '../cart/EmptyCart';
import store from '../../util/store';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart.cart);
  const totalPrice = useSelector(getTotalPrice);
  const { username, status, address, errorr } = store;
  const navigation = useNavigation();
  const error = useActionData();
  const isLoading = navigation.state === 'submitting';
  const isLOading = status === 'loading';
  // if (isLoading) return <Loader />;
  const price = withPriority ? (totalPrice * 80) / 100 : totalPrice;
  if (cart.length === 0) return <EmptyCart />;
  console.log(status);
  console.log(errorr);
  return (
    <div className="m px-2">
      <h2 className="mt-4">بریم برای دریافت سفارش😊</h2>
      <Form method="POST" action="/order/new">
        <div className="my-5 flex grow flex-col items-start justify-between sm:flex-row sm:items-center  ">
          <label className="ml-2 sm:basis-40">نام شما</label>
          <input
            className="input w-full"
            type="text"
            name="customer"
            required
            value={username}
            maxLength="10"
            onChange={(e) => dispatch(updateName(e.target.value))}
          />
        </div>

        <div className="my-5 flex grow flex-col items-start justify-between sm:flex-row sm:items-center ">
          <label
            className={`ml-2 sm:basis-40 ${error?.phone && 'mb-0 sm:mb-11'}`}
          >
            شماره تلفنتون
          </label>
          <div className="w-full">
            <input className="input w-full" type="tel" name="phone" required />
            {error?.phone && (
              <p className="mt-2 rounded-md bg-red-200 py-2 pl-3 pr-2 text-right text-xs text-red-600 s3m:text-sm sm:basis-40">
                {' '}
                {error.phone}
              </p>
            )}
          </div>
        </div>

        <div className=" my-5 flex grow flex-col items-start justify-between sm:flex-row sm:items-center ">
          <label className={`${errorr && 'mb-0 sm:mb-11'}  ml-2 sm:basis-40`}>
            آدرس
          </label>
          <div className="w-full">
            <div className="relative">
              <input
                className="input w-full"
                type="text"
                name="address"
                defaultValue={address}
                disabled={isLOading}
                required
              />{' '}
              {!address && (
                <button
                  className="button absolute bottom-0 right-0 top-0 z-50  text-nowrap text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  گرفتن موقعیت شما{' '}
                </button>
              )}
            </div>{' '}
            {status === 'error' && (
              <p className="mt-2 rounded-md bg-red-200 py-2 pl-3 pr-2 text-right text-xs text-red-600 s3m:text-sm sm:basis-40">
                {' '}
                مشکلی در دریافت آدرس شما وجود داشت. این فیلد را حتما پر کنید!
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-start">
          <input
            className="md:py mr-5 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 md:flex-shrink-0"
            type="checkbox"
            name="priority"
            id="priority"
            onChange={() => setWithPriority((item) => (item = !item))}
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">
            آیا می خواهید سفارش خود را در اولویت قرار دهید؟
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>

        <div className="mt-5 flex justify-center ssm:justify-start">
          <Button disabled={isLoading}>
            {isLoading ? 'اماده سازی...' : `هزینه کل ${price} تومان`}
          </Button>{' '}
        </div>
      </Form>
    </div>
  );
}
export async function avtionNewOrder({ request }) {
  const res = await request.formData();
  const data = Object.fromEntries(res);
  const order = {
    ...data,
    priority: data.priority === 'on',
    cart: JSON.parse(data.cart),
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'شماره تلفن خود را به صورت صحیح وارد کنید';
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
