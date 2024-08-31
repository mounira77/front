import "./editIngredient.scss";
import Input from "../input/Input";
import Button from "../button/Button";
import Back from "../back/Back"
import { useDispatch, useSelector } from "react-redux";

import {
  updateRecipesIngredientForm,
  fillRecipesIngredientForm,
  updateIngredient,
}
from "../../redux/reducers/recipe.reducer";

import { updateIngredientRecipeThunk } from "../../api/recipe.api";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIngredientThunk } from "../../api/ingredient.api";


//debut de composant
const EditIngredientRecipe = (props) => {
  // let quantite = null;
  const dispatch = useDispatch();

  const { idIngr } = useParams();
  console.log(idIngr);
  const { recipe, updateFormRecipesIngredient, updateRecipeIngredientLoading } =
  useSelector((store) => {
    return store.recipeState;
  });
  console.log(recipe);
  const updateForm = (value, inputName) => {
    dispatch(updateRecipesIngredientForm({ value, inputName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("bonjour");
    dispatch(updateIngredientRecipeThunk());
    // dispatch(updateIngredient(quantite, idIngr, recipe.id_recipe));
    dispatch(getIngredientThunk())
  };
  console.log(recipe.ingredients);
  useEffect(() => {
    const existIngredient = recipe.ingredients.find((ing, i) => {
      return (
        ing.idIngr === parseInt(idIngr) && ing.id_recipe === recipe.id_recipe
      );
    });
    // quantite = existIngredient.quantite;
    console.log(existIngredient.quantite);
    if (existIngredient) {
      dispatch(
        fillRecipesIngredientForm({
          id_recipe: existIngredient.id_recipe,
          id_ingredient: existIngredient.idIngr,

          quantite: existIngredient.quantite,
        })
      );
    }
  }, []);

  //pour charger les modifications  

  return (
    <div className="user">
      <div className="user-sign">
    <Back />
      <form onSubmit={handleSubmit}>
        <div div className="displayR container ">
          <div className="displayR-taille">
            <Input
              id={"quantite"}
              type={"number"}
              text={"Quantité"}
              value={updateFormRecipesIngredient.quantite}
              holder={"Saisir le nombre la quantité"}
              onChange={(value) => updateForm(value, "quantite")}
            />
          </div>
        </div>
        <Button
          type={"submit"}
          text={updateRecipeIngredientLoading ? "Chargement..." : "Editer"}
          disabled={updateRecipeIngredientLoading}
        />
      </form>
      </div>
    </div>
  );
};
export default EditIngredientRecipe;
