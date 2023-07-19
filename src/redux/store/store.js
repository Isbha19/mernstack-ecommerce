import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categoriesSlices";
import brandReducer from "../slices/brands/brandsSlices";
import colorReducer from "../slices/colors/colorsSlices";
import cartReducer from "../slices/cart/cartSlices";
import couponsReducer from "../slices/coupons/couponSlices";
import ordersReducer from "../slices/orders/orderSlices";
import reviewsReducer from "../slices/reviews/reviewsSlices";

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
    cart: cartReducer,
    coupons: couponsReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
  },
});

export default store;
