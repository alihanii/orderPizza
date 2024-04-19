import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { useSelector } from 'react-redux';

function Menu() {
  const menu = useLoaderData();
  const cart = useSelector((store) => store.cart.cart);
  return (
    <ul className=" divide-y-2 divide-stone-300 px-2">
      {menu.map((pizza) => (
        <MenuItem
          key={pizza.id}
          pizza={pizza}
          quantity={cart.map((item) =>
            item.pizzaId === pizza.id ? item.quantity : 0,
          )}
        />
      ))}
    </ul>
  );
}
async function menuLoader() {
  const menu = await getMenu();
  return menu;
}
export { menuLoader };

export default Menu;
