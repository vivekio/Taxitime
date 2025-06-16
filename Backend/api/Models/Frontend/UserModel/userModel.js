const db = require("../../../config/dbconnection");
const currentTimeandDate = require("../../../Utils/currentTimeAndDate");


const getallUSers = (callback) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error getting users from database:", err);
    }
    callback(result);
    // console.log(result);
  });
};
 
const createUser = (newUser, callback) => {
  const created_at = currentTimeandDate();
  const query = "INSERT INTO users (first_name, last_name, email, mobile, password ,created_at) VALUES (?, ?, ?, ?, ? , ?)";
  db.query(query, [newUser.first_name , newUser.last_name , newUser.email , newUser.mobile , newUser.hashedPassword , created_at ], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};
const cheackemailexist = (email, callback) => {
  const query = "SELECT email FROM users WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("error cheackemailexist ", err);
    }
    console.log("helooooooooooooooooooooo", result.length);
    if (result.length > 0) {
      console.log(result);

      return callback({ status: 400, message: [" Email already exists "] });
    }
    callback(null, false);
  });
};

const loginUser = (newUser, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [newUser.email], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};

const finedemail = (newUser, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [newUser.email], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};
const updateotp = (newUser, callback) => {
  const query = "UPDATE users SET otp = ? , updated_at = NOW() WHERE email = ?";
  db.query(query, [newUser.otp, newUser.email], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};

const selectotp = (newUser, callback) => {
  const query = "SELECT * FROM users WHERE otp = ?";
  db.query(query, [newUser.otp], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};
const updatepassword = (newUser, callback) => {
  const updated_at= currentTimeandDate();
  const query = "UPDATE users SET password = ? , updated_at = ? , updated_at = NOW()  WHERE otp = ?";
  db.query(query, [newUser.hashedPassword  , updated_at , newUser.otp], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};
const selectemail = (newUser, callback) => {
  const query = "SELECT email FROM users WHERE otp = ?";
  db.query(query, [newUser.otp], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};

module.exports = {
  getallUSers,
  createUser,
  loginUser,
  finedemail,
  updateotp,
  updatepassword,
  selectemail,
  selectotp,
  cheackemailexist
};
