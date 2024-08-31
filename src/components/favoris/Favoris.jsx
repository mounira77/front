import "./favoris.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
const Favoris = (props) => {
  const { handelUserName, handelFavoris } = props;

  const { nbrFavorite } = useSelector((state) => state.favoriteState);
  return (
    <div className="favoris">
      <div>
        <a
          href="#"
          id="user-button"
          className="cart-button"
          onClick={handelUserName}
        >
     
        <FontAwesomeIcon icon={faUser}  className="fa-icon" />
        <p>Compte</p>
         
        </a>
      </div>
      <div className="favoris-position">
        <a
          href="#"
          id="cart-button"
          className="cart-button favoris-afffavoris"
          onClick={handelFavoris}
        >
  
              <FontAwesomeIcon icon={faHeart}  className="fa-icon" />
       <p>Favoris</p>
          
        </a>
        <span className="favoris-positionSpan"> {nbrFavorite.number}</span>
      </div>
    </div>
  );
};

export default Favoris;
