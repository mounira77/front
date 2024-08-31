import "./dashboard.scss";
import { useSelector, useDispatch } from "react-redux";

import { getFromStorage, clearStorage } from "../../utils/storage.utils";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import { useEffect } from "react";
import { tokenThunk } from "../../api/user.api";
import Profil from "../profil/Profil";
import { deconnexion } from "../../redux/reducers/users.reducer";
import { favoriteNumber } from "../../redux/reducers/favoris.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


// composant dashboard simple utilisateur (role:user)
const Dashboard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, users } = useSelector((store) => {
    return store.userState;
  });
  //button de deconnexion j'ai utilisé
  const onClick = async() => {
    await clearStorage();
    dispatch(deconnexion({ email: null, userId: null }));
    navigate(APP_ROUTES.ACCUEIL, { replace: true });

    dispatch(favoriteNumber({ number: null }));
    //
  };

  // recuperer les information de l'utilisateur authentifié
  const profil = users.filter(
    (userConnecte) => userConnecte.id_user === user.userId
  );

  const profilUser = profil[0];

  // au montage du composant  s'il ya pas de token ds le localStorage  rediriger l'utilisateur vers la page d'authentification ,sinon envoyer une requette vers le back pour valider le token
  useEffect(() => {
    const token = getFromStorage("key");

    if (!token) {
      navigate(APP_ROUTES.SIGN_IN, { replace: true });
    }
    dispatch(tokenThunk());
  }, []);

  // aussi au montage du composant tester s'il ya un utilisateur dans le state rien a faire sinon redirection vers la page d'authentification
  useEffect(() => {
    if (!user.email) return;

    navigate(APP_ROUTES.SIGN_IN, { replace: true });
  }, [user]);
  return (
    <div className="">
      <Profil
        onClick={onClick}
        text={ <FontAwesomeIcon icon={faSignOutAlt} />}
        pseudo={profilUser.pseudo}
        email={profilUser.email}
      />
    </div>
  );
};

export default Dashboard;
