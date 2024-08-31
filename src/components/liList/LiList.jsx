import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./liList.scss";
//afficher les ingredient en saisant
const LiListIngredient = (props) => {
  const { array } = props;
  const { ingredientArray } = useSelector((store) => {
    return store.ingredientState;
  });

  //console.log(ingredientArray);
  const { ingredientForm } = useSelector((store) => {
    return store.recipeState;
  });
  const unit = ingredientArray.find(
    (ing) => ing.id_ingredient === ingredientForm.id_ingredient
  );

  useEffect(() => {});
  return (
    <div>
      <h2>Les ingrédients :</h2>
      <ul>
        {array.map((ingredient, i) => {
          return (
            <li
              key={`${ingredient.groupe}${ingredient.id_ingredient}
`}
            >
              {`${ingredient.id_ingredient},${
                ingredient.name_ingredient.charAt(0).toUpperCase() +
                ingredient.name_ingredient.slice(1)
              }, ${ingredient.quantite}${unit.unit},${ingredient.groupe}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LiListIngredient;
