const db = require("../../../config/dbconnection");
const currentTimeandDate = require("../../../Utils/currentTimeAndDate");

const selectrides = (callback) => {
  const sql = `SELECT st.*, s.value AS tax_percentage
FROM service_types st
JOIN settings s ON s.key = 'tax_percentage';`;
  db.query(sql, (err, result) => {
    callback(err, result);
  });
};

const bookrides = (data, callback) => {
  console.log("this is data final ", data);

  const created_at = currentTimeandDate();
  const sql = `
    INSERT INTO user_requests (
        booking_id, user_id,current_provider_id, service_type_id, status, 
     payment_mode,paid, distance, s_address, s_latitude, 
        s_longitude, d_address, d_latitude, d_longitude, route_key, 
         travel_time, track_distance, track_latitude, track_longitude, created_at,schedule_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
  db.query(
    sql,
    [
      data.booking_id,
      data.userid,
      data.current_provider_id,
      data.servicetypeid,
      data.status,
      data.paymentMethod,
      data.paid,
      data.distance,
      data.pickup,
      data.pickuplat,
      data.pickuplng,
      data.drop,
      data.droplat,
      data.droplng,
      data.route_key,
      data.duration,
      data.distance,
      data.pickuplat,
      data.pickuplng,
      created_at,
      data.schedule_at,
    ],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

const user_request_payment = (data, callback) => {
  console.log("this is data model ", data);

  const created_at = currentTimeandDate();

  const sql = `
    INSERT INTO user_request_payments (request_id, payment_mode,price_without_commision, tax, distance, total, commision, created_at,  payable , provider_commission ,provider_pay) VALUES (?, ?, ?, ?,?,?,? ,?,?,?,?)`;
  db.query(
    sql,
    [
      data.request_id,
      data.payment_mode,
      data.price_without_commision,
      data.Totaltax,
      data.distance,
      data.total,
      data.commision,
      created_at,
      data.total,
      data.provider_commission,
      data.provider_pay,
    ],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};

const getcommisionandtax = (callback) => {
  const sql =
    "SELECT value FROM settings WHERE `key` IN ('tax_percentage', 'commission_percentage'); ";
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  selectrides,
  bookrides,
  user_request_payment,
  getcommisionandtax,
};
