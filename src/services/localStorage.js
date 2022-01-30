const getFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("cart"));
  return data !== null ? data : [];
};

const setInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const objToExport = {
getFromLocalStorage: getFromLocalStorage,
  setInLocalStorage: setInLocalStorage,
};

export default objToExport;
