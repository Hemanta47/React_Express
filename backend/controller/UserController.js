const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Users = require("../model/UserModel");

// users/list - get
async function getUserList(req, res) {
  try {
    const users = await Users.aggregate([
      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "user",
          as: "profile",
        },
      },
      {
        $unwind: {
          path: "$profile",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          role: 1,
          "profile.bio": 1,
          "profile.profilePicture": 1,
        },
      },
    ]);

    res.status(200).json({ data: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// users/register - post
async function createUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill, all the required fields",
    });
  }

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User Existed",
    });
  }

  const encryptPassword = await bcrypt.hash(password, 10);

  const data = {
    name: name,
    email: email,
    password: encryptPassword,
  };

  const user = new Users(data);
  await user.save();
  res.status(201).json({
    message: "User created successfully",
    user: data,
  });
}

// users/login - post
async function Loginhandler(req, res) {
  const { email, password } = req.body;

  console.log("Login data:", req.body);

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all the required fields",
    });
  }

  const existingUser = await Users.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const checkPassword = await bcrypt.compare(password, existingUser.password);

  if (checkPassword) {
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.AUTH_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Login Successful",
      accessToken: token,
    });
  } else {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }
}

module.exports = {
  getUserList,
  createUser,
  Loginhandler,
};
