const User = require("../data/User");

const GETUser = async (req, res) => {
  const users = await User.find();
  res.json(users);
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
