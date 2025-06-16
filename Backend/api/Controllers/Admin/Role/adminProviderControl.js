const adminProviderModel = require("../../../Models/Admin/Role/adminProviderModel");
const bcrypt = require("bcryptjs");
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
    avatar: Joi.string().optional(),
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
    avatar: Joi.string().optional() 
});
const listproviders = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  adminProviderModel.listproviders(offset , limit, (err, provider , totalProviders) => {
    if (err) {
      console.error("listprovider", err);
    }
    res.status(200).json({
      provider,
      totalProviders,
      currentPage : page,
      totalPages: Math.ceil(totalProviders / limit),
    });
  });
};

const deleteprovider = (req, res) => {
  const id = req.params.id;
  adminProviderModel.deleteprovider(id, (err, result) => {
    if (err) {
      console.error("deletet provider", err);
    }
    res.status(200).send("User deleted successfully");
  });
};
const editgetproviders = (req, res) => {
  const id = req.params.id;
  adminProviderModel.editgetproviders(id, (err, result) => {
    if (err) {
      console.log(err);

      res.status(500).send(err);
    } else {
      res.send(result);
      // console.log(result);
    }
  });
};
const editprovider = (req, res) => {
  
  const { error } = updataSchema.validate(req.body || {}, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }
  const userId = req.params.id;
  const { first_name, last_name, email, mobile } = req.body;
  // console.log("file:", req.file);
  const avatar = req.file ? `${req.file.filename}` : null;
  adminProviderModel.cheackemailexistupdate(email, userId, (err, result) => {
      if (err) {
        return res
          .status(err.status || 500)
          .json({ error: err.message || "Database error" });
      }

  adminProviderModel.editprovider(
    userId,
    { first_name, last_name, email, mobile, avatar, userId },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      if (result?.affectedRows > 0) {
        return res.status(200).json({ message: "User updated successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }
  );
})
};
const addnewprovider = async (req, res) => {
  const { error } = Schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }
  const { first_name, last_name, email, mobile, password, confirm_password } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatar = req.file ? `${req.file.filename}` : null;
  adminProviderModel.cheackemailexist(email, (err, result) => {
    if (err) {
      console.error("Error in cheackemailexist controller:", err);
      return res
        .status(err.status || 500)
        .json({ error: err.message || "Database error" });
    } else {
      const newproviders = {
        first_name,
        last_name,
        email,
        mobile,
        hashedPassword,
        avatar,
      };
      adminProviderModel.addnewprovider(newproviders, (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        return res
          .status(200)
          .json({ message: "User registered successfully" });
      });
    }
  });
};

const statusprovider = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  adminProviderModel.getProviderStatus(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    let currentStatus = results[0].status;
    let newStatus;

    if (currentStatus === "onboarding") {
      newStatus = "approved";
    } else if (currentStatus === "approved") {
      newStatus = "banned";
    } else if (currentStatus === "banned") {
      newStatus = "approved";
    } else {
      return res.json({ message: "User is banned, status cannot be changed" });
    }

    adminProviderModel.updateProviderStatus(
      id,
      newStatus,
      (err, updateResult) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: `Status updated to ${newStatus}`, newStatus });
      }
    );
  });
};

module.exports = {
  listproviders,
  deleteprovider,
  editgetproviders,
  editprovider,
  addnewprovider,
  statusprovider,
};




