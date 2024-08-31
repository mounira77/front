import { getRequest, postRequest, deleteRequest } from "./api";
import {
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
  addFavorites,
  deleteOne,
} from "../redux/reducers/favoris.reducer";

//fonction thunk peut dispatcher un action ou lire une state avec getState

export const getFavoriteThunk = () => async (dispatch, getState) => {
  const { bddLoading } = getState().favoriteState;

  if (bddLoading) return;
  dispatch(startBddLoading());
  const { result, status, error } = await getRequest("favorite");
  console.log(result);
  const favoris = result.favorite;
  if (!result?.message || status >= 400 || !!error)
    return dispatch(bddError({ error: `Something goes wrong: ${error}` }));

  dispatch(addFavorites(favoris));
  dispatch(stopBddLoading());
};
//***************************** */
//insertion
export const insertFavoriteThunk = () => async (dispatch, getState) => {
  const { favoriteLoading } = getState().favoriteState;
  const { user } = getState().userState;
  const { recipe } = getState().recipeState;
  const favorite = {
    id_recipe: recipe.id_recipe,
    id_user: user.userId,
  };

  if (favoriteLoading) return;

  dispatch(startFavoritetLoading());

  const { error, result, status } = await postRequest(
    "favorite/create",
    favorite
  );

  if (!result?.message || status >= 400 || !!error)
    return dispatch(
      addFavoriteError({ inserterror: `Something goes wrong: ${error}` })
    );

  dispatch(addFavorite({ id_recipe: recipe.id_recipe, id_user: user.userId }));

  dispatch(stopFavoriteLoading());

  //
};

//delete
export const deleteFavoriteThunk =
  (id_recipe, userId) => async (dispatch, getState) => {
    const { favoriteDeletLoading } = getState().favoriteState;

    if (favoriteDeletLoading) return;

    dispatch(startFavoritetDeleteLoading());

    const { error, result, status } = await deleteRequest("favorite/delete");

    if (!result?.message || status >= 400 || !!error)
      return dispatch(
        deletFavoriteError({ deleteError: `Something goes wrong: ${error}` })
      );

    dispatch(deleteOne({ id_recipe: id_recipe, id_user: userId }));

    dispatch(stopFavoriteDeletLoading());
  };
