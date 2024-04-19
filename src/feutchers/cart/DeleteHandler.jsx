import { useDispatch } from 'react-redux';
import { deleteItem } from './CartSlice';

function DeleteHandler(prop) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(deleteItem(prop.pizzaId))}
      className="button px-3 py-2 text-xs uppercase"
    >
      حذف
    </button>
  );
}

export default DeleteHandler;
