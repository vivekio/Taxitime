const adminUserModel = require("../../../Models/Admin/Role/adminUserModel");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const userSchema = Joi.object({
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

const updataSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).messages({
    "string.min": "First name must be at least 2 characters",
  }),
  last_name: Joi.string().min(2).max(50).messages({
    "string.min": "Last name must be at least 2 characters",
  }),
  email: Joi.string().email().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .min(10)
    .max(10)
    .messages({
      "string.empty": "Mobile number is required",
      "string.pattern.base": "Mobile number must be exactly 10 digits",
      "string.min": "Mobile number must be at least 10 characters",
      "string.max": "Mobile number must be at most 10 characters",
    }),
  picture: Joi.string().optional(),
});

const getusersadmin = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  adminUserModel.listusers(offset , limit, (err, users , totalUsers) => {
    if (err) {
      console.error("Error getting users from database:", err);
      return res.status(500).json({ error: "Database error" });
    }
    // console.log("Got users from database:", result);
    res.json( {
      users,
      totalUsers,
      currentPage : page,
      totalPages: Math.ceil(totalUsers / limit),
  });
  });
};

const edituseradmin = (req, res) => {
  const { error } = updataSchema.validate(req.body || {}, {
    abortEarly: false,
  });
  console.log(" this get dtata from ui ", req.body);

  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }
  const userId = req.params.id;
  const { first_name, last_name, email, mobile } = req.body;
  const picture = req.file ? `${req.file.filename}` : null;
  console.log("picture", picture);

  adminUserModel.cheackemailexistupdate(email, userId, (err, result) => {
    if (err) {
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Database error" });
    }

    adminUserModel.updateuseradmin(
      userId,
      { first_name, last_name, email, mobile, picture },
      (err, result) => {
        if (err) {
          console.error("Error updating user:", err);
          return res.status(500).json({ message: "Server error" });
        }
        if (result?.affectedRows > 0) {
          console.log("this is new data ");

          return res.status(200).json({ message: "User updated successfully" });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      }
    );
  });
};

const Updategetuser = (req, res) => {
  const id = req.params.id;

  adminUserModel.updategetuser(id, (err, result) => {
    if (err) {
      console.error("error updategetuser ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

const deleteuser = (req, res) => {
  const id = req.params.id;
  adminUserModel.deleteuser(id, (err, result) => {
    if (err) {
      console.error("deleteuser", err);
    }
    res.status(200).send("User deleted successfully");
  });
};

const addnewuser = async (req, res) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }

  const { first_name, last_name, email, mobile, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const picture = req.file ? `${req.file.filename}` : null;

  adminUserModel.cheackemailexist(email, (err, result) => {
    if (err) {
      // console.error("Error in cheackemailexist controller:", err);
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Database error" });
    }

    const newusers = {
      first_name,
      last_name,
      email,
      mobile,
      hashedPassword,
      picture,
    };
    adminUserModel.addnewuser(newusers, (err, result) => {
      if (err) {
        console.error("Error in addnewuser controller:", err);
        return res
          .status(err.status || 500)
          .json({ error: err.message || "Database error" });
      }
      res.status(200).json({ message: "User registered successfully" });
    });
  });
};
module.exports = {
  getusersadmin,
  edituseradmin,
  Updategetuser,
  deleteuser,
  addnewuser,
};
