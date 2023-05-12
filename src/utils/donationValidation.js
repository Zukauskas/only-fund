const nameIsValid = (name) => {
  const regex = '^[a-zA-Z ]*$'
  if (regex.test(name)) {
    return true
  }
  return false
}

export { nameIsValid }
