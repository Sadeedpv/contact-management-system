const express = require("express");
const dotenv = require("dotenv").config();

const appRoute = require("./routes/contactRoute");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts", appRoute)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
