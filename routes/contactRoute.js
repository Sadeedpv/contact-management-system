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

// ROUTES

router.route("/").get(getAllContacts).post(postContact);

router.route("/:id").get(getContact).put(putContact).delete(deleteContact);

module.exports = router;
