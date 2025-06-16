const db = require("../../../config/dbconnection");

const Accountlist = ( offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totalaccount FROM  bank_accounts WHERE status = 'WAITING'";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totalaccount = countResult[0].totalaccount;
  const query =
    "SELECT  id ,account_name , bank_name , account_number, type , status FROM bank_accounts WHERE status = 'WAITING' ORDER BY id DESC LIMIT ?, ?";
  db.query(query, [offset, limit],(err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result , totalaccount);
  });
});
};

const accountstatus = (id, newstatus, callback) => {
  const query = "UPDATE bank_accounts SET status = ? WHERE id = ?";
  db.query(query, [newstatus, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

const getaccountstatus = (id, callback) => {
  const query = "SELECT status FROM bank_accounts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

const AccountApprovedlist = ( offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totalaccount FROM  bank_accounts WHERE status = 'APPROVED'";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totalaccount = countResult[0].totalaccount;
  const query =
    "SELECT  id ,account_name , bank_name , account_number, type , status FROM bank_accounts WHERE status = 'APPROVED' ORDER BY id DESC LIMIT ?, ?";
  db.query(query, [offset, limit],(err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result , totalaccount);
  });
});
};


const geteditaccount = (id, callback) => {
  let query =
    "SELECT account_name , bank_name , account_number, type , IFSC_code FROM bank_accounts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("error updategetuser", err);
    }
    callback(null, result);
  });
};

const Upadateaccount = (
  id,
  account_name,
  bank_name,
  account_number,
  type,
  IFSC_code,
  callback
) => {
  const query =
    "UPDATE bank_accounts SET account_name = ? , bank_name = ? , account_number = ? , type = ? , IFSC_code = ? WHERE id = ?";
  db.query(
    query,
    [account_name, bank_name, account_number, type, IFSC_code, id],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

const checkaccountnumber = (account_number, id, callback) => {
  const query =
    "SELECT account_number FROM bank_accounts WHERE account_number = ? AND id != ?";
  db.query(query, [account_number, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length > 0) {
      console.log(result);

      return callback({
        status: 400,
        message: ["Account number already exists"],
      });
    }
    callback(null, result);
  });
};

const deleteaccount = (id, callback) => {
  const query = "DELETE FROM bank_accounts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
module.exports = {
  Accountlist,
  accountstatus,
  getaccountstatus,
  AccountApprovedlist,
  geteditaccount,
  Upadateaccount,
  checkaccountnumber,
  deleteaccount,
};
