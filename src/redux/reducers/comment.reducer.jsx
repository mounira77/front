import { createSlice } from "@reduxjs/toolkit";

const COMMENT_STATE = {
  comments: [],
  comment: null,
  commentLoading: false,
  commentError: null,
  commentForm: {
    comment: null,
  },
  // pour get
  CommentGetLoading: false,
  commentGetError: null,
  updatecommentFormSet: {
    id_user: 0,
    id_recipe: 0,
    comment: null,
    date_comment: null,
  },

  updateCommentLoading: false,
  updaeCommentError: null,
};

const commentSlice = createSlice({
  name: "contact",
  initialState: COMMENT_STATE,
  reducers: {
    addComment: (state, action) => {
      const com = action.payload;

      return {
        ...state,

        comment: {
          ...state.comment,
          com,
        },
      };
    },
    addComments: (state, action) => {
      const com = action.payload;
      console.log(com);
      //elle me retourne le state complete avec le recipe ajouté

      return {
        ...state,
        comments: com,
      };
    },
    updateCommentForm: (state, action) => {
      const { value, inputName } = action.payload;
      console.log(value, inputName);
      return {
        ...state,
        commentForm: {
          ...state.commentForm,
          [inputName]: value,
        },
      };
    },

    updateCommentFormSet: (state, action) => {
      const { value, inputName } = action.payload;
      console.log(value, inputName);
      return {
        ...state,
        updatecommentFormSet: {
          ...state.updatecommentFormSet,
          [inputName]: value,
        },
      };
    },
    fillCommentForm: (state, action) => {
      const { comment, id_user, id_recipe, date_comment } = action.payload;
      return {
        ...state,
        updatecommentFormSet: {
          ...state.updatecommentFormSet,
          comment,
          id_user,
          id_recipe,
          date_comment,
        },
      };
    },

    addCommentError: (state, action) => {
      return {
        ...state,
        commentError: action.payload.error,
        commentLoading: false,
      };
    },
    startCommentLoading: (state, action) => {
      return { ...state, commentLoading: true };
    },
    stopCommentLoading: (state, action) => {
      return { ...state, commentLoading: false };
    },
    //pour gerer le get
    CommentGetError: (state, action) => {
      return {
        ...state,
        commentError: action.payload.error,
        commentLoading: false,
      };
    },
    startCommentGetLoading: (state, action) => {
      return { ...state, commentLoading: true };
    },
    stopCommentgetLoading: (state, action) => {
      return { ...state, commentLoading: false };
    },
    //update
    updateCommentError: (state, action) => {
      return {
        ...state,
        updaeCommentError: action.payload.error,
        updateCommentLoading: false,
      };
    },
    startUpdateCommentLoading: (state, action) => {
      return { ...state, updateCommentLoading: true };
    },
    stopUpdateCommentLoading: (state, action) => {
      return { ...state, updateCommentLoading: false };
    },
  },
  pushComment: (state, action) => {
    const {
      comment,
      id_user,
      id_recipe,
      date_comment,
    } = action.payload;

    //elle me retourne le state complete avec le recipe ajouté

    return {
      ...state,
      comments: [...state.comments, {
        comment,
        id_user,
        id_recipe,
        date_comment,
      }]
    };
  },
});

export const {
  addCommentError,
  stopCommentLoading,
  startCommentLoading,
  addComment,
  updateCommentForm,
  stopCommentgetLoading,
  startCommentGetLoading,
  CommentGetError,
  addComments,
  updateTextP,
  fillCommentForm,
  stopUpdateCommentLoading,
  startUpdateCommentLoading,
  updateCommentError,
  updateCommentFormSet,
  pushComment,
} = commentSlice.actions;

export default commentSlice.reducer;
