const mongoose = require("mongoose");
const joi = require("joi");
const joigoose = require("joigoose")(mongoose);

const userJoiSchema = joi.object({
  displayName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.string(),
});

const userSchema = new mongoose.Schema(joigoose.convert(userJoiSchema));

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
