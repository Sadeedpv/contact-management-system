const asyncHandler = require("express-async-handler");

const Contacts = require("../models/contactModel");

// @desc GET all contacts from the database
// @route GET /api/contacts
// @access private

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find({ users_Id: req.user.id });
  res.status(201).json(contacts);
});

// @desc GET a particular contact with a particular id
// @route GET /api/products:id
// @access private

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
// @access private

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
    users_Id: req.user.id,
  });
  res.status(200).json(contact);
});

// @desc PUT request for contacts
// @route /api/contacts/:id
// @access private

const putContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contacts.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Thow an error if another user is trying to alter the contacts
  if (contact.users_Id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to update this contact");
  }

  const updatedContact = await Contacts.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedContact);
});

// @desc DELETE request for contacts
// @route /api/contacts/:id
// @access private

const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // Thow an error if another user is trying to alter the contacts
  if (contact.users_Id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not authorized to update this contact");
  }
  await Contacts.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getAllContacts,
  getContact,
  postContact,
  putContact,
  deleteContact,
};
