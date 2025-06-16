const jwt = require("jsonwebtoken");
const TOKENKEY = "users-Taxi-Time-Token"
const userverifyToken = (req, res, next) => {
  const token = req.cookies.userToken;
  // console.log("this is token",token);
  

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token avalibale" });
  }

  try {
    const decoded = jwt.verify(token, TOKENKEY);
    req.userID = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    console.log("this token ero", error);

    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = userverifyToken;
