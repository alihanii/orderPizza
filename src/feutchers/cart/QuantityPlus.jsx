import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from './CartSlice';

function QuantityPlus(prop) {
  const { children, pizzaId } = prop;
  const dispach = useDispatch();
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={() => dispach(increaseItemQuantity(pizzaId))}
        className="button   px-3 py-1.5 text-sm"
      >
        +{' '}
      </button>
      {children}
      <button
        onClick={() => dispach(decreaseItemQuantity(pizzaId))}
        className="button px-3 py-1.5 text-sm"
      >
        -{' '}
      </button>
    </div>
  );
}

export default QuantityPlus;
