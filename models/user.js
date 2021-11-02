const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
    enum: ["USER_ROLE", "ADMIN_ROLE"],
    default: "USER_ROLE",
  },
  state: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("User", UserSchema);
