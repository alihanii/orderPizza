import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div className="space-y-3 text-center">
      <Link className="linkBack" to="/menu">
        &larr; بازگشت به منو
      </Link>

      <p> :)سبد خرید شما هنوز خالی است. شروع به اضافه کردن پیتزا کنید</p>
    </div>
  );
}

export default EmptyCart;
