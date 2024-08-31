import {
    addContactError,
    stopContactLoading,
    startContactLoading,
    addContact,
    stopMessageLoading,
    startMessageLoading,
    addMessageError,
    addMessages,

}
from "../redux/reducers/contact.reducer";
import { postRequest, getRequest } from "./api";






export const addContactThunk = () => async(dispatch, getState) => {

    const { contactLoading, contactForm } = getState().contactState;
    if (contactLoading) return
    console.log("la valeur du message", contactForm)
    dispatch(startContactLoading());
    const { result, status, error } = await getRequest("contact", contactForm);

    console.log(result)
    const contact = result.contact



    if (!result || status >= 400 || !!error)
        return dispatch(addContactError({ error: `Something goes wrong: ${error}` }));

    console.log("bonjooooooooor")

    dispatch(addContact({ message: contactForm.message }));

    dispatch(stopContactLoading());

}



export const getMessageThunk = () => async(dispatch, getState) => {

    const { messageLoading } = getState().contactState;
    if (messageLoading) return

    dispatch(startMessageLoading());
    console.log("bonjour")
    const { result, status, error } = await getRequest("contact/message");

    console.log(result);
    const message = result.messages
    console.log(message, "fgthyjkmpfffffffffffffffffffffffm")


    if (!result || status >= 400 || !!error)
        return dispatch(addMessageError({ error: `Something goes wrong: ${error}` }));

    console.log("bonjooooooooor")


    dispatch(addMessages(message));
    dispatch(stopMessageLoading());





};
