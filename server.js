const express = require("express");
const dotenv = require("dotenv").config();

const appRoute = require("./routes/contactRoute");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorHandler");
const DB = require("./config/dbConnection");

DB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts", appRoute);
app.use("/api/users", userRoute);

// Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
