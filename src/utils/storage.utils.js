export const getFromStorage = (key) => {
  // recup des data depuis localStorage au format string
  // si la cle fournit n'existe pas alors stringData est null
  const stringData = localStorage.getItem(key);
  // si stringData est null, return null
  if (!stringData) return null;
  // sinon return stringData de maniere parse
  return JSON.parse(stringData);
};

export const setToStorage = (key, data) => {
  // enregistrement d'une donnee dans le localStorage au format json
  // a l'aide d'une cle fournie
  localStorage.setItem(key, JSON.stringify(data));
};

export const clearStorage = () => {
  // effacement de tout le local storage
  localStorage.clear();
};
