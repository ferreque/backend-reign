const { Router } = require("express");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");
const { validations } = require("../middlewares/validationCamp");

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validations,
  ],
  login
);

module.exports = router;
