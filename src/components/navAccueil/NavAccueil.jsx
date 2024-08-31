import "./navAccueil.scss";
import { NavLink } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import { openBurger } from "../../redux/reducers/recipe.reducer";
import { useDispatch, useSelector } from "react-redux";

const NavAccueil = (props) => {
  const dispatch = useDispatch();

  const { openButton } = useSelector((store) => {
    return store.recipeState;
  })

  const checkIsactive = ({ isActive }) => {
    return {
      display: "block",
      padding: "0.5rem ",

      color: isActive ? "white" : "",

      background: isActive ? "gray" : "",
    };
  };
  const handelClickToogle = () => {
    dispatch(openBurger())
    console.log(openButton)
  }
  return (
    <div> 
  
      <nav className={`menuAccueil ${openButton ? "active" : "inactive"}`}>
      
        <ul className="menuAccueil" >
          <li>
            <NavLink style={checkIsactive} to={APP_ROUTES.ACCUEIL}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={checkIsactive} to={APP_ROUTES.CONTACT}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink style={checkIsactive} to={APP_ROUTES.APROPOS}>
              Apropos
            </NavLink>
          </li>
        </ul>
      </nav>
    
  <a href="#"  onClick={handelClickToogle}>
  <p className="burger-icon">
    <span></span>
    <span></span>
    <span></span>
  </p>
</a>
 
    </div>
  );
};

export default NavAccueil;
