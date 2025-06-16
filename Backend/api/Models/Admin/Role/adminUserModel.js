const db = require("../../../config/dbconnection");
const listusers = (offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totalUsers FROM users";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totalUsers = countResult[0].totalUsers;

    const query = `
      SELECT id, first_name, last_name, email, mobile, wallet_balance 
      FROM users 
      ORDER BY id DESC
      LIMIT ?, ?`;

    db.query(query, [offset, limit], (err, result) => {
      if (err) {
        return callback(err, null, null);
      }
      callback(null, result, totalUsers);
    });
  });
};
const updateuseradmin = (userId, userData, callback) => {
  const { first_name, last_name, email, mobile, picture } = userData;
  // const query =
  //   "UPDATE users SET first_name= ?, last_name = ?, email = ?, mobile = ?  , picture = ? WHERE id = ?";
  const query = `UPDATE users SET 
    first_name = COALESCE(?, first_name), 
    last_name = COALESCE(?, last_name), 
    email = COALESCE(?, email), 
    mobile = COALESCE(?, mobile), 
    picture = COALESCE(?, picture) 
WHERE id = ?`;
  db.query(
    query,
    [first_name, last_name, email, mobile, picture, userId],
    (err, result) => {
      if (err) {
        console.error("error edit user", err);
      }
      console.log("hrhrneoifsnbdbujkbsdkvbikvck", result);
      callback(null, result);
    }
  );
};

const updategetuser = (id, callback) => {
  let query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("error updategetuser", err);
    }
    callback(null, result);
  });
};

const deleteuser = (id, callback) => {
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("error deleteuser ", err);
    }
    callback(null, result);
  });
};
const addnewuser = (userData, callback) => {
  const { first_name, last_name, email, mobile, hashedPassword, picture } =
    userData;
  const query = `INSERT INTO users (first_name, last_name, email, mobile, password, picture) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [first_name, last_name, email, mobile, hashedPassword, picture],
    (err, result) => {
      if (err) {
        console.error("error addnewuser ", err);
        //   if (err.code === "ER_DUP_ENTRY") {
        //     return callback({ status: 401, message: "Email already exists" });
        //   }
        //   return callback({ status: 500, message: "Database error", error: err });
        // }
      }
      callback(null, result);
    }
  );
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
  listusers,
  updateuseradmin,
  updategetuser,
  deleteuser,
  addnewuser,
  cheackemailexist,
  cheackemailexistupdate,
};
