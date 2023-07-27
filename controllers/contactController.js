// @desc GET all contacts from the database
// @route GET /api/contacts
// @access public

const getAllContacts = (req, res) => {
  res.status(200).json({ message: "GET from contacts route" });
};

// @desc GET a particular contact with a particular id
// @route GET /api/products:id
// @access public

const getContact = (req, res) => {
  res.status(200).json({ message: `GET from contacts route ${req.params.id}` });
};

// @desc POST request for contacts
// @route POST /api/contacts
// @access public

const postContact = (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Data required");
  }
  res.status(200).json({ message: "POST from contacts route" });
};

// @desc PUT request for contacts
// @route /api/contacts/:id
// @access public

const putContact = (req, res) => {
  res.status(200).json({ message: `PUT from contacts route ${req.params.id}` });
};

// @desc DELETE request for contacts
// @route /api/contacts/:id
// @access public

const deleteContact = (req, res) => {
  res
    .status(200)
    .json({ message: `DELETE from contacts route ${req.params.id}` });
};

module.exports = {
  getAllContacts,
  getContact,
  postContact,
  putContact,
  deleteContact,
};
