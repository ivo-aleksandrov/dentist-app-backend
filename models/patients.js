const { Long } = require("bson");
const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory!"],
  },
  identityNumber: {
    type: String,
    required: [true, "Identity number is mandatory!"],
    unique: true,
    trim: true,
    minLength: 10,
    maxLength: 10,
  },
  city: {
    type: String,
    required: [true, "City is mandatory!"],
    trim: true,
  },
  adress: {
    type: String,
    required: [true, "Adress is mandatory!"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Age is mandatory!"],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "Gender is mandatory!"],
    enum: ["male", "female"],
  },
  birthDate: {
    type: String,
    required: [true, "Birth Date is mandatory!"],
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number is mandatory!"],
    trim: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  nextAppointment: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Patient", patientsSchema);
