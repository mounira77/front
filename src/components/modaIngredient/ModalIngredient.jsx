import "./modalIngredient.scss";
import Button from "../button/Button";
import Input from "../input/Input";
import SelectItems from "../selectItems/SelectItems";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientThunk } from "../../api/ingredient.api";

import {
  addIngredient,
  updateingredientForm,
  setModalIngredient,
}
from "../../redux/reducers/recipe.reducer";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ModalIngredient = (props) => {
    let valueIngredient = 0;
    let nameIngredient = "";
    let valueGroupe = "";

    const options = [
      { value: "La pate", label: "La pate" },
      { value: "la farce", label: "la farce" },
      { value: "vanillaLe glaçage", label: "Le glaçage" },
      { value: "Ingrédient", label: "Ingrédient" },
      { value: "Le sirop", label: "Le sirops" },
    ];
    const dispatch = useDispatch();

    const { ingredientForm, ingredientModal, ingredients } = useSelector(
      (store) => {
        return store.recipeState;
      }
    );
    const { ingredientArray } = useSelector((store) => {
      return store.ingredientState;
    });

    const toogleModal = () => {
      dispatch(setModalIngredient());
    };

    //quand je clique sur le button ajouter:
    // modifier la propriete ingredient du state
    const toogleModalClose = () => {
      //chercher si l'ingredient est déja ajouté

      if (
        ingredients.filter(
          (item) =>
          item.id_ingredient === ingredientForm.id_ingredient &&
          item.groupe === ingredientForm.groupe
        ).length > 0
      )
        return;

      dispatch(
        addIngredient({
          // id_recipe: ingredientForm.id_recipe,
          name_ingredient: ingredientForm.name_ingredient,
          id_ingredient: ingredientForm.id_ingredient,
          quantite: parseInt(ingredientForm.quantite),
          groupe: ingredientForm.groupe,
        })
      );
      // modifier a false ingredientModal
      dispatch(setModalIngredient());
    };
    // modifier le contenu de ingredientForm
    const updateForm = (value, inputName) => {
      dispatch(updateingredientForm({ value, inputName }));
    };
    const onClickClose = (e) => {
      e.preventDefault();
      dispatch(setModalIngredient());
    };
    useEffect(() => {
      dispatch(getIngredientThunk());
    }, []);
    return (
        <div >
    <Button
        type={"button"}
        handelClick={toogleModal}
        text={<FontAwesomeIcon icon={faPlus} /> 
    }
    
    className = "btn_modal" /
    > {
      ingredientModal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <a href="#" className="close" onClick={onClickClose}>
                ×
              </a>
              <h1>Ajouter un ingrédient </h1>
              <SelectItems
                text={"Ingrédient"}
                label={"Selectionner les ingredients de la recette"}
                options={ingredientArray.map((ing) => {
                  return { value: ing.id_ingredient, label: ing.name };
                })}
                onChange={(selectedOption) => {
                  valueIngredient = selectedOption.value;
                  nameIngredient = selectedOption.label;
                  console.log(nameIngredient);

                  updateForm(valueIngredient, "id_ingredient");
                  updateForm(nameIngredient, "name_ingredient");
                }}
              />
              
              <SelectItems
                text={"Groupe"}
                label={"Selectionner le groupe des ingredients"}
                options={options}
                onChange={(selectedOption) => {
                  valueGroupe = selectedOption.value;
                  console.log(valueGroupe);

                  updateForm(valueGroupe, "groupe");
                }}
              />
              
              <Input
                id={"Quantite"}
                type={"number"}
                text={"Quantité"}
                value={ingredientForm.quantite}
                holder={"Saisir la quantité"}
                onChange={(value) => updateForm(value, "quantite")}
              />
              <Button
                className="close-modal"
                type={"button"}
                handelClick={toogleModalClose}
                text={"Ajouter"}
              />
            </div>
          </div>
        </div>
      )
    } <
    /div>
  );
};

export default ModalIngredient;
