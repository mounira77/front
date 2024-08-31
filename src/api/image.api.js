import {
  setImage,
  addError,
  startLoading,
  stopLoading,
} from "../redux/reducers/image.reducer";
import { getRequest } from "./api";

//fonction thunk peut dispatcher un action ou lire une state avec getState

export const getImageThunk = () => async (dispatch, getState) => {
  // const { images } = getState().imageState;

  dispatch(startLoading());
  const response = await getRequest("uploads");

  console.log("reponse", response);
  const imageRecipe = response.result.image;

  if (!response.result?.message || response.status >= 400 || !!response.error)
    return dispatch(addError({ error: `Something goes wrong: ${error}` }));

  dispatch(setImage(imageRecipe));

  dispatch(stopLoading());
};
