const jwt = require("jsonwebtoken");
const TOKENKEY = "Provider-Taxi-Time-Token"
const userverifyToken = (req, res, next) => {
  const token = req.cookies.providerToken;
  // console.log("this is token",token);
  

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token avalibale" });
  }

  try {
    const decoded = jwt.verify(token, TOKENKEY);
    req.partnerID = decoded.id;
    req.partnerEmail = decoded.email;
    next();
  } catch (error) {
    console.log("this token ero", error);

    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = userverifyToken;