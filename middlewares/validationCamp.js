const { validationResult } = require("express-validator");

const validations = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.json({ error: err.array() });
  }

  next();
};

module.exports = { validations };
