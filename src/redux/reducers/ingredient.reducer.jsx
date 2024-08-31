import { createSlice } from "@reduxjs/toolkit";

const INGREDIENT_STATE = {
  ingredientArray: [],
  loading: false,
  error: null,
  ingredientForm: {
    name: null,
    unit: null,
    id_ingredient: null,
  },
  insertLoading: false,
  inserterror: false,
  ingredient: {
    name: "",
    unit: "",
  },
  //delete
  deleteError: "",
  deleteLoading: false,
  updateLoading: false,
  updateErrorr: null,
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: INGREDIENT_STATE,
  reducers: {
    addIngredient: (state, action) => {
      const ingred = action.payload;
      console.log("ingreeeeeeed", ingred);

      //elle me retourne le state complete avec le recipe ajouté

      return {
        ...state,
        ingredientArray: ingred,
      };
    },
    insertIngredient: (state, action) => {
      const { name, unit } = action.payload;

      //elle me retourne le state complete avec le recipe ajouté

      return {
        ...state,
        ingredient: { ...state.ingredient, name, unit },
      };
    },


    //push dans le tableau ingredientArray
    pushIngredient: (state, action) => {
      const { name, unit } = action.payload;

      //elle me retourne le state complete avec le recipe ajouté

      return {
        ...state,
        ingredientArray: [...state.ingredientArray, { name, unit }]
      };
    },
    //
    //update unit input
    updatateUnitForm: (state, action) => {
      const { unit, id_ingredient } = action.payload;

      return {
        ...state,
        ingredientForm: { ...state.ingredientForm, unit: unit, id_ingredient: id_ingredient }
      };
    },
    //

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
    //insert
    insertError: (state, action) => {
      return {
        ...state,
        inserterror: action.payload.error,
        insertLoading: false,
      };
    },
    starinserttLoading: (state, action) => {
      return { ...state, insertLoading: true };
    },
    stopinsertLoading: (state, action) => {
      return { ...state, insertLoading: false };
    },
    //delete
    deletetError: (state, action) => {
      return {
        ...state,
        deleteError: action.payload.error,
        deleteLoading: false,
      };
    },
    stardeletetLoading: (state, action) => {
      return { ...state, deleteLoading: true };
    },
    stopdeleteLoading: (state, action) => {
      return { ...state, deleteLoading: false };
    },
    //update
    updateError: (state, action) => {
      return {
        ...state,
        updateErrorr: action.payload.error,
        deleteLoading: false,
      };
    },
    starUpdateLoading: (state, action) => {
      return { ...state, updateLoading: true };
    },
    stopUpdateLoading: (state, action) => {
      return { ...state, updateLoading: false };
    },

    // deleteOne: (state, action) => {
    //   const idToDelete = action.payload.todoId;
    //   return {
    //     ...state,
    //     todos: state.todos.filter((t) => t.id !== idToDelete),
    //   };
    ///
    updateIngredientForm: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        ingredientForm: {
          ...state.ingredientForm,
          [inputName]: value,
        },
      };
    },
  },
});

export const {
  addIngredient,
  addError,
  startLoading,
  stopLoading,
  updateIngredientForm,
  insertError,
  starinserttLoading,
  stopinsertLoading,
  insertIngredient,
  deletetError,
  stardeletetLoading,
  stopdeleteLoading,

  starUpdateLoading,
  updateError,
  stopUpdateLoading,
  pushIngredient,
  updatateUnitForm,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
