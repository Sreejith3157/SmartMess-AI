const express = require("express");
const router = express.Router();

const { predictWaste } = require("../controllers/predictController");

router.post("/", predictWaste);

module.exports = router;