const asyncHandler = require("express-async-handler");

const Contacts = require("../models/contactModel");

// @desc GET all contacts from the database
// @route GET /api/contacts
// @access public

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find();
  res.status(201).json(contacts);
});

// @desc GET a particular contact with a particular id
// @route GET /api/products:id
// @access public

const getContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contacts.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc POST request for contacts
// @route POST /api/contacts
// @access public

const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Data required");
  }
  const contact = await Contacts.create({
    name,
    email,
    phone,
  });
  res.status(200).json(contact);
});

// @desc PUT request for contacts
// @route /api/contacts/:id
// @access public

const putContact = asyncHandler(async (req, res) => {
  const id = req.params.id
  const contact = await Contacts.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contacts.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  )
  res.status(200).json(updatedContact);
});

// @desc DELETE request for contacts
// @route /api/contacts/:id
// @access public

const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await contact.remove();
  res
    .status(200)
    .json(contact);
});

module.exports = {
  getAllContacts,
  getContact,
  postContact,
  putContact,
  deleteContact,
};
