const { Router } = require("express");
const { check } = require("express-validator");
const { validations } = require("../middlewares/validationCamp");
const router = Router();
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/users");
const { validatJWT } = require("../middlewares/jwt-validation");

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "The password must be at least 6 characters").isLength({
      min: 6,
      max: 18,
    }),
    check("email", "Invalid email").isEmail(),
    validations,
  ],
  usersPost
);

router.put(
  "/:id",
  [validatJWT, check("id", "Invalid Id").isMongoId(), validations],
  usersPut
);

router.delete(
  "/:id",
  [validatJWT, check("id", "Invalid Id").isMongoId(), validations],
  usersDelete
);

module.exports = router;
