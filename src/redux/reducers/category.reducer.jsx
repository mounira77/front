import { createSlice } from "@reduxjs/toolkit";

const CATEGORY_STATE = {
  categoryArray: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState: CATEGORY_STATE,
  reducers: {
    addCategory: (state, action) => {
      const cate = action.payload;
      console.log(cate);

      //elle me retourne le state complete avec le recipe ajouté

      return {
        ...state,
        categoryArray: cate,
      };
    },
    addError: (state, action) => {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    },
    startLoading: (state, action) => {
      return { ...state, loading: true };
    },
    stopLoading: (state, action) => {
      return { ...state, loading: false };
    },
  },
});

export const { addCategory, addError, startLoading, stopLoading } =
  categorySlice.actions;

export default categorySlice.reducer;
