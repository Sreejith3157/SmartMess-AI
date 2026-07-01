const express = require("express");
const router = express.Router();

const {
  getStudentCount,
} = require("../controllers/dashboardController");

router.get("/students", getStudentCount);

module.exports = router;