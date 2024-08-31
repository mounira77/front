import { useSelector } from "react-redux";
import Display from "../display/Display";
import { useEffect } from "react";
// composant qui fait appel au composant display pour l'affichage
const DisplayRecipe = (props) => {
  const url = "http://mounirahammoudi.sites.3wa.io:9001/uploads/";

  const { recipe } = useSelector((store) => {
    return store.recipeState;
  });
  useEffect(() => {

  });
  return (

    <Display
        title={recipe.title}
        designation={recipe.designation}
        reference={recipe.reference}
        tags={recipe.tags}
        nbr_pieces={recipe.nbr_pieces}
        ingredients={recipe.ingredients}
        steps={recipe.steps}
        id_category={recipe.id_category}
        id_user={recipe.id_user}
        filePath={recipe.filePath}
        src={recipe.filePath}
        mimeType={recipe.mimeType}
        originalName={recipe.originalName}
        size={recipe.size}
        referenceImg={recipe.referenceImg}
        url={`${url}${recipe.filePath}`}
      />

  );
};

export default DisplayRecipe;
