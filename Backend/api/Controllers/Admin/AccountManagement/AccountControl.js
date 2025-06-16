const accountmodel = require("../../../Models/Admin/AccuntManagement/AdminAccountModel");
const Joi = require("joi");
const Schema = Joi.object({
    account_name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Account name is required",
    "string.min": "First name must be at least 2 characters",
  }),
  bank_name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "bank name is required",
    "string.min": "Last name must be at least 2 characters",
  }),
  account_number: Joi.string().pattern(/^\d{6,18}$/).required().messages({
    "string.empty": "Account number is required",
    "string.pattern.base": "Invalid Account number format",
  }),
  IFSC_code: Joi.string()
    .pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .required()
    .messages({
      "string.empty": "IFSC Code is required.",
      "string.pattern.base": "Invalid IFSC Code. Format: 4 letters, 0, 6 alphanumeric.",
      
    }),
    type: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
});
const accountlist = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  accountmodel.Accountlist(offset , limit,(err, account , totalaccount) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send(
      {
        account,
        totalaccount,
        currentPage : page,
        totalPages: Math.ceil(totalaccount / limit),
      }
    );
  });
};

const AccountApprovedlist = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  accountmodel.AccountApprovedlist(offset , limit,(err, account , totalaccount) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send({
      account,
      totalaccount,
      currentPage : page,
      totalPages: Math.ceil(totalaccount / limit),
    });
  });
};
const accountstatusupdate = (req, res) => {
  const id = req.params.id;
  accountmodel.getaccountstatus(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    let currentStatus = result[0].status;
    let newStatus;

    if (currentStatus === "WAITING") {
      newStatus = "approved";
    } else {
      return res
        .status(500)
        .json({ message: "User is Appoverd, status cannot be changed" });
    }
    accountmodel.accountstatus(id, newStatus, (err, updateresult) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: `your account is ${newStatus}` });
    });
  });
};

const geteditaccount = (req, res) => {
  const id = req.params.id;

  accountmodel.geteditaccount(id, (err, result) => {
    if (err) {
      console.error("error updategetuser ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

const updateaccount = (req, res) => {
    console.log(req.body);

    
  const { error } = Schema.validate(req.body || {}, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }
  const id = req.params.id;

  const { account_name, bank_name, account_number, type, IFSC_code } = req.body;

  accountmodel.checkaccountnumber(
    account_number,
    id,
    (err, result) => {
      if (err) { return res
        .status(err.status || 500)
        .json({ error: err.message || "Database error" });
    }

  accountmodel.Upadateaccount(
    id,
    account_name,
    bank_name,
    account_number,
    type,
    IFSC_code,
    (err, result) => {
      if (err) {
        console.error("error updategetuser ", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "Dispatcher updated successfully" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }
  );
})
};

const deleteaccount = (req, res) => {
  const id = req.params.id;
  accountmodel.deleteaccount(id, (err, result) => {
    if (err) {
      console.error("error updategetuser ", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Account deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
};

module.exports = {
  accountlist,
  accountstatusupdate,
  AccountApprovedlist,
  geteditaccount,
  updateaccount,
  deleteaccount,
};
