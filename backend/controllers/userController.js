const User = require("../models/User");
const { formatUser } = require("../utils/Mapper");
const ROLES_LIST = require("../config/roles_list");
const GETUser = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search = "", role = "" } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const filter = {};

    if (search.trim()) {
      filter.$or = [
        {
          username: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          email: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    if (role) {
      filter[`roles.${role}`] = {
        $exists: true,
        $ne: null,
      };
    }

    const skip = (pageNumber - 1) * limitNumber;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select("_id username email roles createdAt updatedAt")
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      User.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNumber);

    return res.status(200).json({
      data: users.map(formatUser),

      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    });
  } catch (err) {
    next(err);
  }
};
const updateUserRoles = async (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;
  const isTargetingSelf = id === req.user;

  const isRemovingAdminRole = !roles?.Admin;

  try {
    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (isTargetingSelf && isRemovingAdminRole) {
      const adminCount = await User.countDocuments({
        "roles.Admin": ROLES_LIST.Admin,
      });

      if (adminCount <= 1) {
        return res.status(409).json({
          message: "You cannot remove the last administrator.",
        });
      }
    }
    user.roles = roles;

    await user.save();

    return res.status(200).json({
      message: "User roles updated successfully",
      data: formatUser(user),
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
