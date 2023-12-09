const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
