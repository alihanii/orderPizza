import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [input, setInput] = useState('');
  const navigat = useNavigate();
  function handlerSubmit(e) {
    e.preventDefault();
    if (input === '') return;
    navigat(`/order/${input}`);
    setInput('');
  }
  return (
    <form onSubmit={handlerSubmit}>
      <input
        className=" w-28 rounded-full bg-yellow-100 px-4 py-2 text-xs transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-opacity-50 sm:w-64 sm:text-sm sm:focus:w-72"
        placeholder="پیگیری سفارش..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
