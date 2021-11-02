const { Router } = require("express");
const router = Router();
const {
  hitsGet,
  hitsGetAuthor,
  hitsGetTitle,
  hitsGetTags,
  hitsDelete,
} = require("../controllers/http");
const { validatJWT } = require("../middlewares/jwt-validation");

router.get("/", [validatJWT], hitsGet);
router.get("/author", [validatJWT], hitsGetAuthor);
router.get("/title", [validatJWT], hitsGetTitle);
router.get("/tags", [validatJWT], hitsGetTags);
router.delete("/:id", [validatJWT], hitsDelete);

module.exports = router;
