const validator = require("validator");
const { validate } = require("../models/user");

const validSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is required !");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid !" + emailId);
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Strong Password !");
  }
  return true;
};

const validLoginData = (req) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    throw new Error("email and password are required !");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid !" + emailId);
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Strong Password !");
  }
};

const validateUpdateData = (req) => {
  const allowedEditFildes = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isAlllowedUpdate=Object.keys(req.body).every((field) =>allowedEditFildes.includes(field));
  return isAlllowedUpdate;
};
module.exports = { validSignUpData, validLoginData ,validateUpdateData};
