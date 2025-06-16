const db = require("../../../config/dbconnection");

const listfleetsowner = (offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totalfleets FROM fleets";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totalfleets = countResult[0].totalfleets;

  query = "SELECT * FROM fleets  ORDER BY id DESC LIMIT ?, ?";
  db.query(query, [offset, limit], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result , totalfleets);
  });
  });
};

const editgetfleetsowner = (id, callback) => {
  const query = "SELECT * FROM fleets WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    callback(null, result);
  });
};

const editfleetsowner = (userId, userData, callback) => {
  const { name, company, email, mobile, logo } = userData;

  // const query = `UPDATE fleets SET name = ?, company = ?, email = ?, mobile = ?, logo = ? WHERE id = ?`;
  const query = `UPDATE fleets SET 
    name = COALESCE(?, name), 
    company = COALESCE(?, company), 
    email = COALESCE(?, email), 
    mobile = COALESCE(?, mobile), 
    logo = COALESCE(?, logo) 
WHERE id = ?`;
  db.query(
    query,
    [name, company, email, mobile, logo, userId],
    (err, result) => {
      if (err) {
        console.error("Error editing fleet owner:", err);
        return callback(err, null); // Properly return the error
      }
      callback(null, result); // Pass the result to the callback
    }
  );
};

const addnewfleetsowner = (userData, callback) => {
  const { name, company, email, mobile, hashedPassword, logo } = userData;
  const query = `INSERT INTO fleets (name, company, email, mobile, password, logo) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [name, company, email, mobile, hashedPassword, logo],
    (err, result) => {
      if (err) {
        console.error("newuser ", err);
      }
      callback(null, result);
    }
  );
};

const deletefleetowner = (id, callback) => {
  const query = "DELETE FROM fleets WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    callback(null, result);
  });
};
const cheackemailexist = (email, callback) => {
  const query = "SELECT email FROM fleets WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("error cheackemailexist ", err);
    }

    if (result.length > 0) {
      return callback({ status: 400, message: [" Email already exists "] });
    }
    callback(null, false);
  });
};

const cheackemailexistupdate = (email, userID, callback) => {
  const query = "SELECT email FROM fleets WHERE email = ? AND id != ?";
  db.query(query, [email, userID], (err, result) => {
    if (err) {
      return console.error("error cheackemailexist ", err);
    }
    if (result.length > 0) {
      return callback({ status: 401, message: ["Email already exists"] });
    }
    callback(null, false);
  });
};
module.exports = {
  listfleetsowner,
  editgetfleetsowner,
  editfleetsowner,
  addnewfleetsowner,
  deletefleetowner,
  cheackemailexist,
  cheackemailexistupdate,
};
