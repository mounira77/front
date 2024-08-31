import Input from "../input/Input";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addUserThunk } from "../../api/user.api";
//import { updateSignUpForm } from "../../redux/reducers/users.reducer";
import { useEffect } from "react";
import {
  setError,
  setSignUpError,
  resetSignUpError,
  resetError,
  updateSignUpForm,
}
from "../../redux/reducers/users.reducer";
const UserSignUp = (props) => {
  const dispatch = useDispatch();

  const { signUpForm, user, errorForm, signUpLoading, signUpError, users } =
  useSelector((store) => {
    //retourner current state de user
    return store.userState;
  });

  /////
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(resetError());
    dispatch(resetSignUpError());
    const userfound = users.find(
      (utilisateur) => utilisateur.email === signUpForm.email
    );
    if (userfound) {
      dispatch(setError({ error: "Email déja utilisé" }));

      return;
    }

    if (!signUpForm.email ||
      !signUpForm.password ||
      !signUpForm.confirmPass ||
      !signUpForm.pseudo
    ) {
      dispatch(setError({ error: "Verefiez vos informations" }));
      console.log("bonj");
      console.log("error", errorForm);
      return;
    }
    ////

    if (signUpForm.password !== signUpForm.confirmPass) {
      dispatch(setError({ error: "Le mot de passe doit etre unique" }));
      return;
    }
    const complexityRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (!complexityRegex.test(signUpForm.password)) {
      dispatch(
        setError({
          error: "Le mot de passe doit contenir au moins 8 caractères, avec au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
        })
      );
      return;
    }
    ////

    dispatch(addUserThunk(signUpForm));
  };

  const updateForm = (value, inputName) => {
    dispatch(updateSignUpForm({ value, inputName }));
  };

  // const getUsers= async () => {};
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="user">
        <div className="user-sign">
      {!!signUpError && <p style={{ color: "#f40b88" }}>{signUpError}</p>}
      
        <form onSubmit={handleSubmit}>
          <Input
            id={"email"}
            text={"Adress mail"}
            type={"email"}
            value={signUpForm.email}
            holder="Saisir un mail valie"
            onChange={(value) => updateForm(value, "email")}
          />

          <Input
            id={"password"}
            text={"Mot de passe"}
            value={signUpForm.password}
            onChange={(value) => updateForm(value, "password")}
            holder={"saisir le mot de passe"}
            //{setAddUserInput({...addUserInput,[e.target.password]:e.target.value})}}
          />
          <Input
            id={"confirmer"}
            text={"Confirmer le mot passe"}
            value={signUpForm.confirmPass}
            holder={"Confirmer le mot dr passe"}
            onChange={(value) => updateForm(value, "confirmPass")}
          />
          <Input
            id={"pseudo"}
            text={"Pseudo"}
            holder={"Choisir un pseudo"}
            value={signUpForm.pseudo}
            onChange={(value) => updateForm(value, "pseudo")}
          />
          {errorForm && <div style={{ color: "#f40b88" }}>{errorForm}</div>}
          <Button
            type={"submit"}
            text={signUpLoading ? "Chargement..." : "Valider"}
            disabled={signUpLoading}
          />
        </form>
      </div>
    </div>
  );
};
export default UserSignUp;
