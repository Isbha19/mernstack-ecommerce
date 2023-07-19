import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initial state
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create product action
export const createProductAction = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        files,
      } = payload;

      //token
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      //formdata
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);

      formData.append("brand", brand);

      formData.append("price", price);
      formData.append("totalQty", totalQty);

      sizes.forEach((size) => {
        formData.append("sizes", size);
      });
      colors.forEach((color) => {
        formData.append("colors", color);
      });
      files.forEach((file) => {
        formData.append("files", file);
      });
      //make a request
      const { data } = await axios.post(
        `${baseURL}/products`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update product action
export const updateProductAction = createAsyncThunk(
  "product/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        id,
      } = payload;

      //token
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //make a request
      const { data } = await axios.put(
        `${baseURL}/products/${id}`,
        { name, description, category, sizes, brand, colors, price, totalQty },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch products action
export const fetchProductsAction = createAsyncThunk(
  "product/list",
  async ({ url }, { rejectWithValue, getState, dispatch }) => {
    console.log(url);
    try {
      //token
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //make a request
      const { data } = await axios.get(`${url}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Fetch product action
export const fetchProductAction = createAsyncThunk(
  "product/details",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      //token
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //make a request
      const { data } = await axios.get(
        `${baseURL}/products/${productId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//slice
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //update
    builder.addCase(updateProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isUpdated = false;
      state.error = action.payload;
    });

    //fetch
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch product
    builder.addCase(fetchProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.isUpdated = false;
    });
  },
});

//generate reducer
const productReducer = productSlice.reducer;

export default productReducer;
