const db = require("../../../config/dbconnection");

const listaccountmanager =  (offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totalaccounts FROM accounts";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totalaccounts = countResult[0].totalaccounts;

  const query = "SELECT * FROM accounts ORDER BY id DESC LIMIT ?, ?";
  db.query(query,[offset, limit], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result ,totalaccounts);
  });
  });
};

const editgetaccountmanager = (id, callback) => {
  const query = "SELECT * FROM accounts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    callback(null, result);
  });
};

const editaccountmanager = (userId, userData, callback) => {
  const { name, email, mobile } = userData;

  const query =
    "UPDATE accounts SET name = ?, email = ?, mobile = ? WHERE id = ?";

  db.query(query, [name, email, mobile, userId], (err, result) => {
    if (err) {
      console.error("Error editing account manager:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

const deleteaccountmanager = (id, callback) => {
  const query = "DELETE FROM accounts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

const addaccountmanager = (userData, callback) => {
  const { name, email, mobile, hashedPassword } = userData;
  const query = `INSERT INTO accounts (name, email, mobile, password) VALUES (?, ?, ?, ?)`;
  db.query(query, [name, email, mobile, hashedPassword], (err, result) => {
    if (err) {
      console.error("newuser ", err);
    }
    callback(null, result);
  });
};
const cheackemailexist = (email, callback) => {
  const query = "SELECT email FROM accounts WHERE email = ?";
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
  const query = "SELECT email FROM accounts WHERE email = ? AND id != ?";
  db.query(query, [email, userID], (err, result) => {
    if (err) {
      return console.error("error cheackemailexist ", err);
    }

    if (result.length > 0) {
      console.log(result);

      return callback({ status: 400, message: ["Email already exists"] });
    }
    callback(null, false);
  });
};
module.exports = {
  cheackemailexistupdate,
  cheackemailexist,
  listaccountmanager,
  editgetaccountmanager,
  editaccountmanager,
  deleteaccountmanager,
  addaccountmanager,
};
