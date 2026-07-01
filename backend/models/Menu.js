const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    breakfast: {
      type: String,
      required: true,
    },

    lunch: {
      type: String,
      required: true,
    },

    dinner: {
      type: String,
      required: true,
    },

    date: {
  type: String,
  required: true,
  unique: true,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", menuSchema);