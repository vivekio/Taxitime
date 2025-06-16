const db = require("../../../config/dbconnection");

const getwithdrawrequest = (offset, limit, callback) => {
  const countQuery =
    "SELECT COUNT(*) AS totalrequests FROM withdrawal_moneys WHERE status = 'WAITING'";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }
    const totalrequests = countResult[0].totalrequests;
    const query = `SELECT 
    id AS request_id, 
    bank_account_id, 
    provider_id, 
    amount, 
    status, 
    created_at, 
    updated_at 
FROM withdrawal_moneys WHERE status = 'WAITING' ORDER BY id DESC LIMIT ?, ?`;
    db.query(query, [offset, limit], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result, totalrequests);
    });
  });
};
const getwithdrawapproved = (offset, limit, callback) => {
  const countQuery =
    "SELECT COUNT(*) AS totalrequests FROM withdrawal_moneys WHERE status = 'APPROVED'";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }
    const totalrequests = countResult[0].totalrequests;
    const query = `SELECT 
    id AS request_id, 
    bank_account_id, 
    provider_id, 
    amount, 
    status, 
    created_at, 
    updated_at 
FROM withdrawal_moneys WHERE status = 'APPROVED' ORDER BY id DESC LIMIT ?, ?`;
    db.query(query, [offset, limit], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result, totalrequests);
    });
  });
};
const getwithdrawdisapproved = (offset, limit, callback) => {
  const countQuery =
    "SELECT COUNT(*) AS totalrequests FROM withdrawal_moneys WHERE status = 'DISAPPROVED'";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }
    const totalrequests = countResult[0].totalrequests;
    const query = `SELECT 
    id AS request_id, 
    bank_account_id, 
    provider_id, 
    amount, 
    status, 
    created_at, 
    updated_at 
FROM withdrawal_moneys WHERE status = 'DISAPPROVED' ORDER BY id DESC LIMIT ?, ?`;
    db.query(query, [offset, limit], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result, totalrequests);
    });
  });
};
const getbankdetailes = (id, callback) => {
  const query = `SELECT 
    ba.id, 
    ba.account_name, 
    ba.bank_name, 
    ba.account_number, 
    ba.IFSC_code, 
    ba.MICR_code, 
    ba.country, 
    wm.amount AS withdrawal_amount,
    wm.status AS status
FROM bank_accounts AS ba
LEFT JOIN withdrawal_moneys AS wm ON ba.id = wm.bank_account_id
WHERE ba.id = ? `;

  db.query(query, id, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

const updatestatus = (id, newstatus, callback) => {
  const query = `UPDATE withdrawal_moneys SET status = ? WHERE id= ?`;
  db.query(query, [newstatus, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

const getaccountstatus = (id, callback) => {
  const query = "SELECT status FROM withdrawal_moneys WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
    // console.log(result);
  });
};

module.exports = {
  getwithdrawrequest,
  getwithdrawapproved,
  getwithdrawdisapproved,
  getbankdetailes,
  updatestatus,
  getaccountstatus,
};
