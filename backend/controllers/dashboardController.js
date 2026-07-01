const User = require("../models/User");

const getStudentCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "student" });

    res.json({
      studentCount: count,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getStudentCount,
};