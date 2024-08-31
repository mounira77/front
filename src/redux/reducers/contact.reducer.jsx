import { createSlice } from "@reduxjs/toolkit";

const CONTACT_STATE = {
  messages: [],
  contact: null,
  contactLoading: false,
  contactError: null,
  contactForm: {
    message: null,

  },
  messageLoading: false,
  messageError: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState: CONTACT_STATE,
  reducers: {
    addContact: (state, action) => {
      const { message } = action.payload;

      return {
        ...state,

        contact: {
          ...state.contact,
          message,
        },
      };
    },
    updateContactForm: (state, action) => {
      const { value, inputName } = action.payload;

      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          [inputName]: value,
        },
      };
    },
    addMessages: (state, action) => {
      const message = action.payload;
console.log("reducer",message)
      //elle me retourne le state complete avec le recipe ajouté

      return {
        ...state,
        messages: message,
      };
    },

    addContactError: (state, action) => {
      return {
        ...state,
        contactError: action.payload.error,
        contactLoading: false,
      };
    },
    startContactLoading: (state, action) => {
      return { ...state, contactLoading: true };
    },
    stopContactLoading: (state, action) => {
      return { ...state, contactLoading: false };
    },
     addMessageError: (state, action) => {
    return {
      ...state,
      messageError: action.payload.error,
      messageLoading: false,
    };
  },
  startMessageLoading: (state, action) => {
    return { ...state, messageLoading: true };
  },
  stopMessageLoading: (state, action) => {
    return { ...state, messageLoading: false };
  },

  },
  //message
 


});

export const {
  addContactError,
  stopContactLoading,
  startContactLoading,
  addContact,
  updateContactForm,
  addMessageError,
  stopMessageLoading,
  startMessageLoading,
  addMessages,
} = contactSlice.actions;

export default contactSlice.reducer;
