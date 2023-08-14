const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  verificationToken: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);
module.exports = User;
