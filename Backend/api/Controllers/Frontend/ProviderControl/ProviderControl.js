const providerModel = require("../../../Models/Frontend/Providermodel/ProviderModel");
const sendmail = require("../../../Utils/sendmail");
const generatePassword = require("../../../Utils/generatePassword");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "Provider-Taxi-Time-Token";
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
  service: Joi.string().required().messages({
    "string.empty": "Service is required",
  }),
  service_model: Joi.string().required().messages({
    "string.empty": "Service model is required",
  }),
  service_number: Joi.string().required().messages({
    "string.empty": "Service number is required",
  }),
});
const getservicename = (req, res) => {
  providerModel.getserviceTypes((err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

const registerProvider = async (req, res) => {
  const { error } = Schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }
  const {
    first_name,
    last_name,
    email,
    password,
    mobile,
    service,
    service_model,
    service_number,
    confirm_password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  providerModel.cheackemailexist(email, (err, result) => {
    if (err) {
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Database error" });
    }
    providerModel.createProvider(
      { first_name, last_name, email, hashedPassword, mobile },
      (err, provider_id) => {
        if (err) {
          console.error("Error inserting provider:", err);
          return res.status(500).json({ error: "Database error" });
        }

        providerModel.createProviderService(
          { provider_id, service, service_model, service_number },
          (err, result) => {
            if (err) {
              console.error("Error inserting provider service:", err);
              return res.status(500).json({ error: "Database error" });
            }

            res.status(200).json({
              message: "Provider registered successfully",
              provider_id,
            });
          }
        );
      }
    );
  });
};

const loginProvider = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  providerModel.loginProvider({ email }, async (err, result) => {
    if (err) {
      console.error("Error getting user from database:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(400).json({ error: "email does not exist" });
    }
    const user = result[0];
    console.log(result[0]);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, error: " Invalid password" });
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "10h",
    });
    console.log(token);
    res.cookie("providerToken", token, {
      secure: true,
      sameSite: "Strict",
      maxAge: 10 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token });
  });
};

const Providersendotp = (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  providerModel.finedemail({ email }, (err, result) => {
    if (err) {
      console.error("Error getting user from database:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(400).json({ error: "email does not exist" });
    }
    providerModel.updateotp({ email, otp }, (err, result) => {
      if (err) {
        console.error("Error getting user from database:", err);
        return res.status(500).json({ error: "Database error" });
      }
      const subject = "Your Verification provider  Code";
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

const Providerverifyotp = (req, res) => {
  const { otp } = req.body;
  // console.log(otp);
  if (!otp) {
    return res.status(400).json({error:"please enter your opt"})
  }

  providerModel.selectotp({ otp }, async (err, result) => {
    if (err) {
      console.error("Error getting user from database:", err);
    }
    console.log(result);

    if (result.length > 0) {
      const password = generatePassword();
      console.log(password);
      const hashedPassword = await bcrypt.hash(password, 10);

      providerModel.updatepassword({ otp, hashedPassword }, (err, result) => {
        if (err) {
          console.error("Error getting user from database:", err);
        }
        console.log(result);

        providerModel.selectemail({ otp }, (err, result) => {
          if (err) {
            console.error("Error getting user from database:", err);
          }
          if (result.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
          }
          const email = result[0].email;
          console.log(email);
          const subject = "Your New Password Provider";
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

module.exports = {
  getservicename,
  Providerverifyotp,
  registerProvider,
  loginProvider,
  Providersendotp,
};
