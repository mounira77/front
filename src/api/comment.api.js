
import {   addCommentError,
    stopCommentLoading,
    startCommentLoading,
    addComment,
    stopCommentgetLoading,
    startCommentGetLoading,
    CommentGetError,
  addComments,
  startUpdateCommentLoading,
  updateCommentError,
  stopUpdateCommentLoading,
  
  } from "../redux/reducers/comment.reducer";
import { postRequest , getRequest, deleteRequest,updateRequest} from "./api";

export const addCommentThunk = () => async (dispatch, getState)=>{

    const { commentLoading, commentForm } = getState().commentState;
    const { recipe } = getState().recipeState;
    const comment = {
        comment: commentForm.comment,
        recipeId:recipe.id_recipe
    }
    console.log("contenu commentaire",commentForm )
    if (commentLoading) return
   
   
    dispatch(  startCommentLoading());
    const { result, status, error } = await postRequest("comment/create" ,comment );
 
console.log(result)




if (!result?.message || status >= 400 || !!error)
return  dispatch(addCommentError({error:`Something goes wrong: ${error}`}));

console.log("bonjooooooooor")
 

dispatch( addComment( {comment:commentForm.comment}));
  dispatch(  stopCommentLoading());
};

//get all
export const getCommentThunk = (id_recipe) => async (dispatch, getState)=>{

    const { commentGetLoading} = getState().contactState;
    const { comments} = getState().commentState;
    if (commentGetLoading) return
    
   
    dispatch(  startCommentGetLoading());
    const { result, status, error } = await getRequest(`comment/${id_recipe}`);
   
 
console.log("result:",result)
const com= result.comment

if(!com) return

if (!result?.message || status >= 400 || !!error)
return  dispatch(CommentGetError({error:`Something goes wrong: ${error}`}));

 

  dispatch(addComments(com));

  dispatch(  stopCommentgetLoading());
};
//modifier commentaire
// export const deleteThunk = (recipeId) => async (dispatch, getState)=>{
  
//   const {  deleteLoading,  ingredientForm} = getState().ingredientState;

//   if (deleteLoading) return

   
//  dispatch(    startdeletetLoading());

//     const {error,result,status} = await deleteRequest(`recipe/${recipeId}` );

// if (!result?.message || status >= 400 || !!error)

// return  dispatch( deleteError({ error:`Something goes wrong: ${error}`}));


//   dispatch(deleteOne( {recipeId:recipeId}));

//   dispatch(stopdeleteLoading());

// };

// export const updateRecipeThunk = () => async (dispatch, getState) => {
//   const { updateRecipeLoading, recipe, updateFormRecipes} = getState().recipeState;
  
//   console.log("le contenu de la forme", updateFormRecipes)
//   const recipes = {
//     title: updateFormRecipes.title,
//     designation: updateFormRecipes.designation,
//     tags: updateFormRecipes.tags,
//     nbr_pieces:  updateFormRecipes.nbr_pieces,
//     reference: updateFormRecipes.reference,
//     recipeId:recipe.id_recipe,
   
//    }
  
 

//   if (updateRecipeLoading) return
 

   
//  dispatch(    startUpdateRecipeLoading());

//     const {result,status,error} = await updateRequest("recipe/update", recipes );
// console.log(result)
// if (!result?.message || status >= 400 || !!error)

// return  dispatch( updateSetRecipeError({ error:`Something goes wrong: ${error}`}));


//  // dispatch(deleteOne( {recipeId:recipeId}));

//   dispatch(stopUpdateRecipeLoading());

// };
////****************************update step rceipe */



//modefier commentaire
export const updateCommentThunk  = () => async (dispatch, getState) => {
  const { updateCommentLoading,  updatecommentFormSet } = getState().commentState;
  
  console.log("le contenu de la forme",   updatecommentFormSet)
  const comments = {
    comment: updatecommentFormSet.comment,
    id_user: updatecommentFormSet.id_user,
    id_recipe: updatecommentFormSet.id_recipe,
    //date_comment:updatecommentFormSet.date_comment,
  
   
   }
  
 

  if (updateCommentLoading) return
 
  
   
 dispatch( startUpdateCommentLoading());

    const {result,status,error} = await updateRequest("comment/update", comments);
console.log(result)
if (!result?.message || status >= 400 || !!error)

return  dispatch( updateCommentError({ error:`Something goes wrong: ${error}`}));


 // dispatch(deleteOne( {recipeId:recipeId}));

  dispatch( stopUpdateCommentLoading());

};

