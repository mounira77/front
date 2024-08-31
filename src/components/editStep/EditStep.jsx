import "./editStep.scss";
import Input from "../input/Input";
import Button from "../button/Button";
import Back from "../back/Back"
import { useDispatch, useSelector } from "react-redux";

import {
  updateRecipesStepForm,
  fillRecipesStepForm,
} from "../../redux/reducers/recipe.reducer";

import { updateStepRecipeThunk } from "../../api/recipe.api";
import { useParams } from "react-router-dom";

import { useEffect } from "react";

const EditSteptRecipe = (props) => {
  const dispatch = useDispatch();
  const { idStep } = useParams();

  const { recipe, updateFormRecipesStep, updateRecipeStepLoading } =
    useSelector((store) => {
      return store.recipeState;
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStepRecipeThunk());
  };
  const updateForm = (value, inputName) => {
    console.log("bonjour");
    dispatch(updateRecipesStepForm({ value, inputName }));
    console.log("bonsoir");
  };

  useEffect(() => {
    const exisStep = recipe.steps.find((step, i) => {
      return (
        step.idStep === parseInt(idStep) && step.id_recipe === recipe.id_recipe
      );
    });
    console.log(exisStep);
    if (exisStep) {
      dispatch(
        fillRecipesStepForm({
          id_step: exisStep.idStep,
          id_recipe: exisStep.id_recipe,
          designation: exisStep.steps,
          time: exisStep.time,
        })
      );
    }
    console.log("le formulaire a remplir", updateFormRecipesStep);
  }, []);

  return (
    <div className="user">
      <div className="user-sign">
    <Back />
      <form onSubmit={handleSubmit}>
        <div div className="displayR container ">
          <div className="displayR-taille">
            <Input
              id={"designation"}
              text={"Designation"}
              value={updateFormRecipesStep.designation}
              onChange={(value) => updateForm(value, "designation")}
            />
            <Input
              id={"time"}
              type={"number"}
              text={"Time"}
              value={updateFormRecipesStep.time}
              holder={"Saisir le temps nécessaire"}
              onChange={(value) => updateForm(value, "time")}
            />
          </div>
        </div>
        <Button
          type={"submit"}
          text={updateRecipeStepLoading ? "Chargement..." : "Editer"}
          disabled={updateRecipeStepLoading}
        />
      </form>
       </div>
    </div>
  );
};
export default EditSteptRecipe;
