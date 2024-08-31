import "./recipe.scss";
import Input from "../input/Input";
import Button from "../button/Button";
import SelectItems from "../selectItems/SelectItems";
import { getCategoryThunk } from "../../api/category.api";
import { getIngredientThunk } from "../../api/ingredient.api";
import { useDispatch, useSelector } from "react-redux";
import { getImageThunk } from "../../api/image.api";

import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import LiListStep from "../liListStep/LiListStep";
import LiListIngredient from "../liList/LiList";

import ModalIngredient from "../modaIngredient/ModalIngredient";
import {
  updateRecipeForm,
  addIngredient,
  setErrorr
}
from "../../redux/reducers/recipe.reducer";
import Modal from "../modal/Modal";
import {
  addRecipeThunk,
  getRecipeThunk,
  deleteThunk,
}
from "../../api/recipe.api";

import { useEffect, useState } from "react";
import { getFromStorage } from "../../utils/storage.utils";

//******************* */
// debut du composant
//***************** */
const RecipeForm = (props) => {
  let valueCategory = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { ingredientsRecipe } = useSelector((store) => {
  //   return store.ingredientState;
  // });

  const [file, setFile] = useState(null);

  const { recipeForm, recipeLoading, recipe, ingredients, steps, errorForm, recipeError } = useSelector(
    (store) => {
      return store.recipeState;
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recipeForm.title ||
      !recipeForm.designation ||
      !recipeForm.reference ||
      !recipeForm.tags ||
      !recipeForm.nbrPieces ||
      !recipeForm.category ||

      !recipeForm.referenceImg ||
      !recipeForm.alt ||
      !ingredients ||
      !steps) {
      dispatch(setErrorr({ error: "Verefiez vos informations" }));
      console.log("bonj");
      console.log("error", errorForm);
      return;
    }
    // dispatch(deleteThunk(329));
    dispatch(addRecipeThunk(file));
    // navigate(APP_ROUTES.CARD, { replace: true });
  };

  const updateForm = (value, inputName) => {
    dispatch(updateRecipeForm({ value, inputName }));
  };
  //recuperer state category de categryreducer pour l'afficher ds le selecteur
  const { categoryArray, error } = useSelector((store) => {
    return store.categoryState;
  });

  useEffect(() => {
    dispatch(getCategoryThunk());
  }, []);
  

  return (
    <div > {!! recipeError && <p style={{ color: "#f40b88" }}>{ recipeError}</p> }
    <form onSubmit = { handleSubmit } >
    <div className="displayR container ">
          <div className="displayR-taille">
            <Input
              id={"titre"}
              text={"Titre de la recette"}
              value={recipeForm.title}
              holder="Saisir le titre de la recette"
              onChange={(value) => updateForm(value, "title")}
            />
            <SelectItems
              text={"Categorie"}
              label={"selectionner la categorie de recette"}
              options={categoryArray.map((cat) => {
                return {
                  value: cat.id_category,
                  label: cat.name,
                  key: cat.id_category,
                };
              })}
              onChange={(selectedOption) => {
                valueCategory = selectedOption.value;

                updateForm(valueCategory, "category");
              }}
            />
            <Input
              id={"designation"}
              text={"Designation"}
              value={recipeForm.designation}
              holder={"Saisir la designation de la recette"}
              onChange={(value) => updateForm(value, "designation")}
            />

            <Input
              id={"reference"}
              text={"Réference"}
              value={recipeForm.reference}
              holder={"Saisir la reference de la recette"}
              onChange={(value) => updateForm(value, "reference")}
            />
            <Input
              id={"tags"}
              text={"Tags"}
              value={recipeForm.tags}
              holder={"Saisir les tags"}
              onChange={(value) => updateForm(value, "tags")}
            />
            <Input
              id={"nbrPieces"}
              type={"number"}
              text={"Nombre de piece par kilorgamme"}
              value={recipeForm.nbrPieces}
              holder={"Saisir le nombre de pieces"}
              onChange={(value) => updateForm(value, "nbrPieces")}
            />

            <Input
              id={"referenceImg"}
              text={"ReferenceImg"}
              value={recipeForm.referenceImg}
              holder={"Saisir la référence d'image"}
              onChange={(value) => updateForm(value, "referenceImg")}
            />
            <Input
              id={"alt"}
              text={"alt"}
              value={recipeForm.alt}
              holder={"Saisir la designation de la recette"}
              onChange={(value) => updateForm(value, "alt")}
            />
            {/* <Input
          id={"user"}
          text={"user"}
          type={"number"}
          value={recipeForm.user}
          holder={"user"}
          onChange={(value) => updateForm(value, "user")}
        /> */}

            <input
              label
              style={{ display: "block", margin: "2rem" }}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="displayR-taille">
          
            <LiListIngredient array={ingredients} />
              <ModalIngredient />
            
            <LiListStep array={steps} />
             <Modal />
            
          </div>
        </div> {!!errorForm && <p style={{ color: "#f40b88" }}>{ errorForm}</p> } <
    Button type = { "submit" } text = { recipeLoading ? "Chargement..." : "Valider" } disabled = { recipeLoading } color = { "var(--gris)" }
    /> < /
    form > 
    </div>

  );
};
export default RecipeForm;
