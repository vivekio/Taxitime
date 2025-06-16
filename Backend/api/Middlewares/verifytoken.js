const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  //   console.log("this is token ", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token avalibale" });
  }

  try {
    const decoded = jwt.verify(token, "Admin-Taxi-Time-Token");
    req.adminID = decoded.id;
    req.adminEmail = decoded.email;
    next();
  } catch (error) {
    console.log("this token ero", error);

    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
