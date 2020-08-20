const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  transType: { type: String, required: true },
  amount: { type: Number, required: true},
  comments: { type: String}
});


module.exports = mongoose.model("Transaction", transactionSchema);
