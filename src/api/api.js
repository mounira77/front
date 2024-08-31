const API_URL = "http://mounirahammoudi.sites.3wa.io:9001/";
import { getFromStorage } from "../utils/storage.utils";

//import {TokenStorage} from "../Utils/storage.utils"

//const getToken = TokenStorage.getFromStorage()

const getRequest = async (url, token = null) => {
  const config = {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  token = await getFromStorage("key");

  if (token) config.headers.Authorization = token;

  const response = await request(url, config);

  return response;
};

// post
const postRequest = async (url, body = {}, token = null) => {
  const config = {
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers:
      body instanceof FormData
        ? {}
        : { "Content-type": "application/json; charset=UTF-8" },
  };

  //recuperer le token depuis localstorage
  // et le mettre das le header de la requette post
  token = await getFromStorage("key");

  console.log("token", token);

  if (token) config.headers.Authorization = token;
  console.log("je suis ", token);

  return await request(url, config);
};

/////********************* */
const deleteRequest = async (url, token = null) => {
  const config = {
    method: "DELETE",

    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  //recuperer le token depuis localstorage
  // et le mettre das le header de la requette post
  token = await getFromStorage("key");
  //console.log("token",token)

  if (token) config.headers.Authorization = token;

  return await request(url, config);
};
////////********************** */

const request = async (url, config) => {
  let status = -1;
  let error = null;
  let result = null;

  try {
    const response = await fetch(`${API_URL}${url}`, config);

    status = response.status;
    result = await response.json();
    console.log("response", response);

    if (status >= 400) throw new Error(`Erreur ${status}: ${result?.message}`);
  } catch (e) {
    error = e.message;
  } finally {
    return { status, error, result };
  }
};
//update request
const updateRequest = async (url, body = {}, token = null) => {
  const config = {
    method: "PUT",
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers:
      body instanceof FormData
        ? {}
        : { "Content-type": "application/json; charset=UTF-8" },
  };

  token = await getFromStorage("key");
  console.log("token", token);

  if (token) config.headers.Authorization = token;

  return await request(url, config);
};

export { getRequest, postRequest, deleteRequest, updateRequest };
