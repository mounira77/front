import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { itemSelected, addRecipe } from "../../redux/reducers/recipe.reducer";
import "./ingredientFilter.scss";
import { ingredients, steps } from "../../utils/serchUtil";
import { APP_ROUTES } from "../../constants/route.const";
import { useNavigate } from "react-router-dom";

import { getIngredientThunk } from "../../api/ingredient.api";
//filtrer selon l'ingredient choisi
const IngredientFilter = (props) => {
  // let stepsArray = [];
  //let ingredientsArray = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ingredientToFilter, bddRecipe } = useSelector(
    (store) => store.recipeState
  );
  console.log("c'estingredient envoyé", ingredientToFilter);

  //si il ya des recette qui contient cet ingredient rtourner la liste des recette sinon retourner un tableau vide
  const filteredRecipes = bddRecipe ?
    bddRecipe.filter((recipe) =>
      recipe.ingrdients.includes(ingredientToFilter)
    ) : [];
  //pour pusher l'objet  recette
  const uniqueRecipes = [];
  //pour pusher le titre uniquement
  const recipeTitle = [];
  //pour elimener les  recette en double a cause de jointure

  filteredRecipes.forEach((recipe) => {
    if (!recipeTitle.includes(recipe.title)) {
      uniqueRecipes.push(recipe);
      recipeTitle.push(recipe.title);
    }
  });

  // quand on clique  sur ce button on recupere la recette avec les ingrédients et les steps
  //le handelcliClick fait appel a deux fonctions
  //1-ingredientsArray ();
  //2-stepsArray
  const handelClick = (item) => {
    // dispatch(itemSelected(item));

    const foundItem = bddRecipe.filter((recipe) => recipe.title === item);
    if (foundItem.length > 0) {
      const ingredientsArray = ingredients(foundItem);
      const stepsArray = steps(foundItem);

      console.log(foundItem[0].desRecipe);
      dispatch(
        addRecipe({
          id_user: foundItem[0].userId,
          id_recipe: foundItem[0].id_recipe,
          title: foundItem[0].title,
          designation: foundItem[0].desRecipe,
          reference: foundItem[0].reference,
          tags: foundItem[0].tags,
          nbr_pieces: foundItem[0].nbrPieces,
          alt: foundItem[0].alt,

          ingredients: ingredientsArray,
          steps: stepsArray,
          id_category: foundItem[0].category,
          // id_user:response.result.recipe.id_user,
          filePath: foundItem[0].nameImage,
          mimeType: null,
          originalName: null,
          size: 0,
          referenceImg: foundItem[0].referenceImg,
        })
      );

      //
      navigate(APP_ROUTES.SEARCH, { replace: true });
    }
    else {
      console.log("Item not found");
    }
  };

  //

  //au montage du composant recupérer la table ingredient
  useEffect(() => {
    dispatch(getIngredientThunk());
  }, []);
  return (
    <div >
      <ul >
        {/* Afficher les recettes filtrées */}
        {recipeTitle.map((recipe, i) => (
          <li className ="filtred"  key={i} onClick={() => handelClick(recipe)}>
            {recipe}
             <span> Cliquez ici</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientFilter;
