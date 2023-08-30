const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
  name: { type: String, require: true },
  parts: { type: Map, of: String },
  ownerId: { type: String, require: true },
});

mongoose.model("businesses", businessSchema);
