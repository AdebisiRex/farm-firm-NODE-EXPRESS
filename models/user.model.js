const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const {farmSchema} = require("./farm.model")

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  farmID:String,
  password: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

let saltround = 8;
userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, saltround, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      this.password = result;
      next();
    }
  });
});

userSchema.methods.validatePassword = function (password, callback) {
  
  console.log(password);
  bcrypt.compare(password, this.password, (err, same) => {
    if (!err) {
      callback(err, same);
    } else {
      next();
    }
  });
};

const registerModel = mongoose.model("user_details", userSchema);
module.exports = registerModel;
