import React, { useEffect } from "react";
import "./filter.scss";
import { useDispatch, useSelector } from "react-redux";
import SelectItems from "../selectItems/SelectItems";
import { addIngredientTofilter } from "../../redux/reducers/recipe.reducer";

import { getIngredientThunk } from "../../api/ingredient.api";
import IngredientFilter from "../ingredientFilter/IngredientFilter";
//affiche touts les ingredient dans le selecteur puis affiche les recette qui contient l'ingredient choisi par le selecteur
const Filter = (props) => {
  const dispatch = useDispatch();
  const { ingredientArray } = useSelector((store) => store.ingredientState);

  const handleIngredientChange = (selectedOption) => {
    const valueIngredient = selectedOption.value;
    const nameIngredient = selectedOption.label;
    console.log(nameIngredient);
    // dispatcher le nom d'ingredient a filtrer
    dispatch(addIngredientTofilter({ ingredientToFilter: nameIngredient }));
  };

  return (
    <div>
      <SelectItems
        text={"Ingrédient"}
        label={"Filtrer"}
        options={ingredientArray.map((ing) => ({
          value: ing.id_ingredient,
          label: ing.name,
        }))}
        onChange={handleIngredientChange}
      />
      {/* pour afficher les nom des recette qui contient le l'ingrédient recherché */}
      <IngredientFilter  />
    </div>
  );
};

export default Filter;
