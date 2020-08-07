const Mongoose = require("mongoose");
const revenueSchema = new Mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = Mongoose.model("revenues", revenueSchema);
