function validateYes(value) {
  let valueLowerCase = value.toLowerCase();
  if (valueLowerCase.includes("yes")) {
    return true;
  } else {
    return false;
  }
}
module.exports = {
  validateYes,
};
