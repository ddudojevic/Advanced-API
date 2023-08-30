const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, require: true },
  ownerId: { type: String },
});

mongoose.model("users", userSchema);
