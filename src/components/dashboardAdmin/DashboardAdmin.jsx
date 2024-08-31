import "./dashboardAdmin.scss";
import { useSelector, useDispatch } from "react-redux";

import { getFromStorage, clearStorage } from "../../utils/storage.utils";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import { useEffect } from "react";
import { tokenThunk } from "../../api/user.api";
import Profil from "../profil/Profil";
import Nav from "../Nav/Nav";
import { deconnexion } from "../../redux/reducers/users.reducer";
import { favoriteNumber } from "../../redux/reducers/favoris.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// composant dashboard administrateur avec le (role: admin)
//le meme principe de redirection vers la page d'authentication que  dashboard
const DashboardAdmin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, users } = useSelector((store) => {
    return store.userState;
  });
  console.log(user, "::::::::::::::::::::::::::::::::::");

  const onClick = () => {
    clearStorage();
    dispatch(deconnexion({ email: null, userId: null }));
    navigate(APP_ROUTES.ACCUEIL, { replace: true });
    dispatch(favoriteNumber({ number: null }));
  };
  // pour recuperer les infos du profil connecté
  const profil = users.filter(
    (userConnecte) => userConnecte.id_user === user.userId
  );

  const profilUser = profil[0];
  console.log("le profil", profilUser);
  useEffect(() => {
    const token = getFromStorage("key");
    console.log(token);

    if (!token) {
      navigate(APP_ROUTES.SIGN_IN, { replace: true });
    }
    dispatch(tokenThunk());
  }, []);
  useEffect(() => {
    if (!user.email) return;

    navigate(APP_ROUTES.SIGN_IN, { replace: true });
  }, []);
  return (
    <div className="">
    
      <Nav />
      <Profil
        onClick={onClick}
          text={ <FontAwesomeIcon icon={faSignOutAlt} />}
        pseudo={profilUser.pseudo}
        email={profilUser.email}
      />
    </div>
  );
};

export default DashboardAdmin;
