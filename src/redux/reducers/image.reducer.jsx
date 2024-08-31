import { createSlice } from "@reduxjs/toolkit";

const IMAGE_STATE = {
  images: [],
  loading: false,
  error: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState: IMAGE_STATE,
  reducers: {
    setImage: (state, action) => {
      const imageRecipe = action.payload;

      return {
        ...state,
        images: imageRecipe,
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
    ///
  },
});

export const { setImage, addError, startLoading, stopLoading } =
  imageSlice.actions;

export default imageSlice.reducer;
