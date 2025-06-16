const db = require("../../../config/dbconnection");

const listproviders = (offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totalPeoviders FROM providers";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totalPeoviders = countResult[0].totalPeoviders;

    db.query(
      `SELECT 
        p.id, 
        p.first_name, 
        p.last_name, 
        p.email, 
        p.mobile, 
        p.avatar,
        p.status, 
        ps.status AS service_status
      FROM providers p
      LEFT JOIN provider_services ps ON p.id = ps.provider_id
      ORDER BY p.id DESC
      LIMIT ?, ?;`, [offset, limit],
      (err, result) => {
        if (err) {
          return  callback(err, null, null);
        }
        callback(null, result ,totalPeoviders );
      }
    );
  });
};

const deleteprovider = (id, callback) => {
  const query = "DELETE FROM providers WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    callback(null, result);
  });
};

const editgetproviders = (id, callback) => {
  const query = "SELECT * FROM providers WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    callback(null, result);
  });
};

const editprovider = (userId, userData, callback) => {
  const { first_name, last_name, email, mobile, avatar } = userData;
  // const query = 'UPDATE providers SET first_name= ?, last_name = ?, email = ?, mobile = ?  , avatar = ? WHERE id = ?';
  const query = `UPDATE providers SET 
    first_name = COALESCE(?, first_name), 
    last_name = COALESCE(?, last_name), 
    email = COALESCE(?, email), 
    mobile = COALESCE(?, mobile), 
    avatar = COALESCE(?, avatar) 
WHERE id = ?`;
  db.query(
    query,
    [first_name, last_name, email, mobile, avatar, userId],
    (err, result) => {
      if (err) {
        console.error("error edit user", err);
      }
      callback(null, result);
    }
  );
};

const addnewprovider = (userData, callback) => {
  const { first_name, last_name, email, mobile, hashedPassword, avatar } =
    userData;
  const query = `INSERT INTO providers (first_name, last_name, email, mobile, password, avatar) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [first_name, last_name, email, mobile, hashedPassword, avatar],
    (err, result) => {
      if (err) {
        console.error("newuser ", err);
      }
      callback(null, result);
    }
  );
};

const getProviderStatus = (id, callback) => {
  const query = "SELECT status FROM providers WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

const updateProviderStatus = (id, newStatus, callback) => {
  const query = "UPDATE providers SET status = ? WHERE id = ?";
  db.query(query, [newStatus, id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

const cheackemailexist = (email, callback) => {
  const query = "SELECT email FROM providers WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("error cheackemailexist ", err);
    }
    //   console.log("helooooooooooooooooooooo", result.length);
    if (result.length > 0) {
      // console.log(result);

      return callback({ status: 400, message: ["Email already exists"] });
    }
    callback(null, false);
  });
};

const cheackemailexistupdate = (email, userID, callback) => {
  const query = "SELECT email FROM providers WHERE email = ? AND id != ?";
  db.query(query, [email, userID], (err, result) => {
    if (err) {
      return console.error("error cheackemailexist ", err);
    }
    // console.log(email);

    // const cuurrentemail = result[0].email
    // console.log(cuurrentemail);

    if (result.length > 0) {
      console.log(result);

      return callback({ status: 400, message: ["Email already exists"] });
    }
    callback(null, false);
  });
};

module.exports = {
  listproviders,
  deleteprovider,
  editgetproviders,
  editprovider,
  addnewprovider,
  getProviderStatus,
  updateProviderStatus,
  cheackemailexist,
  cheackemailexistupdate,
};
