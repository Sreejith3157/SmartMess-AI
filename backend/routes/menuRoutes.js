const express = require("express");

const router = express.Router();

const {
  addMenu,
  getMenus,
} = require("../controllers/menuController");

router.post("/", addMenu);

router.get("/", getMenus);

module.exports = router;