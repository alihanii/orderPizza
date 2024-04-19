import { useEffect, useState } from 'react';
export default function useLocalStorage(key) {
  const [cart, setcart] = useState(function () {
    const res = localStorage.getItem(key);
    if (JSON.parse(res) === null) {
      return [];
    } else {
      return JSON.parse(res);
    }
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(cart));
    },
    [cart, key],
  );
  return [cart, setcart];
}
