const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },

    breakfast: String,

    lunch: String,

    dinner: String,

    predictedWaste: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Prediction",
  predictionSchema
);