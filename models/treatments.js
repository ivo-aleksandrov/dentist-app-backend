const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema({
  tooth: {
    type: String,
    required: [true, "Tooth is mandatory!"],
  },
  identityNumber: {
    type: Number,
    required: [true, "Identity number is mandatory!"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is mandatory!"],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: String,
    required: [true, "Price is mandatory!"],
    trim: true,
  },
});

module.exports = mongoose.model("Treatments", treatmentSchema);
