import { createSlice } from "@reduxjs/toolkit";

const FAVORITE_STATE = {
  favorites: [],
  favorite: {
    id_user: null,
    id_recipe: null,
  },
  nbrFavorite: {
    number: null,
  },

  favoriteLoading: false,
  favoriteError: null,
  favoriteDeleteError: null,
  favoriteDeletLoading: false,
  bddLoading: false,
  bddError: null,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: FAVORITE_STATE,
  reducers: {
    addFavorites: (state, action) => {
      const favoris = action.payload;

      //elle me retourne le state complete avec le recipe ajouté

      return {
        ...state,
        favorites: favoris,
      };
    },
    addFavorite: (state, action) => {
      const { id_user, id_recipe } = action.payload;

      return {
        ...state,
        favorite: { ...state.favorite, id_user, id_recipe },
      };
    },
    favoriteNumber: (state, action) => {
      const { number } = action.payload;
      console.log("le numero", number);

      return {
        ...state,
        nbrFavorite: { ...state.nbrFavorite, number },
      };
    },

    deleteOne: (state, action) => {
      const { id_user, id_recipe } = action.payload;
      return {
        ...state,
        favorites: state.favorites.filter(
          (t) => t.id_recipe !== id_recipe && t.id_user !== id_user
        ),
      };
    },

    addFavoriteError: (state, action) => {
      return {
        ...state,
        favoriteError: action.payload.error,
        favoriteLoading: false,
      };
    },
    startFavoritetLoading: (state, action) => {
      return { ...state, favoriteLoading: true };
    },
    stopFavoriteLoading: (state, action) => {
      return { ...state, favoriteLoading: false };
    },
    //pour delet
    deletFavoriteError: (state, action) => {
      return {
        ...state,
        favoriteDeleteError: action.payload.error,
        favoriteDeletLoading: false,
      };
    },
    startFavoritetDeleteLoading: (state, action) => {
      return { ...state, favoriteDeletLoading: true };
    },
    stopFavoriteDeletLoading: (state, action) => {
      return { ...state, favoriteDeletLoading: false };
    },
    // pour Bdd
    bddError: (state, action) => {
      return {
        ...state,
        bddError: action.payload.error,
        bddLoading: false,
      };
    },
    startBddLoading: (state, action) => {
      return { ...state, bddLoading: true };
    },
    stopBddLoading: (state, action) => {
      return { ...state, bddLoading: false };
    },
  },
   pushFavoris: (state, action) => {
      const { id_user, id_recipe } = action.payload;

      //elle me retourne le state complete avec le recipe ajouté

      return {
        ...state,
          favorites: [...state.  favorites, { id_user, id_recipe }]
      };
    },
});

export const {
  addFavoriteError,
  startFavoritetLoading,
  stopFavoriteLoading,
  deletFavoriteError,
  startFavoritetDeleteLoading,
  stopFavoriteDeletLoading,
  bddError,
  startBddLoading,
  stopBddLoading,
  addFavorite,
  deleteOne,
  addFavorites,
  favoriteNumber,
   pushFavoris,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
