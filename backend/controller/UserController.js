const Users = require("../model/UserModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function getUser(req, res, next) {
  const profile = await Users.find();
  res.status(200).json({
    profile,
  });
}

async function createUser(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill, all the required fields",
    });
  }

  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User with this email already existed",
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

async function Loginhandler(req, res) {
  const { email, password } = req.body; // ✅ was missing

  console.log("Login data:", req.body);

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all the required fields",
    });
  }

  const existingUser = await Users.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({
      message: "User with this email doesn't exist",
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
  getUser,
  createUser,
  Loginhandler,
};
