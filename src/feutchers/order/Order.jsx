// Test ID:

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import { calcMinutesLeft, formatDate } from '../../util/helpers';
import { useEffect } from 'react';
import UpdatePriority from './UpdatePriority';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );

  const isLoading = fetcher.state === 'loading';
  return (
    <div className="mx-3">
      <div className="my-5 flex flex-col items-center justify-between">
        <h2 className="text-lg mdd:text-xl">
          <span className="font-mono uppercase">#{id} </span>
          <span> کد پیگیری</span>{' '}
        </h2>
        <div className="space-x-2">
          {priority && (
            <span className="button bg-red-700 px-3 py-2 text-sm  text-stone-100  hover:bg-red-600 hover:text-stone-200 focus:bg-red-600 focus:ring-red-600">
              Priority
            </span>
          )}
          <span className="button bg-green-700 px-3 py-2 text-sm text-stone-100 hover:bg-green-600 hover:text-stone-200 focus:bg-green-600 focus:ring-green-600">
            {status} order
          </span>
        </div>
      </div>

      <div className=" flex flex-col items-center justify-between bg-stone-400/50 p-5 text-center text-sm sm:flex-row">
        <p className="font-bold">
          {deliveryIn >= 0
            ? `فقط ${calcMinutesLeft(estimatedDelivery)} دقیقه مانده 😃`
            : 'سفارش باید می رسید'}
        </p>
        <p className="text-sm">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className=" mb-4 divide-y divide-stone-500 border-b border-stone-500 text-base">
        {cart.map((item) => (
          <li className="mb-1 ml-2 flex flex-col pt-1" key={item.pizzaId}>
            <div className="flex items-center justify-between text-lg">
              <span>
                {item.quantity}&times; {item.name}{' '}
              </span>
              <p>{item.totalPrice} تومان</p>
            </div>
            <p className="text-sm">
              {isLoading
                ? 'در حال بارگیری...'
                : fetcher?.data
                    ?.find((elem) => elem.id === item.pizzaId)
                    ?.ingredients.join(', ') ?? []}
            </p>
          </li>
        ))}
      </ul>
      <div className="mb-3 flex flex-col items-start justify-between space-y-3 bg-stone-400/50 p-5">
        <p>قیمت: {orderPrice} تومان</p>
        {priority && <p>اولویت قیمت: {priorityPrice} تومان</p>}
        <p className="font-bold">پیک: {orderPrice + priorityPrice} تومان</p>
      </div>
      {!priority && <UpdatePriority order={order} />}
    </div>
  );
}
export function orderLoader({ params }) {
  const order = getOrder(params.orderID);
  return order;
}

export default Order;
