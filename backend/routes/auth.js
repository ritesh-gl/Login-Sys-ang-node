const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");

const verifyToken = require("../middleware/verifyJWT");
const errorhandling = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json(errors);
  next();
};
router.post(
  "/signup",
  [
    (body("name").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .withMessage("please enter valid email")
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject("Email address alreasdy exist");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 7 })),
  ],
  errorhandling,
  authController.signup
);

router.post("/login", authController.login);

router.post("/showData", [verifyToken], authController.showData);

module.exports = router;
