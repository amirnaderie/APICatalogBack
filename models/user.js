const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const object = require("joi/lib/types/object");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    minlength: 0,
    maxlength: 1024,
  },
  address: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
  },
  tel: {
    type: String,
    required: false,
    minlength: 4,
    maxlength: 11,
  },
  refreshToken: {
    type: String,
    maxlength: 1024,
  },
  usergroupid: {
    type: Number,
  },
  permissions: {
    type: Object,
  },
  quota: {
    type: Number,
    min: 1,
  },
  maxSizeFileToUpload: {
    type: Number,
  },
  active: {
    type: Boolean,
  },
  blacklist: {
    type: String,
    maxlength: 62,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      address: this.address,
      tel: this.tel,
      usergroupid: this.usergroupid,
      permissions: this.permissions,
      quota: this.quota,
      maxSizeFileToUpload: this.maxSizeFileToUpload,
      blacklist:this.blacklist
    },
    config.get("jwtPrivateKey"),
    { expiresIn: "120s" }
  );

  const refreshToken = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    config.get("jwtPrivateKey"),
    { expiresIn: "300s" }
  );
  return { token, refreshToken };
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  try {
    const schema = {
      name: Joi.string().min(2).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255),
      address: Joi.string().min(5).max(255),
      tel: Joi.string().min(4).max(11),
      quota: Joi.number(),
      refreshToken: Joi.string().max(1024),
      usergroupid: Joi.number(),
      permissions: Joi.object(),
      maxSizeFileToUpload: Joi.number(),
      active: Joi.boolean().default(true),
      blacklist: Joi.string().max(1024),
    };

    return Joi.validate(user, schema);
  } catch (error) {
    throw error;
  }
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
