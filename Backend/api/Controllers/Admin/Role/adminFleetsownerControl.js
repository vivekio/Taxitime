const fleetsownerModel = require("../../../Models/Admin/Role/adminFleetsownerModel");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const Schema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
  }),
  company: Joi.string().min(2).max(50).required().messages({
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
  name: Joi.string().min(2).max(50).messages({
    "string.min": "First name must be at least 2 characters",
  }),
  company: Joi.string().min(2).max(50).messages({
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
  logo: Joi.string().optional(),
});

const lidtfleetsowner = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  fleetsownerModel.listfleetsowner(offset , limit, (err, fleets , totalfleets) => {
    if (err) {
      console.error("error listfleetsowner ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({
      fleets,
      totalfleets,
      currentPage : page,
      totalPages: Math.ceil(totalfleets / limit),});
  });
};

const editgetfleetsowner = (req, res) => {
  const id = req.params.id;
  fleetsownerModel.editgetfleetsowner(id, (err, result) => {
    if (err) {
      console.error("error editgetfleetsowner ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

const editFleetsOwner = (req, res) => {
  const { error } = updataSchema.validate(req.body || {}, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }

  const id = req.params.id;

  const { name, company, email, mobile } = req.body;

  const logo = req.file ? req.file.filename : null; // Handle file upload
  console.log("Uploaded Logo:", logo);
  fleetsownerModel.cheackemailexistupdate(email, id, (err, result) => {
    if (err) {
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Database error" });
    }

    fleetsownerModel.editfleetsowner(
      id,
      { name, company, email, mobile, logo },
      (err, result) => {
        if (err) {
          console.error("Error in editFleetsOwner:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res
          .status(200)
          .json({ message: "Fleet owner updated successfully", data: result });
      }
    );
  });
};

const addnewfleetsowner = async (req, res) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }

  const { name, company, email, mobile, password, confirm_password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const logo = req.file ? `${req.file.filename}` : null;
  const newusers = { name, company, email, mobile, hashedPassword, logo };
  fleetsownerModel.cheackemailexist(email, (err, result) => {
    if (err) {
      // console.error("Error in cheackemailexist controller:", err);
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Database error" });
    }
    fleetsownerModel.addnewfleetsowner(newusers, (err, result) => {
      if (err) {
        console.error("addnewfleetsowner", err);
      }
      res.status(200).json({ message: "fleet owner registered successfully" });
    });
  });
};

const deletefleetowner = (req, res) => {
  const id = req.params.id;
  fleetsownerModel.deletefleetowner(id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send("Fleet owner deleted successfully");
  });
};
module.exports = {
  lidtfleetsowner,
  editgetfleetsowner,
  editFleetsOwner,
  addnewfleetsowner,
  deletefleetowner,
};
