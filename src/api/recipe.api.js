import {
  addRecipe,
  startRecipeLoading,
  setRecipeError,
  stopRecipeLoading,
  addBddRecipe,
  deleteError,
  stopdeleteLoading,
  startdeletetLoading,
  deleteOne,
  startGetRecipeLoading,
  stopGetRecipeLoading,
  setGetRecipeError,
  startUpdateRecipeLoading,
  stopUpdateRecipeLoading,
  updateSetRecipeError,
  startUpdateRecipeStepLoading,
  stopUpdateRecipeStepLoading,
  updateSetRecipeStepError,
  startUpdateRecipeIngredientLoading,
  stopUpdateRecipeIngredientLoading,
  updateSetRecipeIngredientError,
} from "../redux/reducers/recipe.reducer";
import { postRequest, getRequest, deleteRequest, updateRequest } from "./api";

//fonction thunk peut dispatcher un action ou lire une state avec getState

const buildFormData = (form) => {
  const fd = new FormData();
  const keys = Object.keys(form);

  for (let key of keys) {
    const value = form[key];
    fd.append(key, value);
  }

  return fd;
};

//**************************************Insert*********************************** */

export const addRecipeThunk = (file) => async (dispatch, getState) => {
  const { recipeForm, recipeLoading, steps, ingredients } =
    getState().recipeState;
  if (recipeLoading) return;

  dispatch(startRecipeLoading());
  const recipeInsert = {
    title: recipeForm.title,
    designation: recipeForm.designation,
    tags: recipeForm.tags,
    nbr_pieces: parseInt(recipeForm.nbrPieces),
    id_category: recipeForm.category,
    //id_user: parseInt(recipeForm.user),
    referenceImg: recipeForm.referenceImg,
    reference: recipeForm.reference,
    //ingredients: ingredients,
    alt: recipeForm.alt,
    ingredients: JSON.stringify(ingredients),
    steps: JSON.stringify(steps),
  };

  const fd = buildFormData({
    ...recipeInsert,
    recipeImg: file,
  });

  //title, designation, tags, nbr_pieces, id_category, id_user, url_recip, reference

  const response = await postRequest("recipe/create", fd);
  // console.log(typeof (response.result.recipe.nbr_Pieces),"type")
  console.log("response.result.file.filepath");
  console.log(response);

  dispatch(
    addRecipe({
      title: response.result.recipe.id_user,
      title: response.result.recipe.id_recipe,
      title: response.result.recipe.title,
      designation: response.result.recipe.designation,
      reference: response.result.recipe.reference,
      tags: response.result.recipe.tags,
      nbr_pieces: response.result.recipe.nbr_pieces,

      ingredients: response.result.recipe.ingredients,
      steps: response.result.recipe.steps,
      id_category: response.result.recipe.id_category,
      // id_user:response.result.recipe.id_user,
      filePath: response.result.file.filePath,
      mimeType: response.result.file.mimeType,
      originalName: response.result.file.originalName,
      size: response.result.file.size,
      referenceImg: response.result.recipe.referenceImg,
    })
  );

  dispatch(stopRecipeLoading());
};

//******************************Select ALL******************************** */
export const getRecipeThunk = () => async (dispatch, getState) => {
  const { recipeGetloading } = getState().recipeState;
  if (recipeGetloading) return;

  dispatch(startGetRecipeLoading());
  const { result, status, error } = await getRequest("recipe");

  console.log("le resultat de la recherche", result);
  const rec = result.recipe;

  console.log(rec);

  if (!result?.message || status >= 400 || !!error)
    return dispatch(
      setGetRecipeError({ error: `Something goes wrong: ${error}` })
    );

  console.log("bonjooooooooor");

  dispatch(addBddRecipe(rec));
  dispatch(stopGetRecipeLoading());
};
//************************************Delete************************************//

export const deleteThunk = (recipeId) => async (dispatch, getState) => {
  const { deleteLoading, ingredientForm } = getState().ingredientState;

  if (deleteLoading) return;

  dispatch(startdeletetLoading());

  const { error, result, status } = await deleteRequest(`recipe/${recipeId}`);

  if (!result?.message || status >= 400 || !!error)
    return dispatch(deleteError({ error: `Something goes wrong: ${error}` }));

  dispatch(deleteOne({ recipeId: recipeId }));

  dispatch(stopdeleteLoading());
};

//update recipe
export const updateRecipeThunk = () => async (dispatch, getState) => {
  const { updateRecipeLoading, recipe, updateFormRecipes } =
    getState().recipeState;

  console.log("le contenu de la forme", updateFormRecipes);
  const recipes = {
    title: updateFormRecipes.title,
    designation: updateFormRecipes.designation,
    tags: updateFormRecipes.tags,
    nbr_pieces: updateFormRecipes.nbr_pieces,
    reference: updateFormRecipes.reference,
    recipeId: recipe.id_recipe,
  };

  if (updateRecipeLoading) return;

  dispatch(startUpdateRecipeLoading());

  const { result, status, error } = await updateRequest(
    "recipe/update",
    recipes
  );
  console.log(result);
  if (!result?.message || status >= 400 || !!error)
    return dispatch(
      updateSetRecipeError({ error: `Something goes wrong: ${error}` })
    );

  // dispatch(deleteOne( {recipeId:recipeId}));

  dispatch(stopUpdateRecipeLoading());
};
////****************************update step rceipe */
export const updateStepRecipeThunk = () => async (dispatch, getState) => {
  const { updateRecipeStepLoading, recipe, updateFormRecipesStep } =
    getState().recipeState;

  console.log("le contenu de la forme", updateFormRecipesStep);
  const steps = {
    id_step: updateFormRecipesStep.id_step,

    designation: updateFormRecipesStep.designation,
    time: updateFormRecipesStep.time,
    id_recipe: recipe.id_recipe,
  };

  if (updateRecipeStepLoading) return;

  dispatch(startUpdateRecipeStepLoading());

  const { result, status, error } = await updateRequest(
    "recipe/updateStep",
    steps
  );
  console.log(result);
  if (!result?.message || status >= 400 || !!error)
    return dispatch(
      updateSetRecipeStepError({ error: `Something goes wrong: ${error}` })
    );

  // dispatch(deleteOne( {recipeId:recipeId}));

  dispatch(stopUpdateRecipeStepLoading());
};
///***********************update ingredient recipe */

export const updateIngredientRecipeThunk = () => async (dispatch, getState) => {
  const { updateRecipeIngredientLoading, recipe, updateFormRecipesIngredient } =
    getState().recipeState;

  console.log("le contenu de la forme", updateFormRecipesIngredient);
  const ingredients = {
    quantite: updateFormRecipesIngredient.quantite,

    id_ingredient: updateFormRecipesIngredient.id_ingredient,
    id_recipe: recipe.id_recipe,
  };

  console.log("le formulaire envoyé", ingredients);

  if (updateRecipeIngredientLoading) return;

  dispatch(startUpdateRecipeIngredientLoading());

  const { result, status, error } = await updateRequest(
    "recipe/updateIngredient",
    ingredients
  );
  console.log(result);
  if (!result?.message || status >= 400 || !!error)
    return dispatch(
      updateSetRecipeIngredientError({
        error: `Something goes wrong: ${error}`,
      })
    );

  // dispatch(deleteOne( {recipeId:recipeId}));

  dispatch(stopUpdateRecipeIngredientLoading());
};
