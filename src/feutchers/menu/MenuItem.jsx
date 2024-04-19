import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../cart/CartSlice';
import DeleteHandler from '../cart/DeleteHandler';
import QuantityPlus from '../cart/QuantityPlus';
function MenuItem(prop) {
  const pizza = prop.pizza;
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const qua = useSelector(
    (store) =>
      store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );
  const qua1 = qua > 0;
  const pizzaa = {
    pizzaId: id,
    name: name,
    quantity: 1,
    unitPrice: unitPrice,
    totalPrice: unitPrice,
  };
  function handlerAddItem() {
    dispatch(addItem(pizzaa));
  }
  return (
    <li className="flex items-center justify-center gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut && 'opacity-70 grayscale'}`}
      />
      <div className="mt-2 flex grow flex-col gap-3 s3m:gap-0">
        <p className="text-medium">{name}</p>
        <p className="hidden text-sm capitalize italic s3m:block">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex flex-col items-start justify-start gap-3 text-sm uppercase s3m:flex-row s3m:items-center s3m:justify-between">
          {!soldOut ? <p> {unitPrice} تومان</p> : <p>تمام شده:(</p>}
          {!soldOut && !qua1 && (
            <button
              onClick={handlerAddItem}
              className="button px-4 py-2 text-xs md:px-4 md:py-2.5"
            >
              اضافه کردن
            </button>
          )}{' '}
          {qua1 && (
            <div className="flex flex-col items-center justify-center gap-2 text-xl s3m:flex-row ">
              <QuantityPlus pizzaId={id}>
                {' '}
                <span>{qua}</span>
              </QuantityPlus>
              <DeleteHandler pizzaId={id} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
