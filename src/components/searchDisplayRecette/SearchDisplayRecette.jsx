import DisplaySearch from "../displaySearch/DisplaySearch";

import IngredientSearch from "../ingredientSearch/IngredientSearch";
import { APP_ROUTES } from "../../constants/route.const";
import "./searchDisplayRecette.scss";
import Input from "../input/Input";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import { updateCommentForm, pushComment } from "../../redux/reducers/comment.reducer";
import { pushFavoris } from "../../redux/reducers/favoris.reducer";
import { addCommentThunk, getCommentThunk } from "../../api/comment.api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';


import { insertFavoriteThunk } from "../../api/favoris.api";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

const DisplaySearchRecette = (props) => {
  const dispatch = useDispatch();
  const { recipe } = useSelector((store) => {
    return store.recipeState;
  });

  const { comments, commentForm, commentLoading, updateCommentLoading } =
  useSelector((store) => {
    return store.commentState;
  });

  const { user } = useSelector((store) => {
    return store.userState;
  });
  const { favoriteLoading } = useSelector((store) => {
    return store.favoriteState;
  });

  const updateForm = (value, inputName) => {
    dispatch(updateCommentForm({ value, inputName }));
  };
  //ajouter commentaires
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCommentThunk());
    // dispatch(getCommentThunk());
    //dispatch(pushComment({commentForm.comment,user.userId,recipe.id_recipe}))
  };
  //ajouter favoris
  const onclickFavoris = () => {
    dispatch(insertFavoriteThunk());
    dispatch(pushFavoris({
      id_recipe: recipe.id_recipe,
      id_user: user.userId,
    }))
  };

  useEffect(() => {
    dispatch(getCommentThunk(recipe.id_recipe));
  }, []);

  const isCommentsEmpty = comments.length === 0;

  return (
    <div>
      <div className="display scroll container">
        <div>
          <DisplaySearch
            url={`${APP_ROUTES.URL}${recipe.filePath}`}
            alt={recipe.alt.charAt(0).toUpperCase() + recipe.alt.slice(1)}
            title={recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1)}
            designation={
              recipe.designation.charAt(0).toUpperCase() +
              recipe.designation.slice(1)
            }
            nbr_pieces={recipe.nbr_pieces}
            referenceImg={
              recipe.referenceImg.charAt(0).toUpperCase() +
              recipe.referenceImg.slice(1)
            }
            reference={
              recipe.reference.charAt(0).toUpperCase() +
              recipe.reference.slice(1)
            }
          />
        </div>
        <div>
          <IngredientSearch />
        </div>

        {/* commentaire */}
        <div>
          <h2>Commentaires</h2>
          {isCommentsEmpty ? (
            <p>Soyez le premier de faire un commentaire.</p>
          ) : (
            <div className="display-pseudo  display">
              
                {comments.map((comment, index) => (
                  <div key={index} className="display-pseudo-comment">
                    <p>
                      {comment.pseudo.charAt(0).toUpperCase() +
                        comment.pseudo.slice(1)}
                    </p>
                    <p>{comment.comment}</p>
                    <p>
                      {moment(comment.date_comment).locale("fr").format("LT")}
                    </p>

                    <Link
                      className="link"
                      to={`${APP_ROUTES.EDITCOMMENT}/${comment.id_recipe}/${comment.date_comment}/${comment.id_user}`}
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              
            </div>
          )}

          <div>
            <form onSubmit={handleSubmit}>
              <Input
                id={"comment"}
                text={""}
                value={commentForm.comment}
                holder="Ajouter un commentaire"
                onChange={(value) => updateForm(value, "comment")}
              />
              <Button
                type={"submit"}
                text={commentLoading ? "Chargement..." :  <FontAwesomeIcon icon={faComment} />}
                disabled={commentLoading}
              />
              <Button
                text={favoriteLoading ? "Chargement..." :<FontAwesomeIcon icon={faHeart} />}
                disabled={favoriteLoading}
                handelClick={onclickFavoris}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplaySearchRecette;
