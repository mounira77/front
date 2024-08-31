import "./updateRecipe.scss";
import Input from "../input/Input";
import Button from "../button/Button";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import { ingredients, steps } from "../../utils/serchUtil";
import {
  updateSignSearch,
  addRecipe,
  fillRecipesForm,
}
from "../../redux/reducers/recipe.reducer";

import { deleteThunk } from "../../api/recipe.api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { useEffect } from "react";
import {
  getRecipeThunk,
}
from "../../api/recipe.api";

//******************* */
// debut du composant
//***************** */
const UpdateRecipe = (props) => {
    let stepsArray = [];
    let ingredientsArray = [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { signSearch, recipe, bddRecipe } = useSelector((store) => {
      return store.recipeState;
    });
    const updateForm = (value, inputName) => {
      dispatch(updateSignSearch({ value, inputName }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!signSearch.title) return;
      console.log(signSearch.title);
      const foundItem = bddRecipe.filter(
        (recipe) => recipe.title === signSearch.title
      );
      if (foundItem.length === 0) return;
      const ingredientsArray = ingredients(foundItem);
      console.log(ingredientsArray);
      const stepsArray = steps(foundItem);
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

      //
    };

    const editRecipeClick = () => {
      console.log("l'etat de la recette", recipe);
      dispatch(
        fillRecipesForm({
          title: recipe.title,
          designation: recipe.designation,
          reference: recipe.reference,
          tags: recipe.tags,
          nbr_pieces: recipe.nbr_pieces,
          id_recipe: recipe.id_recipe,
        })
      );

      navigate(APP_ROUTES.EDITRECIPE, { replace: true });
    };

    //supprimer une recette
    const supprimerRecipeClick = () => {
      if (!recipe.id_recipe) return
      dispatch(deleteThunk(recipe.id_recipe));
      window.alert("recipe supprimée");
      dispatch(
        addRecipe({
          id_user: null,
          id_recipe: null,
          title: null,
          designation: null,
          reference: null,
          tags: null,
          nbr_pieces: null,
          alt: null,

          ingredients: [],
          steps: [],
          id_category: null,
          // id_user:response.result.recipe.id_user,
          filePath: null,
          mimeType: null,
          originalName: null,
          size: 0,
          referenceImg: null,
        })
      );

    };

    //useEffect périodique pour vérifier les mises à jour toutes les 5 secondes

    return (



        <div className = "container" >
    <div>
          <form onSubmit={handleSubmit}  className="displayUpdate">
            <Input
              id={"chercher"}
              text={"Chercher"}
              value={signSearch.title}
              onChange={(value) => updateForm(value, "title")}
              holder={"Saisir le nom de la recette"}
            />

            <Button type={"submit"} text={    <FontAwesomeIcon icon={faSearch} />} />
          </form>
        </div> <
    div >
    <table className="table ">
            <caption>Tableau Recette</caption>
            <thead>
              <tr>
                <th>IdRecipe</th>
                <th>Title</th>
                <th>Designation</th>
                <th>Reference</th>
                <th>Tags</th>
                <th>Nbr_pieces</th>
                <th>RefImg</th>
                <th>Alt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{recipe.id_recipe}</td>
                <td>{recipe.title}</td>
                <td>{recipe.designation}</td>
                <td>{recipe.reference}</td>
                <td>{recipe.tags}</td>
                <td>{recipe.nbr_pieces}</td>
                <td>{recipe.referenceImg}</td>
                <td>{recipe.alt}</td>
                <td>
                  <Button text={ <FontAwesomeIcon icon={faEdit} />} handelClick={editRecipeClick} />
                </td>
              </tr>
            </tbody>
          </table> <
    /div> <
    div >
    <table className="table">
            <caption>Tableau des ingrédients</caption>
            <thead>
              <tr>
                <th>IdRecipe</th>
                <th>IdIngredient</th>
                <th>Ingredient</th>
                <th>Quantité</th>
                <th>Unité</th>
              </tr>
            </thead>
            <tbody>
              {recipe.ingredients.map((ing, i) => {
                return (
                  <tr key={i}>
                    <td>{ing.id_recipe}</td>
                    <td>{ing.idIngr}</td>
                    <td>{ing.ingredients}</td>
                    <td>{ing.quantite}</td>
                    <td>{ing.unit}</td>
                    <td>
                      <Link
                        className="link"
                        to={`${APP_ROUTES.EDITINGREDIENT}/${ing.idIngr}`}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> <
    /div>

    <
    div >
    <table className="table">
            <caption>Tableau des étapes</caption>
            <thead>
              <tr>
                <th>IdRecipe</th>
                <th>IdStep</th>
                <th>Order</th>
                <th>Etape</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recipe.steps.map((step, i) => {
                return (
                  <tr key={i}>
                    <td>{step.id_recipe}</td>
                    <td>{step.idStep}</td>
                    <td>{step.order}</td>
                    <td>{step.steps}</td>
                    <td>{step.time}</td>
                    <td>
                      <Link
                        className="link"
                        to={`${APP_ROUTES.EDITSTEP}/${step.idStep}`}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> <
    /div> 
    <
    Button text = { <FontAwesomeIcon icon={faTrash} />} handelClick = { supprimerRecipeClick }
    /> 
    < / div > 
 
  );
};
export default UpdateRecipe;
