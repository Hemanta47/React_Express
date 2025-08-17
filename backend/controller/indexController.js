const Profile = require("../model/ProfileModel");

// api/verify/me - get
// users
function verifyUserController(req, res) {
  const user = req.user;
  if (user) {
    res.status(200).json({
      message: "User is Athenticated",
    });
  } else {
    res.status(401).json({
      message: "User isnot Athenticated",
    });
  }
}

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json({
      message: "Profile found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

module.exports = {
  verifyUserController,
  getProfile,
};
