import "./editComment.scss";
import Input from "../input/Input";
import Button from "../button/Button";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {
  fillCommentForm,
  updateCommentFormSet,
} from "../../redux/reducers/comment.reducer";

import { updateCommentThunk, getCommentThunk } from "../../api/comment.api";

import { useEffect } from "react";

const EditComment = (props) => {
  const dispatch = useDispatch();

  const { id_recipe, date_comment, id_user } = useParams();

  const { comments, updatecommentFormSet, updateCommentLoading } = useSelector(
    (store) => {
      return store.commentState;
    }
  );
  const { user } = useSelector((store) => {
    return store.userState;
  });

  //submit si vous etes le proprietaire du comment
  const handleSubmit = (e) => {
    e.preventDefault();

    updatecommentFormSet.id_user === user.userId
      ? dispatch(updateCommentThunk())
      : console.log("Vous n'êtes pas autorisé à modifier ce commentaire.");
    dispatch(getCommentThunk());
  };

  const updateForm = (value, inputName) => {
    dispatch(updateCommentFormSet({ value, inputName }));
  };
  console.log("information", id_recipe, user.userId, user.email);
  useEffect(() => {
    const existComment = comments.find((comment, i) => {
      return (
        comment.id_recipe === parseInt(id_recipe) &&
        comment.id_user === parseInt(id_user) &&
        comment.date_comment === date_comment
      );
    });
    console.log("utilisateur", user);
    console.log("commenttttttttt ", existComment);

    if (!existComment) return;
    //dispatch un truc  disable link
    dispatch(
      fillCommentForm({
        id_user: existComment.id_user,
        id_recipe: existComment.id_recipe,
        comment: existComment.comment,
        date_comment: existComment.date_comment,
      })
    );

    console.log("resultat", updatecommentFormSet);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div div className="displayR container ">
          <div className="displayR-taille">
            <Input
              id={"comment"}
              text={"comment"}
              value={updatecommentFormSet.comment}
              onChange={(value) => updateForm(value, "comment")}
            />
          </div>
        </div>
        <Button
          type={"submit"}
          text={updateCommentLoading ? "Chargement..." : "Editer"}
          disabled={updateCommentLoading}
        />
      </form>
    </div>
  );
};
export default EditComment;
