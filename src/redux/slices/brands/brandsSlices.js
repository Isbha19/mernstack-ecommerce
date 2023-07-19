import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initial state
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create brand action
export const createBrandAction = createAsyncThunk(
  "brand/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;

      //token
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make a request
      const { data } = await axios.post(
        `${baseURL}/brands`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch brands action
export const fetchBrandsAction = createAsyncThunk(
  "brands/fetch All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //make a request
      const { data } = await axios.get(`${baseURL}/brands`);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch all
    //create
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;

      state.error = action.payload;
    });
    //reser error action
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
    //reser error action
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
  },
});

//generate reducer
const brandReducer = brandSlice.reducer;

export default brandReducer;
