import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPrice, getTotalquantity } from './CartSlice';
import { formatCurrency } from '../../util/helpers';

function CartOverview() {
  const quantity = useSelector(getTotalquantity);
  const Price = useSelector(getTotalPrice);
  if (quantity === 0) return null;
  return (
    <div className="flex flex-col items-center justify-between bg-stone-800 p-4 text-stone-200 ssm:flex-row">
      <p className="space-x-4 font-semibold">
        <span>{quantity} پیتزا</span>
        <span>${formatCurrency(Price)}</span>
      </p>
      <Link to={'/cart'}>سبد خرید &rarr;</Link>
    </div>
  );
}

export default CartOverview;
