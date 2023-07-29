// models/LabTestAppointment.js

const mongoose = require('mongoose');

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
  testType: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  labName: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
});

const LabTestAppointment =
  mongoose.models.LabTestAppointment ||
  mongoose.model("LabTestAppointment", labTestAppointmentSchema);

module.exports = LabTestAppointment;
