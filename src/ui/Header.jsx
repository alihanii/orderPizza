import { Link } from 'react-router-dom';
import SearchOrder from '../feutchers/order/SearchOrder';
import UserName from '../feutchers/user/UserName';

function Header() {
  return (
    <header className="flex flex-col items-center justify-around space-y-2 border-b border-stone-200 bg-yellow-500 px-3 py-5 uppercase tracking-widest ssm:flex-row">
      <Link className=" text-base ssm:text-xl" to={'/'}>
        پیتزای علی
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
