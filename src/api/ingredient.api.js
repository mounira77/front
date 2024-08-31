import { getRequest, postRequest, deleteRequest, updateRequest } from "./api";
import {
  addIngredient,
  addError,
  startLoading,
  stopLoading,
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
}
from "../redux/reducers/ingredient.reducer";

//fonction thunk peut dispatcher un action ou lire une state avec getState

export const getIngredientThunk = () => async(dispatch, getState) => {
  const { ingredientArray } = getState().ingredientState;

  dispatch(startLoading());
  const { result, status, error } = await getRequest("ingredient");

  console.log(result);
  const ingred = result.ingredient;

  if (!result || status >= 400 || !!error)
    return dispatch(addError({ error: `Something goes wrong: ${error}` }));

  dispatch(addIngredient(ingred));
  dispatch(stopLoading());
};
//***************************** */
//insertion
export const insertThunk = () => async(dispatch, getState) => {
  const { insertLoading, ingredientForm } = getState().ingredientState;

  if (insertLoading) return;

  console.log(ingredientForm);

  dispatch(starinserttLoading());

  const { error, result, status } = await postRequest(
    "ingredient/insert",
    ingredientForm
  );

  if (!result || status >= 400 || !!error)
    return dispatch(
      insertError({ inserterror: `Something goes wrong: ${error}` })
    );

  dispatch(
    insertIngredient({
      unit: ingredientForm.unit,
      name: ingredientForm.name,
    })
  );
  //dispatch(insertIngredient( {unit:ingredientForm.unit,name:ingredientForm.name}));
  dispatch(stopinsertLoading());

  //
};
//delete
export const deleteThunk = (name) => async(dispatch, getState) => {
  const { deleteLoading, ingredientForm } = getState().ingredientState;

  if (deleteLoading) return;

  dispatch(stardeletetLoading());

  const { error, result, status } = await deleteRequest(
    `ingredient/delete/${name}`
  );

  if (!result || status >= 400 || !!error)
    return dispatch(
      deletetError({ deleteError: `Something goes wrong: ${error}` })
    );

  //dispatch
  dispatch(stopdeleteLoading());

  //
};

//modifier
export const updateThunk = (id) => async(dispatch, getState) => {
  const { updateLoading, ingredientForm } = getState().ingredientState;

  if (updateLoading) return;

  dispatch(starUpdateLoading());

  const { error, result, status } = await updateRequest("ingredient/update", { unit: ingredientForm.unit, name: ingredientForm.name, id_ingredient: ingredientForm.id_ingredient });

  if (!result || status >= 400 || !!error)
    return dispatch(
      updateError({ deleteError: `Something goes wrong: ${error}` })
    );

  //dispatch
  dispatch(stopUpdateLoading());

  //
};
