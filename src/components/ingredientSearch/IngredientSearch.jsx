import { useSelector } from "react-redux";
import "./ingredientSearch.scss";
//afficher les ingredient et les steps
const IngredientSearch = (props) => {
  const { arrayIngredient, arrayStep } = props;
  const { recipe } = useSelector((store) => {
    return store.recipeState;
  });

  return (
    <div className="ingredientSearch">
      <h2>Les ingrédients :</h2>
      <ul>
        {recipe.ingredients.map((ingredient, i) => {
          return (
            <li key={i}>
              {`${
                ingredient.ingredients.charAt(0).toUpperCase() +
                ingredient.ingredients.slice(1)
              }, ${ingredient.quantite}${ingredient.unit}`}
            </li>
          );
        })}
      </ul>
      <h2>Les Etapes :</h2>
      <h2>
        {`le temps de preparation  ${recipe.steps.reduce(
          (acc, obj) => acc + obj.time,
          0
        )} mn`}
      </h2>
      <ul>
        {recipe.steps.map((step, i) => {
          return (
            <li key={i}>{`${step.order}, ${
              step.steps.charAt(0).toUpperCase() + step.steps.slice(1)
            },  ${step.time}mn`}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientSearch;
