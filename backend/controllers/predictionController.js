const Prediction = require("../models/Prediction");

// Save Prediction
const savePrediction = async (req, res) => {
  try {
   const { date } = req.body;

const prediction = await Prediction.findOneAndUpdate(
  { date },
  req.body,
  {
    new: true,
    upsert: true,
  }
);

    res.status(201).json({
      message: "Prediction Saved Successfully",
      prediction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Prediction History
const getPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find().sort({
      createdAt: -1,
    });

    res.status(200).json(predictions);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  savePrediction,
  getPredictions,
};