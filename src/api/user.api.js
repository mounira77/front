
import { addUser, 
   setUser,  
   addUsers,
   startSignUpLoading,
    stopSignUpLoading, 
    startSignInLoading,   
    stopSignInLoading,
    setSignInError,
    setSignUpError,
    stopLoading,
    startLoading,setUserError,
    startTokenLoading,
    stopTokenLoading,
    setTokenError,

  } from "../redux/reducers/users.reducer";
import { postRequest,getRequest } from "./api";
import  {setToStorage,getFromStorage} from "../utils/storage.utils"

export const getUserThunk= () => async (dispatch, getState) => {
 
  const {  userLoading } = getState().userState;
  if (userLoading) return;
  dispatch(startLoading());

  
  const {result,status,error} = await getRequest("users/user");


  if (!result?.message 

    || status >= 400 || !!error)
 
  return dispatch( setUserError({ error: `Quelque chose ne va pas: ${error}` }));
 
//si il ya pas result.message d'erreur ou autre statut>=400.. ajouter le message d'erreur dans le reduce
const arrayUser=result.user;


  dispatch(addUsers(arrayUser))

  dispatch(stopLoading());

  

  
};

// por ajouter un nouveau utilisateur a l'enregistrement

export const addUserThunk = () => async (dispatch, getState)=>{

    const { signUpForm,  signUpLoading} = getState().userState;

    if ( signUpLoading) return;

    dispatch( startSignUpLoading());

  
   const {result,status,error} = await postRequest("users",signUpForm );



    if (!result.message || status >= 400 || !!error)

    return dispatch(setSignUpError({  error: `Something goes wrong: ${error}` }));

    



    dispatch(setUser({email: result.user.email, userId:result.user.userId
        //, pseudo: response.result.user.pseudo 
      })
    );

    dispatch( stopSignUpLoading());
};


//**************************************** */ pour sign-in
export const signUserThunk= () => async (dispatch, getState) => {

 console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")

  const { signInForm, signInloading, user } = getState().userState;
  console.log("le formulaire",)

 if (  signInloading
  ) return;

  dispatch(startSignInLoading())


  const { result, status, error } = await postRequest("users/sign-in", signInForm);
 
  console.log("la reponse sign-ingggggggggggggggggggg",result)
  



const token=result.user.token
console.log(token)
//si il ya pas result.message d'erreur ou autre statut>=400.. ajouter le message d'erreur dans le reducer


  if (!result?.message 
    || status >= 400 || !!error)
    
    return dispatch( setSignInError({ error: `Quelque chose ne va pas

    : ${error}` }));

    setToStorage('key',token)

dispatch(addUser({ email:result.user.email, userId:result.user.userId}));

 
 dispatch(stopSignInLoading());
 




};

//*****************************************CHECKR LE TOKEN */

export const tokenThunk = () => async (dispatch, getState)=>{

  const { tokenLoading} = getState().userState;
 

  if ( tokenLoading) return;

  dispatch(startTokenLoading());



 const {result,status,error} = await getRequest("users/checkToken");
 console.log(result)



  if (!result.message || status >= 400 || !!error)

  return dispatch(setTokenError({  error: `Something goes wrong: ${error}` }));

  



  dispatch(setUser({email: result.user.email, userId:result.user.userId
      //, pseudo: response.result.user.pseudo 
    })
  );

  dispatch(  stopTokenLoading());
};