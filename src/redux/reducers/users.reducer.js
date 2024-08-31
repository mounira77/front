import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {
  users: [],
  signUpForm: {
    email: null,
    pseudo: null,
    password: null,
    confirmPass: null,
  },
  //pour le formulair signUp pour traiter les conditions
  errorForm: "",
  // loading: false,

  signInForm: {
    email: null,
    password: null,
  },

  user: {
    email: null,
    userId: null,
  },
  // pour gerer le loading sign-in
  signInloading: false,
  //pour gerer le loading sign-up
  signUpLoading: false,
  // pour gerer le loadin get-all
  userLoading: false,
  signInError: "",
  signUpError: "",
  userError: "",
  tokenLoading: "",
  tokenError: "",


};

const usersSlice = createSlice({
  name: "utilisateur",
  initialState: USER_STATE,
  reducers: {
    // avoir
    addUser: (state, action) => {
      const { email, userId } = action.payload;
      console.log(email, userId)

      return {
        ...state,

        user: {
          ...state.user,
          email,
          userId

        }


      };
    },
    addUsers: (state, action) => {
      const arrayUser = action.payload;

      //elle me retourne le state complete avec le recipe ajouté

      return {
        ...state,
        users: arrayUser,

      };
    },

    //
    setUser: (state, action) => {
      const { email, userId } = action.payload;

      return {
        ...state,

        user: { ...state.user,
          email,
          userId,

        },
      };
    },
    updateSignInForm: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        signInForm: {
          ...state.signInForm,
          [inputName]: value,
        },
      };
    },
    updateSignUpForm: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        signUpForm: {
          ...state.signUpForm,
          [inputName]: value,
        },
      };
    },
    startSignUpLoading: (state, action) => {
      return { ...state, signUpLoading: true };
    },
    stopSignUpLoading: (state, action) => {
      return { ...state, signUpLoading: false };
    },
    startSignInLoading: (state, action) => {

      return { ...state, signInloading: true };
    },
    stopSignInLoading: (state, action) => {
      return { ...state, signInloading: false };
    },
    //
    startLoading: (state, action) => {
      return { ...state, userLoading: true };
    },
    stopLoading: (state, action) => {
      return { ...state, userLoading: false };
    },

    setUserError: (state, action) => {
      return {
        ...state,
        userError: action.payload.error,
        userLoading: false,
      };
    },
    //token
    startTokenLoading: (state, action) => {
      return { ...state, tokenLoading: true };
    },
    stopTokenLoading: (state, action) => {
      return { ...state, tokenLoading: false };
    },

    setTokenError: (state, action) => {
      return {
        ...state,
        tokenError: action.payload.error,
        tokenLoading: false,
      };
    },




    //

    setSignInError: (state, action) => {
      return {
        ...state,
        signInError: action.payload.error,
        signInloading: false,
      };
    },
    setSignUpError: (state, action) => {


      return {
        ...state,
        signUpError: action.payload.error,
        //pour eviter d'executer 2 dispatch successives
        signUpLoading: false,
      };
    },
    ///
    setError: (state, action) => {


      return {
        ...state,
        errorForm: action.payload.error,

      };
    },
    deconnexion: (state, action) => {
      const { email, userId } = action.payload;
      const vide = null;
      return {
        ...state,
        user: { ...state.user, email, userId }

      };
    },
    resetSignUpError: (state, action) => {
      return {
        ...state,
        signUpError: null,

      };
    },
    resetError: (state, action) => {
      return {
        ...state,
        signUpError: null,

      };
    },
    


  },
});



export const {
  addUser,
  setUser,
  addUsers,
  setSignInError,
  setSignUpError,
  updateSignUpForm,
  startSignUpLoading,
  stopSignUpLoading,
  updateSignInForm,
  startSignInLoading,

  stopSignInLoading,
  setError,
  resetSignUpError,
  resetError,
  stopLoading,
  startLoading,
  setUserError,
  startTokenLoading,
  stopTokenLoading,
  setTokenError,
  deconnexion,

}

= usersSlice.actions;

export default usersSlice.reducer;
