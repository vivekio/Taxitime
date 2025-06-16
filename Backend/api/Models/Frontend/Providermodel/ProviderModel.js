const db = require("../../../config/dbconnection");
const currentTimeandDate = require("../../../Utils/currentTimeAndDate");

const getserviceTypes = (callback) => {
  const sql = "SELECT id , name FROM service_types";
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const createProvider = (providerData, callback) => {
  const { first_name, last_name, email, hashedPassword, mobile } = providerData;
  const created_at = currentTimeandDate();
  const sql = `INSERT INTO providers (first_name, last_name, email, password, mobile , created_at) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [first_name, last_name, email, hashedPassword, mobile , created_at],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.insertId); // Return the provider ID
    }
  );
};
const createProviderService = (providerServiceData, callback) => {
  const { provider_id, service, service_model, service_number } =
    providerServiceData;
    const created_at = currentTimeandDate();
  const sql = `INSERT INTO provider_services (provider_id, service_type_id, service_model, service_number , created_at) VALUES (?, ?, ?, ?,?)`;

  db.query(
    sql,
    [provider_id, service, service_model, service_number , created_at],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};
const cheackemailexist = (email, callback) => {
  const query = "SELECT email FROM providers WHERE email = ?";
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

const loginProvider = (newUser, callback) => {
  const query = "SELECT * FROM providers WHERE email = ?";
  db.query(query, [newUser.email], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};

const finedemail = (newUser, callback) => {
  const query = "SELECT * FROM providers WHERE email = ?";
  db.query(query, [newUser.email], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};
const updateotp = (newUser, callback) => {
  const query = `UPDATE providers 
SET otp = ?, updated_at = NOW() 
WHERE email = ?`;
  db.query(query, [newUser.otp, newUser.email], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};

const selectotp = (newUser, callback) => {
  const query = "SELECT * FROM providers WHERE otp = ?";
  db.query(query, [newUser.otp], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};
const updatepassword = (newUser, callback) => {
  const updated_at = currentTimeandDate();
  const query = "UPDATE providers SET password = ? , updated_at = ? WHERE otp = ?";
  db.query(query, [newUser.hashedPassword, updated_at , newUser.otp  ], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};
const selectemail = (newUser, callback) => {
  const query = "SELECT email FROM providers WHERE otp = ?";
  db.query(query, [newUser.otp], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
    }
    callback(null, result);
    // console.log(result);
  });
};
module.exports = { getserviceTypes ,selectotp ,selectemail ,updatepassword , updateotp, createProvider, createProviderService , loginProvider ,finedemail , cheackemailexist };
