import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initial state
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create category action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(payload);
      const { name, file } = payload;
      //form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      //token
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make a request
      const { data } = await axios.post(
        `${baseURL}/categories`,

        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch category action
export const fetchCategoryAction = createAsyncThunk(
  "category/fetch-single",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      //make a request
      const { data } = await axios.get(`${baseURL}/categories/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch categories action
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //make a request
      const { data } = await axios.get(`${baseURL}/categories`);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update category action
export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async ({ id, name }, { rejectWithValue, getState, dispatch }) => {
    try {
      //token
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make a request
      const { data } = await axios.put(
        `${baseURL}/categories/${id}`,
        name,
        config
      );
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Delete category action
export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      //token
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //make a request
      const { data } = await axios.delete(
        `${baseURL}/categories/${id}`,
        config
      );
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //update
    builder.addCase(updateCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.isUpdated = false;
      state.error = action.payload;
    });
    //fetch single
    builder.addCase(fetchCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;

      state.error = action.payload;
    });
    //fetch all
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = null;

      state.error = action.payload;
    });
    //Delete category
    builder.addCase(deleteCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;

      state.error = action.payload;
    });
    //Reset error action
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
    //Reset success action
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.isUpdated = false;
    });
  },
});

//generate reducer
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
