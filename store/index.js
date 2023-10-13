import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { productsReducer } from "./features/products/products.slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
