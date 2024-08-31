import "./header.scss";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import Favoris from "../favoris/Favoris";
import Search from "../search/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { APP_ROUTES } from "../../constants/route.const";
import { ingredients, steps } from "../../utils/serchUtil";
import { getRecipeThunk } from "../../api/recipe.api";
import {
  updateSearchForm,
  addRecipe,
}
from "../../redux/reducers/recipe.reducer";


// comme la zone de recherche est dans le header
//j'ai recuperé  la liste des ingredients et steps qui sont associe a la recette recherche
//je suis passé par le filtre de la base de donnée recupére par le thunk
//j'ai utilisé (Set) pour stocker les objets uniques qui sont repéte a cause de jointure

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bddRecipe, searchForm } = useSelector((store) => {
    return store.recipeState;
  });






  // naviguer vers la page favorite
  const onClickFavoris = () => {
    navigate(APP_ROUTES.FAVORITE, { replace: true });
  };

  //chercher le rceipe 
  const onClickSearch = (e) => {
    e.preventDefault();
    if (!searchForm.chercher) return;

    // recuperer l'objet depuis la table users qui continet tous les utilisateurs
    const foundItem = bddRecipe.filter(
      (recipe) => recipe.title.trim() === searchForm.chercher
    );
    // si ok  recuperer la tables des ingrédients et steps et changer current state
    if (foundItem) {
      const ingredientsArray = ingredients(foundItem);
      const stepsArray = steps(foundItem);
      console.log("errur", foundItem)

      console.log("c'est moi ffound item", foundItem, searchForm.chercher);
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

      navigate(APP_ROUTES.SEARCH, { replace: true });
    }
    else {
      console.log("Item not found");
    }
  };

  //quand vous cliquer sur le logo naviguer vers la page d'accueil
  const logoClick = () => {
    navigate(APP_ROUTES.ACCUEIL, { replace: true });
  };

  const updateForm = (value, inputName) => {
    dispatch(updateSearchForm({ value, inputName }));
  };

  // naviguer vers la page sign-in
  const onClickCompte = () => {
    // e.preventDefault();

    navigate(APP_ROUTES.SIGN_IN, { replace: true });
  };
  //au montage recuperer toutes les recettes
  useEffect(() => {
    dispatch(getRecipeThunk());
    console.log("recipe recupere depuis le back", bddRecipe);
  }, []);

  return (

    <div className="header">
    <div className="header-position">

      </div >
        <div className="container header-flex">
          <div>
            <img
              src={logo}
              alt=" photo logo"
              title="logo oriental sweets"
              onClick={logoClick}
            />
          </div  >
         < div className="header-hidden">
          <Search
            id={"chercher"}
            value={searchForm.chercher}
            holder={"Saisir le nom de la recette"}
            onChange={(value) => updateForm(value, "chercher")}
            className="header__display"
            handleSubmit={onClickSearch}
          />
          </div>

          <Favoris
            handelUserName={onClickCompte}
            handelFavoris={onClickFavoris}
          />
        </div> <
    /div> 
  );
};

export default Header;
