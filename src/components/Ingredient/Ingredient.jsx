import Input from "../input/Input";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { insertThunk, deleteThunk, updateThunk } from "../../api/ingredient.api";

import { updateIngredientForm, pushIngredient, updatateUnitForm } from "../../redux/reducers/ingredient.reducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTrashAlt, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { getIngredientThunk } from "../../api/ingredient.api";

const Ingredient = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let existIngredient = null;
  const { ingredientForm, insertLoading, deleteLoading, updateLoading, ingredientArray } =
  useSelector((store) => {
    return store.ingredientState;
  });


  //ajouter ingredient
  const handleSubmit = (e) => {
    if (!ingredientForm.name || !ingredientForm.unit) return
    e.preventDefault();
    dispatch(insertThunk());
    dispatch(pushIngredient({ name: ingredientForm.name, unit: ingredientForm.unit }))
  };
  //supprimer ingrédient
  const onClick = () => {
    if (!ingredientForm.name || !ingredientForm.unit) return
    console.log(typeof(ingredientForm.name))
    const Ingredient = ingredientForm.name.trim();
    dispatch(deleteThunk(ingredientForm.name));
      dispatch(getIngredientThunk());
  };


  //rechercher l'igredient a supprimer ou a modifier
  const searchClick = () => {
    console.log("arrrrrrray", ingredientArray)
    // if (!ingredientForm.name) return
    existIngredient = ingredientArray.find((ingredient) => {
      return ingredient.name.trim() === ingredientForm.name
    });
    if (!existIngredient) return
    dispatch(updatateUnitForm({ unit: existIngredient.unit, id_ingredient: existIngredient.id_ingredient }));
    console.log(ingredientForm.unit)
  }


  //Modifier ingrédient
  const handelUpdateClick = (id_ingredient) => {
    if (!ingredientForm.name || !ingredientForm.unit) return
    if (existIngredient) return


    dispatch(updateThunk(ingredientForm.id_ingredient))
      dispatch(getIngredientThunk());
  };
  const updateForm = (value, inputName) => {

    dispatch(updateIngredientForm({ value, inputName }));
  };


  return (

    <div className="user" > { /* {!!signInError && <p className="error">`{signInError} error`</p>} */ }
    <div className="user-sign">
        <form onSubmit={handleSubmit}>
        <div className="user-ingredient">
          <Input
            id={"name"}
            text={"Nom ingredient"}
            value={ingredientForm.name}
            holder="saisir le nom de l'ingredient"
            onChange={(value) => updateForm(value, "name")}
          />
            <Button className="ingredient-btn" type={"button"}  text={    <FontAwesomeIcon icon={faSearch} onClick={searchClick}  />} />
          </div>

          <Input
            id={"unite"}
            text={"Unité de mésure"}
            value={ingredientForm.unit}
            onChange={(value) => updateForm(value, "unit")}
            holder={"saisir l'unité de mesure"}
          />

          <Button
            type={"submit"}
            text={insertLoading ? "Chargement..." :  <FontAwesomeIcon icon={faCheckCircle} />}
            disabled={insertLoading}
          />
             <Button
          type={"button"}
          text={deleteLoading ? "Chargement..." :  <FontAwesomeIcon icon={faTrashAlt} />}
          disabled={deleteLoading}
          handelClick={onClick}
        />
        <Button
          type={"button"}
          text={updateLoading ? "Chargement..." :    <FontAwesomeIcon icon={faEdit} />}
          disabled={updateLoading}
          handelClick={handelUpdateClick}
        />
        </form>

      </div>
      </div>
  );
};
export default Ingredient;
