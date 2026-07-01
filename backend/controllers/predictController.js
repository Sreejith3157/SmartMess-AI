const { spawn } = require("child_process");
const path = require("path");
const axios = require("axios");
const predictWaste = async (req, res) => {
  try {
    const {
      menu_type,
      breakfast,
      lunch,
      dinner,
      students_present,
      day_of_week,
      holiday,
      rain,
      exam_day,
      festival,
    } = req.body;

    const pythonProcess = spawn("python", [
      path.join(__dirname, "../ml/predict.py"),
      menu_type,
      breakfast,
      lunch,
      dinner,
      students_present.toString(),
      day_of_week,
      holiday,
      rain,
      exam_day,
      festival,
    ]);

    let prediction = "";

    pythonProcess.stdout.on("data", (data) => {
      prediction += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    pythonProcess.on("close", () => {
      res.json({
        predictedWaste: prediction.trim(),
      });
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  predictWaste,
};