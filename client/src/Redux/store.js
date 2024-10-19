import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice"; // Ensure this imports the default export
import cartReducer from "./CartSlice";
import orderReducer from './OrderSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order:orderReducer,
  },
});

export default store;
