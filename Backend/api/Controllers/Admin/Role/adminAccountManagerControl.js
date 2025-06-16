const AccountManagerModel = require("../../../Models/Admin/Role/adminAccountManagerModel");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const Schema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
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
});
const listaccountmanager = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  AccountManagerModel.listaccountmanager(offset , limit,(err, accounts , totalAccounts) => {
    if (err) {
      console.error("error listfleetsowner ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({
      accounts,
      totalAccounts,
      currentPage : page,
      totalPages: Math.ceil(totalAccounts / limit),
    });
  });
};

const editgetaccountmanager = (req, res) => {
  const id = req.params.id;
  AccountManagerModel.editgetaccountmanager(id, (err, result) => {
    if (err) {
      console.error("error editgetfleetsowner ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

const editaccountmanager = (req, res) => {
  // console.log(req.body);

  const { error } = updataSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }
  const id = req.params.id;
  const { name, email, mobile } = req.body;
  // console.log(req.body);

  AccountManagerModel.cheackemailexistupdate(email, id, (err, result) => {
    if (err) {
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Database error" });
    }

    AccountManagerModel.editaccountmanager(
      id,
      { name, email, mobile },
      (err, result) => {
        if (err) {
          console.log("Error in editFleetsOwner:", err);
          return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json(result);
      }
    );
  });
};

const deleteaccountmanager = (req, res) => {
  const id = req.params.id;
  AccountManagerModel.deleteaccountmanager(id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send("account manager deleted successfully");
  });
};
const addnewaccountmanager = async (req, res) => {
  const { error } = Schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }
  const { name, email, mobile, password, confirm_password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(req.body);
  dispatchermodel.cheackemailexist(email, (err, result) => {
    if (err) {
      // console.error("Error in cheackemailexist controller:", err);
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Database error" });
    }
    try {
      const newuser = { name, email, mobile, hashedPassword };
      AccountManagerModel.addaccountmanager(newuser, (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "User registered successfully" });
      });
    } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
};

module.exports = {
  listaccountmanager,
  editgetaccountmanager,
  editaccountmanager,
  deleteaccountmanager,
  addnewaccountmanager,
};
