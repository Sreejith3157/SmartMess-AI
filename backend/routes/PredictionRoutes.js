const express = require("express");

const router = express.Router();

const {
  savePrediction,
  getPredictions,
} = require("../controllers/predictionController");

router.post("/", savePrediction);

router.get("/", getPredictions);

module.exports = router;