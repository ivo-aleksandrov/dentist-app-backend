const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, "Name is mandatory!"],
  },
  description: {
    type: String,
    required: [true, "Description is mandatory!"],
  },
  date: {
    type: String,
    required: [true, "Date is mandatory!"],
    trim: true,
  },
  startTime: {
    type: String,
    required: [true, "Start time is mandatory!"],
    trim: true,
  },
  endTime: {
    type: String,
    required: [true, "End time is mandatory!"],
    trim: true,
  },
});

module.exports = mongoose.model("Events", eventsSchema);
