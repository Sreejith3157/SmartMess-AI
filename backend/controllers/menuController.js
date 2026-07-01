const Menu = require("../models/Menu");

// Add Menu
const addMenu = async (req, res) => {
  try {
    const { breakfast, lunch, dinner, date } = req.body;

    // Check if menu already exists
   const existingMenu = await Menu.findOne({ date });

console.log("Incoming date:", date);
console.log("Existing Menu:", existingMenu);

if (existingMenu) {
  existingMenu.breakfast = breakfast;
  existingMenu.lunch = lunch;
  existingMenu.dinner = dinner;

  await existingMenu.save();

  return res.status(200).json({
    message: "✅ Menu Updated Successfully",
    menu: existingMenu,
  });
}

    // Create new menu
    const newMenu = await Menu.create({
      breakfast,
      lunch,
      dinner,
      date,
    });

    res.status(201).json({
      message: "✅ Menu Added Successfully",
      menu: newMenu,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Menus
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ createdAt: -1 });

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addMenu,
  getMenus,
};