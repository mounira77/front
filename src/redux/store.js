import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./reducers/users.reducer";
import ingredientReducer from "./reducers/ingredient.reducer";
import categoryReducer from "./reducers/category.reducer";
import recipeReducer from "./reducers/recipe.reducer";
import imageReducer from "./reducers/image.reducer";
import contactReducer from "./reducers/contact.reducer";
import commentReducer from "./reducers/comment.reducer";
import favoriteReducer from "./reducers/favoris.reducer";


const store = configureStore({
  reducer: {
   // categoryReducer,
   recipeState:recipeReducer,
   userState:usersReducer, 
   categoryState:categoryReducer,
   ingredientState:ingredientReducer,
    imageState: imageReducer,
    contactState: contactReducer,
   commentState:commentReducer,
    favoriteState:favoriteReducer,
  },
});

export default store;