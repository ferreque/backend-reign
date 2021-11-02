const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validatJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRETKEY);
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        msg: "Invalid token - User doesen't exist",
      });
    }
    if (!user.state) {
      return res.status(401).json({
        msg: "Invalid token - Inactive user",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};
module.exports = { validatJWT };
