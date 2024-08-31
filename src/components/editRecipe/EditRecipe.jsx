import "./editRecipe.scss";
import Input from "../input/Input";
import Button from "../button/Button";
import Back from "../back/Back"
import { useDispatch, useSelector } from "react-redux";

import { updateRecipesForm } from "../../redux/reducers/recipe.reducer";

import { updateRecipeThunk } from "../../api/recipe.api";
import { useEffect } from "react";

import {
  getRecipeThunk,
}
from "../../api/recipe.api";

const EditRecipe = (props) => {
  const dispatch = useDispatch();


  const { recipe, updateFormRecipes, updateRecipeLoading } = useSelector(
    (store) => {
      return store.recipeState;
    }
  );
  console.log(recipe);
  const updateForm = (value, inputName) => {
    dispatch(updateRecipesForm({ value, inputName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateRecipeThunk());
    dispatch(getRecipeThunk());
  };

  useEffect(() => {
      dispatch(getRecipeThunk());


    },

    []);
  return (
    <div>
   <Back />
      <form onSubmit={handleSubmit}>
        <div div className="displayR container ">
          <div className="displayR-taille">
            <Input
              id={"titre"}
              text={"Titre de la recette"}
              value={updateFormRecipes.title}
              holder="Saisir le titre de la recette"
              onChange={(value) => updateForm(value, "title")}
            />

            <Input
              id={"designation"}
              text={"Designation"}
              value={updateFormRecipes.designation}
              holder={"Saisir la designation de la recette"}
              onChange={(value) => updateForm(value, "designation")}
            />

            <Input
              id={"reference"}
              text={"Réference"}
              value={updateFormRecipes.reference}
              holder={"Saisir la reference de la recette"}
              onChange={(value) => updateForm(value, "reference")}
            />
            <Input
              id={"tags"}
              text={"Tags"}
              value={updateFormRecipes.tags}
              holder={"Saisir les tags"}
              onChange={(value) => updateForm(value, "tags")}
            />
            <Input
              id={"nbrPieces"}
              type={"number"}
              text={"Nombre de piece par kilorgamme"}
              value={updateFormRecipes.nbr_pieces}
              holder={"Saisir le nombre de pieces"}
              onChange={(value) => updateForm(value, "nbr_pieces")}
            />
          </div>
        </div>
        <Button
          type={"submit"}
          text={updateRecipeLoading ? "Chargement..." : "Editer"}
          disabled={updateRecipeLoading}
        />
      </form>
    </div>
  );
};
export default EditRecipe;
