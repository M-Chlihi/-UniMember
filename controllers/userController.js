const User = require("../models/User");
const { formatUser } = require("../utils/Mapper");
const GETUser = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("_id username email roles createdAt updatedAt")
      .lean();

    return res.json({
      data: users.map(formatUser),
    });
  } catch (err) {
    next(err);
  }
};
const updateUserRoles = async (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;

  try {
    const user = await User.findById(id).exec();

    if (!user) {
      return res.sendStatus(404);
    }

    user.roles = roles;

    await user.save();

    return res.status(200).json({
      message: "User roles updated successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  updateUserRoles,
  GETUser,
};
