const mongoose = require("mongoose");

const labTestSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  govPrice: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  expectedResults: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  isFeatured: {
    type: Boolean,
    default: false, // Optional: You can set a default value if not provided during creation
  },
});

// const LabTest = mongoose.model("LabTest", labTestSchema);
const LabTest =
  mongoose.models.LabTest || mongoose.model("LabTest", labTestSchema);

module.exports = LabTest;
