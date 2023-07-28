const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/userModel");

// @desc GET current user
// @route GET /api/users/currentUser
// @access private

const getUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @desc POST / register user
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // throw error if user already exists

  const availableUser = await Users.findOne({ email });
  const avaiableName = await Users.findOne({ username });
  if (availableUser || avaiableName) {
    res.status(400);
    throw new Error("User already exists");
  }

  // throw error if username fails certain conditions
  if (username.length > 20 || username.length < 3) {
    res.status(400);
    throw new Error(
      "Username should not be less than 3 characters and not more than 20 characters. Make sure that your username is unique."
    );
  }

  // Hash password and create user
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await Users.create({
    username,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc POST / login  user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await Users.findOne({ email });

  // Compare hashed password and userPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

module.exports = {
  getUser,
  registerUser,
  loginUser,
};
