import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//add product to cart
export const addOrdertoCart = createAsyncThunk(
  "cart/add-to-cart",
  async (cartItem) => {
    console.log(isNaN(cartItem?.price));
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    //push to storage
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
);

//get items from local storage
export const getCartItemsFromLocalStorageAction = createAsyncThunk(
  "cart/get-order-items",
  async () => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    console.log(isNaN(cartItems?.price));
    return cartItems;
  }
);

//change order qty
export const changeOrderItemQty = createAsyncThunk(
  "cart/change-item-qty",
  async ({ productId, qty }) => {
    console.log(productId, qty);
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newCartItems = cartItems?.map((item) => {
      if (item?._id.toString() === productId.toString()) {
        //get new price
        const newPrice = item?.price * qty;
        item.qty = +qty;
        item.totalPrice = newPrice;
      }

      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }
);

//remove from cart
export const removeOrderItem = createAsyncThunk(
  "cart/remove-item-",
  async (productId) => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const newItems = cartItems?.filter((item) => {
      return item?._id !== productId;
    });
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  }
);

//slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    //addtocart
    builder.addCase(addOrdertoCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrdertoCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      state.isAdded = true;
    });
    builder.addCase(addOrdertoCart.rejected, (state, action) => {
      state.loading = false;
      state.cartItems = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch cartItems
    builder.addCase(getCartItemsFromLocalStorageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCartItemsFromLocalStorageAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.isAdded = true;
      }
    );
    builder.addCase(
      getCartItemsFromLocalStorageAction.rejected,
      (state, action) => {
        state.loading = false;
        state.cartItems = null;
        state.isAdded = false;
        state.error = action.payload;
      }
    );
  },
});

//generate reducer
const cartReducer = cartSlice.reducer;

export default cartReducer;
