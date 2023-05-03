const nameIsValid = (name) => {
  const regex = new RegExp("^[a-zA-Z ]*$");
  if (regex.test(name)) {
    return true;
  }
  return false;
};

export { nameIsValid };
