const jwt = require("jsonwebtoken");

const genJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      { expiresIn: "2 days" },
      (err, token) => {
        if (err) {
          reject("Token generation error");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { genJWT };
