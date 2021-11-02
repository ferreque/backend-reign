const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
  const users = await User.find({ state: true });
  res.json({
    msg: "GET users",
    users,
  });
};

const usersPost = async (req = request, res = response) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();
  res.json({
    msg: "User created",
    user,
  });
};

const usersPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, email, rol, password, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    msg: "PUT user",
    user,
  });
};

const usersDelete = async (req = request, res = response) => {
  const id = req.params.id;
  const body = req.body;
  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json({
    msg: `the user: ${user.email} whas deleted`,
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
