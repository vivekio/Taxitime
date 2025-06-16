const loginModel = require("../../Models/Admin/loginModel");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "Admin-Taxi-Time-Token";
const jwt = require("jsonwebtoken");
const generatePassword = require("../../Utils/generatePassword");
const sendmail = require("../../Utils/sendmail.js");
// const cookieParser = require("cookie-p arser");

const adminlogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  loginModel.adminlogin(email, async (err, result) => {
    if (err)
      return res.status(500).json({ success: false, message: "Server error" });

    if (result.length === 0)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const admin = result[0];
    console.log(admin.id);
    
    console.log(result[0]);

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(token);
    res.cookie("token", token, {
      secure: true,
      sameSite: "Strict",
      maxAge: 3600000,
    });
    res
      .status(200)
      .json({ success: true, message: "Login successful!", token });
  });
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  loginModel.adminlogin(email, (err, result) => {
    if (err) {
      console.error("Error getting user from database:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const Email = result[0].email;
    const password = generatePassword();
    const hashedPassword = bcrypt.hashSync(password, 10);
    loginModel.updatepassword(email, hashedPassword, (err, result) => {
      if (err) {
        console.error("Error getting user from database:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Password changed successfully" });
      sendmail(
        Email,
        "Admin forgot password",
        `your new password :- ${password}`,
        (err, result) => {
          if (err) {
            console.error("Error getting user from database:", err);
            return res.status(500).json({ error: "password not sent" });
          }
          res.status(200).json({ message: "Password changed successfully" });
        }
      );
    });
  });
};
const getadmin = (req, res) => {
  const id = req.adminID
  loginModel.getadmindetail( id, (err, result) => {
    if (err) {
      res.status(500).send({
        error: "Internal Server Error",
      });
    } else {
      res.status(200).send(result);
    }
  });
};

const adminlogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successful!" });
};

module.exports = { adminlogin, adminlogout, forgotPassword , getadmin };
