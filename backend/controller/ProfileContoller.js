const Profile = require("../model/ProfileModel");
const mongoose = require("mongoose");

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userData = await Profile.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({ data: userData[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const createProfile = async (req, res) => {
  try {
    const data = req.body;

    const { id } = req.user;
    const finalData = {
      ...data,
      user: id,
    };

    const createProfile = new Profile(finalData);
    await createProfile.save();
    res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

module.exports = {
  getProfile,
  createProfile,
};
