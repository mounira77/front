import "./accueill.scss";
import AllCards from "../allCards/AllCards";
import Filter from "../filter/Filter";

const Accueil = (props) => {
  return (
    
      <div className="displayA  container ">
        <div className="displayA-taille ">
          {/* a son tour il appel Card */}
          <AllCards />
        </div>
        <div className="displayA-select">
          {/* a son tour il appel SelectItems et ingredientFilter qui rend la liste des recipes filtrée selon le nom d'ingrédient */}
          <Filter />
        </div>
      </div>
    
  );
};

export default Accueil;
