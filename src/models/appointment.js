// models/LabTestAppointment.js

const mongoose = require("mongoose");

const labTestAppointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  testPrice: {
    type: Number,
    required:true,
    
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  testDestination: {
    type: String,
    required: true,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const LabTestAppointment =
  mongoose.models.LabTestAppointment ||
  mongoose.model("LabTestAppointment", labTestAppointmentSchema);

module.exports = LabTestAppointment;
