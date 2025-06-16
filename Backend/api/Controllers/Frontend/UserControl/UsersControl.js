const userModel = require("../../../Models/Frontend/UserModel/userModel.js");
const sendmail = require("../../../Utils/sendmail.js");
const generatePassword = require("../../../Utils/generatePassword.js");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "users-Taxi-Time-Token";
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const Schema = Joi.object({
  first_name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
  }),
  last_name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .min(10)
    .max(10)
    .messages({
      "string.empty": "Mobile number is required",
      "string.pattern.base": "Mobile number must be exactly 10 digits",
      "string.min": "Mobile number must be at least 10 characters",
      "string.max": "Mobile number must be at most 10 characters",
    }),
  password: Joi.string()
    .pattern(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    )
    .min(6)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base":
        "Password requirements: 8-20 characters, 1 number, 1 capital letter, 1 lowercase letter, 1 symbol",
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
});
const getUsers = (req, res) => {
  userModel.getallUSers((err, result) => {
    if (err) {
      console.error("Error getting users from database:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("Got users from database:", result);
    res.json(result);
  });
};

const registerUser = async (req, res) => {
  const { error } = Schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }
  const { first_name, last_name, mobile, email, password, confirm_password } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  userModel.cheackemailexist(email, (err, result) => {
      if (err) {
        return res
          .status(err.status || 500)
          .json({ error: err.message || "Database error" });
      }
  
  const newUser = { first_name, last_name, mobile, email, hashedPassword };

  userModel.createUser(newUser, (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("User registered successfully:", result);
    res.status(200).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  });
});
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email ) {
    return res.status(400).json({ error: ["Email are required"] });
  }
  if (!password ) {
    return res.status(400).json({ error: ["Password are required"] });
  }

  userModel.loginUser({ email }, async (err, result) => {
    if (err) {
      console.error("Error getting user from database:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(400).json({ error: ["Your Email Not Found "] }); 
    }
    const user = result[0];
    console.log(result[0]);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, error: ["Invalid password"] });
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "10h",
    });
    console.log(token);
    res.cookie("userToken", token, {
      secure: true,
      sameSite: "Strict",
      maxAge: 10 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful"  , token});
  });
};

const sendotp = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email are required"});
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  userModel.finedemail({ email }, (err, result) => {
    if (err) {
      console.error("Error getting user from database:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid Email" });
    }
    userModel.updateotp({ email, otp }, (err, result) => {
      if (err) {
        console.error("Error getting user from database:", err);
        return res.status(500).json({ error: "Database error" });
      }
      const subject = "Your Verification Code";
      const text = `Your verification code is:${otp}`;
      const type = "otp";
      const data = { otp };

      sendmail(email, subject, text,type, data, (err, result) => {
        if (err) {
          console.error("Error getting user from database:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "otp sent successfully" });
      });
    });
  });
};
const verifyotp = (req, res) => {
  const { otp } = req.body;
  // console.log( otp);
  if (!otp) {
    return res.status(400).json({error:"please enter your opt"})
  }

  userModel.selectotp({ otp }, async (err, result) => {
    if (err) {
      console.error("Error getting user from database:", err);
    }
    console.log(result);

    if (result.length > 0) {
      const password = generatePassword();
      console.log(password);
 const hashedPassword = await bcrypt.hash(password, 10);

      userModel.updatepassword({ otp, hashedPassword }, (err, result) => {
        if (err) {
          console.error("Error getting user from database:", err);
        }
        console.log(result);

        userModel.selectemail({ otp }, (err, result) => {
          if (err) {
            console.error("Error getting user from database:", err);
          }
          if (result.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
          }
          const email = result[0].email;
          console.log(email);

          const subject = "Your New Password";
          const text = `Your new password is:${password}`;
          const type = "password";
          const data = { password };
          sendmail(
            email,
            subject,
            text,
            type,
            data,
            (err, result) => {
              if (err) {
                console.error("Error getting user from database:", err);
              }
              res
                .status(200)
                .json({ message: "Password changed successfully" });
            }
          );
        });
      });
    } else {
      return res.status(400).json({ error: "Invalid OTP " });
    }
  });
};

module.exports = { getUsers, registerUser, loginUser, sendotp, verifyotp };
