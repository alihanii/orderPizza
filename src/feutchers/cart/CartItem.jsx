import DeleteHandler from './DeleteHandler';
import QuantityPlus from './QuantityPlus';

function CartItem(prop) {
  const { pizzaId, name, quantity, totalPrice } = prop.item;
  return (
    <li key={pizzaId} className="flex items-center justify-between py-3">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex flex-col items-center justify-between gap-5 s3m:flex-row">
        <p className="text-sm font-bold">{totalPrice} تومان</p>
        <QuantityPlus pizzaId={pizzaId}></QuantityPlus>
        <DeleteHandler pizzaId={pizzaId}></DeleteHandler>
      </div>
    </li>
  );
}

export default CartItem;
