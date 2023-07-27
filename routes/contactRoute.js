const express = require("express");
const router = express.Router();

// CONTROLLERS

const { getAllContacts } = require('../controllers/contactController');
const { getContact } = require('../controllers/contactController');
const { postContact } = require('../controllers/contactController');
const { putContact } = require('../controllers/contactController');
const { deleteContact } = require('../controllers/contactController');



// ROUTES

router.route("/").get(getAllContacts).post(postContact);

router.route("/:id").get(getContact).put(putContact).delete(deleteContact);

module.exports = router;