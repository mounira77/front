import "./profil.scss";
import { useSelector } from "react-redux";
import Button from "../button/Button";
import { clearStorage } from "../../utils/storage.utils";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import Favorite from "../favorites/Favorite";


const Profil = (props) => {
  const { pseudo, email, text, onClick } = props;

  return (
    <div>
      <div className="displayProfil">

        <h1>Bienvenue {pseudo}</h1>
        <Button type={"button"} handelClick={onClick} text={text} />
      </div>
      <div className="displayProfil-display">
        <div>
          <h2>Détail du compte</h2>
          <p>{pseudo}</p>
          <p>{email}</p>
        </div>
        <div>
          <Favorite />
        </div>
      </div>
    </div>
  );
};

export default Profil;
