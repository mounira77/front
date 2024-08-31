import "./favorite.scss"; // Import des styles SCSS
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoriteThunk, deleteFavoriteThunk } from "../../api/favoris.api";
import { itemSelected, addRecipe } from "../../redux/reducers/recipe.reducer";
import { APP_ROUTES } from "../../constants/route.const";
// Import des actions Redux ou des reducers nécessaires
import { favoriteNumber } from "../../redux/reducers/favoris.reducer";

const Favorite = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let stepsArray = [];
  
  let ingredientsArray = [];
  
  const { favorites, nbrFavorite, favoriteDeletLoading } = useSelector(
    (state) => state.favoriteState
  );
  
  const { user } = useSelector((state) => state.userState);
  const { recipe, bddRecipe } = useSelector((state) => state.recipeState);
  // const deleteClick = () => {
  //   dispatch(deleteFavoriteThunk(recipe.id_recipe, user.userId));
  // };
  const Favorite = {
    id_recipe: recipe.id_recipe,
    id_user: user.userId,
  };
  console.log(favorites);
  // Vérification de l'existnce du favori dans la liste des favoris
  const existFavoris = favorites.filter(
    (favoris) => favoris.id_user === user.userId
  );

  ///////
  const handelClick = (item, e) => {
    //e.stopPropagation();
    //console.log(images);
    console.log("its me", item);

    console.log("cc");
    //dispatch(itemSelected(item));

    const foundItem = bddRecipe.filter((recipe) => recipe.title === item);
    if (foundItem.length > 0) {
      console.log("l,element trouvé", foundItem);

      console.log("Item found:", foundItem);
      // const proprietes = Object.keys(foundItem);
      // console.log(proprietes);
      const ingredients = foundItem.map((ingredient) => {
        return {
          ingredients: ingredient.ingrdients,
          unit: ingredient.unite,
          quantite: ingredient.quantite,
        };
      });
      const steps = foundItem.map((step) => {
        return {
          steps: step.steps,
          order: step.ordre,
          time: step.time,
        };
      });

      // En JavaScript, un ensemble (Set) est une collection de valeurs uniques, ce qui signifie qu'un élément ne peut apparaître qu'une seule fois dans un ensemble.

      // Utilisation d'un ensemble (Set) pour stocker les objets uniques
      const ingredientsUnique = new Set(ingredients.map(JSON.stringify));

      // Convertir l'ensemble en un tableau d'objets uniques
      ingredientsArray = Array.from(ingredientsUnique).map(JSON.parse);

      console.log(ingredientsArray);
      const stepsUnique = new Set(steps.map(JSON.stringify));

      // Convertir l'ensemble en un tableau d'objets uniques
      const stArray = Array.from(stepsUnique).map(JSON.parse);
      //trier selon l'ordre
      stepsArray = stArray.sort((a, b) => a.order - b.order);
      console.log(stepsArray);

      // console.log(ingredients);
      // console.log(bddrecipe);
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

      //
      navigate(APP_ROUTES.SEARCH, { replace: true });
    } else {
      console.log("Item not found");
    }
  };

  useEffect(() => {
    dispatch(getFavoriteThunk());

    console.log(existFavoris);
    console.log(existFavoris.length);
    const number = existFavoris.length;
    dispatch(favoriteNumber({ number: number }));
  }, []);
  
  
  return existFavoris ? (
    <div className="aligner">
      <h2>{`Liste des favoris: ${nbrFavorite.number} favori(s)`}</h2>

      <ul>
        {existFavoris.map((favoris, i) => {
          return (
            <li //
              onClick={() => {
                handelClick(favoris.title);
              }}
              //

              key={i}
            >
              {favoris.title}
              <span> Cliquez ici</span>
              {/* <Button
                type={"button"}
                text={favoriteDeletLoading ? "Chargement..." : "x"}
                disabled={favoriteDeletLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteClick(favoris);
                }}
              /> */}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    // Gérer le cas où pas de fvoris
    <p>Aucun favori trouvé.</p>
  );
};
export default Favorite;
