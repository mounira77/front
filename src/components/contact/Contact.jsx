import "./contact.scss";
import TextArea from "../textArea/TextArea";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

import { addContactThunk } from "../../api/contact.api";

import { useDispatch, useSelector } from "react-redux";

import { updateContactForm } from "../../redux/reducers/contact.reducer";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons';

const Contact = (props) => {
  let valueCategory = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { contactForm, contactLoading } = useSelector((store) => {
    return store.contactState;
  });
  const { user } = useSelector((store) => {
    return store.userState;
  });

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!contactForm.message || !user.userId) return;
    dispatch(addContactThunk());
  };

  const updateForm = (value, inputName) => {
    dispatch(updateContactForm({ value, inputName }));
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div>{/* <p>recette: {recipe.title || ""}</p> */}</div>
      <div>
        <h1>Contactez-nous</h1>
        <form onSubmit={handelSubmit}>
          <div div className="displayCt container ">
            <div className="displayCt-taille">
              <TextArea
                id={"message"}
                text={"Message"}
                value={contactForm.message}
                holder={"Saisir le conten du message "}
                onChange={(value) => updateForm(value, "message")}
              />
            </div>
            <div className="displayCt-margDiv">
              <p>
                Nous sommes à votre disposition pour vous répondre.en
                renseignant le formulaire ci-contre et nous ne manquerons pas de
                vous répondre dans les meilleurs délais.
              </p>
              <div><p> <FontAwesomeIcon icon={faPhone} /></p>
              <p>06 38 24 47 57</p>
              <p><FontAwesomeIcon icon={faMapMarker} /></p>
              <p>Le bouscat-France</p></div>
            </div>
          </div>
          <Button
            type={"submit"}
            text={contactLoading ? "Chargement..." : "Valider"}
            disabled={contactLoading}
          />
        </form>
      </div>
    </div>
  );
};
export default Contact;
