import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../feutchers/user/userSlice';
import CartReducer from '../feutchers/cart/CartSlice';

const store = configureStore({
  reducer: { user: UserReducer, cart: CartReducer },
});
export default store;
