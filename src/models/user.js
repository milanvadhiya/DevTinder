const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       unique: true,
//       minlength: 3,
//       trim: true,
//     },
//     lastName: {
//       type: String,
//     },
//     emailId: {
//       type: String,
//       required: true,
//       lowercase: true,
//       trim: true,
//       validate(value) {
//         if (!validator.isEmail(value)) {
//           throw new Error("email is not valid !" + value);
//         }
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//       validate(value) {
//         if (!validator.isStrongPassword(value)) {
//           throw new Error("Enter a Strong Password !");
//         }
//       }
//     },
//       age: { type: Number, min: 18, max: 65 },
//       gender: {
//         type: String,
//         validate(value) {
//           if (!["male", "female", "other"].includes(value.toLowerCase())) {
//             throw new Error("gender data is not valid !");
//           }
//         },
//       },

//       photoUrl: {
//         type: String,

//         validate(value) {
//           if (!validator.isURL(value)) {
//             throw new Error("invalid phtoto URl !" + value);
//           }
//         },
//         default:
//           "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1725656292.jpg",
//       },

//       about: { type: String, default: "this is defaut about for user !" },
//       skills: { type: [String] },
//     },
  
//   { timestamps: true }
// );
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,

      required: true,
      index: true,
      minlength: 3,
      trim: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is not valid! " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password!");
        }
      },
    },
    age: { type: Number, min: 18, max: 65 },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value.toLowerCase())) {
          throw new Error("gender data is not valid!");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid photo URL! " + value);
        }
      },
      default:
        "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1725656292.jpg",
    },
    about: { type: String, default: "this is default about for user!" },
    skills: { type: [String] },
  },
  { timestamps: true }
);

User.index({ firstName: 1, lastName:1 });

userSchema.methods.getJwtToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Dev@$908", {
    expiresIn: "7d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

// const User = mongoose.model("User", userSchema);

// module.exports = { User };

//module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);

