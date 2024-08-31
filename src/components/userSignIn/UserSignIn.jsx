import "./userSignIn.scss";
import Input from "../input/Input";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { signUserThunk, getUserThunk } from "../../api/user.api";
import { updateSignInForm } from "../../redux/reducers/users.reducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
const UserSignIn = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // chercher si l'utilisateur est bin présent dans la table users qui contients tous les utilisateurs enregistrés
    let userAuthentificaion = null;

    const { signInForm, signInloading, signInError, user, users } = useSelector(
      (store) => {
        return store.userState;
      }
    );
    // sign in si l'utilisateur n'est pas présent dans la table users -- navigate vers le composant usersignup sinon execute le thunk de sign-in
    const handleSubmit = (e) => {
      e.preventDefault();

      if (!signInForm.email || !signInForm.password) return;

      userAuthentificaion = users.find((userr) => {
        return userr.email === signInForm.email;
      });
      if (!userAuthentificaion)
        return navigate(APP_ROUTES.SIGN_UP, { replace: true });

      dispatch(signUserThunk());
    };

    const updateForm = (value, inputName) => {
      dispatch(updateSignInForm({ value, inputName }));
    };
    const handleRedirect = () => {
      navigate(APP_ROUTES.SIGN_UP, { replace: true });
    };

    useEffect(() => {
      dispatch(getUserThunk());
    }, []);
    // auc chargement du composant UserSignIn s'il ya un utilisateur fait la redirection selon le role de  de l'utilisateur
    useEffect(() => {
      if (!user) return;

      const userFind = users.find((userr) => {
        return userr.id_user === user.userId;
      });

      if (!userFind) return;

      if (userFind.role === "user") {
        navigate(APP_ROUTES.DASHBOARD, { replace: true });
      }
      else {
        navigate(APP_ROUTES.DASHBOARDADMIN, { replace: true });
      }
    }, [user]);

    return (
        <div className="user">
        <div className="user-sign">
      {!!signInError && <p style={{ color: "#f40b88" }}>{signInError}</p>}
     {/* {!userAuthentificaion && (
        <p style={{ color: "#f40b88" }}>{"Enregistrez-vous"}</p>
      )} */}

      <div >
        <form  onSubmit={handleSubmit}>
          <Input
            id={"email"}
            text={"Adress mail"}
            value={signInForm.email}
            holder="Saisir un mail valie"
            onChange={(value) => updateForm(value, "email")}
          />

          <Input
            id={"password"}
            text={"Mot de passe"}
            type={"password"}
            value={signInForm.password}
            onChange={(value) => updateForm(value, "password")}
            holder={"saisir le mot de passe"}
          />

          <Button
            type={"button"}
            text={"Creer son compte"}
            handelClick={handleRedirect}
          />

          <Button
            type={"submit"}
            text={signInloading ? "Chargement..." : "Valider"}
            disabled={signInloading}
          />
        </form>
      </div> <
    /div>
     </div>
  );
};
export default UserSignIn;
