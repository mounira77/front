import "./modal.scss";
import Button from "../button/Button";
import Input from "../input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStepForm,
  setModal,
  addStep,
}
from "../../redux/reducers/recipe.reducer";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Modal = (props) => {
  const dispatch = useDispatch();
  const { stepForm, stepModal, steps } = useSelector((store) => {
    return store.recipeState;
  });

  const toogleModal = () => {
    dispatch(setModal());
  };

  const toogleModall = () => {
    if (!stepForm.designation || !stepForm.order || !stepForm.time) return;

    const tt = dispatch(
      addStep({
        designation: stepForm.designation,
        order: parseInt(stepForm.order),
        time: parseInt(stepForm.time),
      })
    );

    dispatch(setModal());
  };
  const updateForm = (value, inputName) => {
    dispatch(updateStepForm({ value, inputName }));
  };
  const onClickClose = (e) => {
    e.preventDefault();
    dispatch(setModal());
  };

  useEffect(() => {
    //console.log("d");

  }, []);
  return (
    <div>
      <Button
        type={"button"}
        handelClick={toogleModal}
       text={<FontAwesomeIcon icon={faPlus} />}
        className="btn_modal"
      />
      {stepModal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <a href="#" className="close" onClick={onClickClose}>
                ×
              </a>
              <h1>Sair une étape</h1>
              <Input
                id={"Etape"}
                text={"Etape"}
                value={stepForm.designation}
                holder={"Saisir une étépe"}
                onChange={(value) => updateForm(value, "designation")}
              />
              <Input
                id={"order"}
                text={"Order"}
                type={"number"}
          value={stepForm.order}
          
          
                holder={"Saisir l'order de l'étape"}
                readOnly
                onChange={(value) => updateForm(value, "order")}
              />
              <Input
                id={"time"}
                type={"number"}
                text={"Durée"}
                value={stepForm.time}
                holder={"Saisir la durée "}
                onChange={(value) => updateForm(value, "time")}
              />
              <Button
                className="close-modal"
                type={"button"}
                handelClick={toogleModall}
                text={"Ajouter"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
