const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema(
  {
    userID: { type: String, required: true },
  },
  { timestamps: true }
);
const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
