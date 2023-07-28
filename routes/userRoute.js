const express = require("express");
const router = express.Router();

const {
  getUser,
  registerUser,
  loginUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/tokenHandler");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/currentUser").get( validateToken,getUser);

module.exports = router;
