  const db = require("../../../config/dbconnection");

const listdispatcher = (offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totaldispatchers FROM dispatchers";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totaldispatchers = countResult[0].totaldispatchers;
  query = "SELECT id,name, email, mobile FROM dispatchers ORDER BY id DESC LIMIT ?, ?";
  db.query(query,  [offset, limit], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result ,totaldispatchers);
  });
});
};

const editgetdiapatcher = (id, callback) => {
  const query = "SELECT * FROM dispatchers WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    callback(null, result);
  });
};

const updateDispatcher = (userId, name, email, mobile, callback) => {
  const query =
    "UPDATE dispatchers SET name = ?, email = ?, mobile = ? WHERE id = ?";

  db.query(query, [name, email, mobile, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

const addnewDispatcher = (name, email, mobile, hashedPassword, callback) => {
  const sql = `INSERT INTO dispatchers (name, email, mobile, password) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, email, mobile, hashedPassword], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

const deleteDispatcher = (userId, callback) => {
  const query = "DELETE FROM dispatchers WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

const cheackemailexist = (email, callback) => {
  const query = "SELECT email FROM dispatchers WHERE email = ?";
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
    const query = "SELECT email FROM users WHERE email = ? AND id != ?";
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
  listdispatcher,
  editgetdiapatcher,
  updateDispatcher,
  addnewDispatcher,
  deleteDispatcher,
  cheackemailexist,
  cheackemailexistupdate
};
