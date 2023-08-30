const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  title: { type: String, require: true },
  date: { type: Date, require: true },
  part: { type: String, require: true },
  businessId: { type: String, require: true, index: true },
  employeeId: { type: String, require: true, index: true },
});

mongoose.model("expenses", expenseSchema);
