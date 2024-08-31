import "./allCards.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getImageThunk } from "../../api/image.api";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import Card from "../Card/Card";
import { itemSelected } from "../../redux/reducers/recipe.reducer";

import { addRecipe } from "../../redux/reducers/recipe.reducer";

const AllCards = (props) => {
  let stepsArray = [];
  let ingredientsArray = [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { images } = useSelector((store) => {
    return store.imageState;
  });
  const { bddRecipe } = useSelector((store) => {
    return store.recipeState;
  });

  // quand on clique sur ce button une recherche se lance  dans la table bddRecipe qui represente le select all de la joiture des tableau comme indiqué dans le bac
  //-recherche selon le nom de la recette

  const onClick = (item) => {
    //console.log(images);
    console.log("its me", item);

    //dispatch(itemSelected(item));
    //found-item il a le role de chercher s'l ya une recette avec le non spécifier
    console.log(bddRecipe)
    const foundItem = bddRecipe.filter((recipe) => recipe.title === item);
    //si la recette est trouvé
    if (foundItem.length > 0) {
      // rendre un tableaux des objets ingredients
      const ingredients = foundItem.map((ingredient) => {
        return {
          ingredients: ingredient.ingrdients,
          unit: ingredient.unite,
          quantite: ingredient.quantite,
        };
      });
      // rendre un tableaux des objets steps
      const steps = foundItem.map((step) => {
        return {
          steps: step.steps,
          order: step.ordre,
          time: step.time,
        };
      });

      //comme et acause de la jointure il ya beaux des ingredients qui se repetennt plusieurs fois :: j'ai trouvé cette façon d'utiliser les set de javascript pour eliminer les objets en double

      //ingredients
      const ingredientsUnique = new Set(ingredients.map(JSON.stringify));
      ingredientsArray = Array.from(ingredientsUnique).map(JSON.parse);

      //steps
      const stepsUnique = new Set(steps.map(JSON.stringify));
      const stArray = Array.from(stepsUnique).map(JSON.parse);

      //trier selon l'ordre
      stepsArray = stArray.sort((a, b) => a.order - b.order);
      console.log(stepsArray);

      // modefier l'états avec dispatch
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

      // naviguer ver la route search
      // pour afficher les informations de la recette en question
      navigate(APP_ROUTES.SEARCH, { replace: true });
    } else {
      console.log("Item not found");
    }
  };
  // lors du montage initial du composant  j'appel getImageThunk() , en utilisant dispatch pour récupérer  les informations de l'image
  useEffect(() => {
    dispatch(getImageThunk());
  }, []);
  console.log("image", images);
  //rendu du composant AllCards
  // le tableau images est mappée sur le  composant Card
  return (
    <div className="displayC">
      {images.map((image, i) => {
        return (
          <Card
            key={`${images.recipeId}${image.path}`}
            path={`${APP_ROUTES.URL}${image.path}`}
            alt={image.alt}
            titre={image.titre}
            handelClick={() => {
              onClick(image.titre);
            }}
          />
        );
      })}
    </div>
  );
};

export default AllCards;
