const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    users_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);