import "./card.scss";
import { useSelector } from "react-redux";
import Button from "../button/Button";
import { APP_ROUTES } from "../../constants/route.const";

const Card = (props) => {
  const { path, alt, titre, cle, handelClick } = props;
  const { recipe } = useSelector((store) => {
    return store.recipeState;
  });

  return (
    <div>
      <div className="card">
        <div key={cle} className="card-img" onClick={handelClick}>
          <img src={path} alt={alt} />
        </div>
        <div className="card-content">
          <h3>{titre}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
