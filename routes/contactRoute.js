const express = require("express");
const router = express.Router();

// CONTROLLERS

const {
  getAllContacts,
  getContact,
  postContact,
  putContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/tokenHandler");

// ROUTES

router.use(validateToken);
router.route("/").get(getAllContacts).post(postContact);

router.route("/:id").get(getContact).put(putContact).delete(deleteContact);

module.exports = router;
