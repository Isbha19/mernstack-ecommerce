import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initial state
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create color action
export const createColorAction = createAsyncThunk(
  "color/create",
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
        `${baseURL}/colors`,
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

//fetch colors action
export const fetchColorsAction = createAsyncThunk(
  "colors/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //make a request
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch all
    //create
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
    });
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //reser error action
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
    //reser success action
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
  },
});

//generate reducer
const colorReducer = colorSlice.reducer;

export default colorReducer;
