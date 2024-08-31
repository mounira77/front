import "./nav.scss";
import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";

const Nav = (props) => {
  const checkIsactive = ({ isActive }) => {
    return {
      display: "block",
      //margin: "1rem 0",
      color: isActive ? "gray" : "",
    };
  };

  return (

    <nav className=" container">
    
      <ul className="menu" >
      <div>
          <li>Catégorie
        <ul> 
              <li>
               Ajouter
               </li>
              <li>
             Modifier
             </li>
              <li>
             Supprimer
             </li>
        </ul>
          </li>
        </div>
        <div>
          
          <li>Messages
          <ul>
            <li>
           <NavLink style={checkIsactive} to={APP_ROUTES.MESSAGE}>
              Message
              </NavLink>
            </li>
            </ul>
          </li>
        </div>
        <div>
          
          <li>Ingrédient
            <ul>
            <li>
              <NavLink style={checkIsactive} to={APP_ROUTES.INGREDIENT}>
                Ingredient
              </NavLink>
            </li>
              </ul>
          </li>
        </div>

        <div >
          
            <li>Recipe
           <ul>
            <li>
              <NavLink style={checkIsactive} to={APP_ROUTES.RECIPE}>
                Ajouter
              </NavLink>
            </li>
            <li>
              <NavLink style={checkIsactive} to={APP_ROUTES.UPDATE}>
                Modifier
              </NavLink>
            </li>
            <li>
              <NavLink style={checkIsactive} to={APP_ROUTES.UPDATE}>
                Supprimer
              </NavLink>
            </li>
             </ul>
          </li>
        </div>
        </ul>  
      </nav>
  );
};

export default Nav;
