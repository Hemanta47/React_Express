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

module.exports = {
  verifyUserController,
};
