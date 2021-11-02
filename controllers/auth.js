const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { genJWT } = require("../database/jwt-generator/jsonwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Wrong email or password",
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "Inactive user",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Wrong email or password",
      });
    }

    const token = await genJWT(user._id);

    res.json({
      msg: "Login OK",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error, contact the admin",
    });
  }
};

module.exports = { login };
