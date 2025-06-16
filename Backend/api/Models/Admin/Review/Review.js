const db = require("../../../config/dbconnection");

const getuserReview = ( offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totalUsers FROM user_request_ratings";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totalUsers = countResult[0].totalUsers;

  const query = `select URR.id ,URR.request_id,URR.user_id,URR.user_rating,URR.user_comment , URR.created_at, CONCAT(Us.first_name, ' ', Us.last_name) AS user_name , CONCAT(Pr.first_name, ' ', Pr.last_name) AS provider_name from user_request_ratings as URR 
LEFT JOIN users AS Us ON URR.user_id = US.id
LEFT JOIN providers AS Pr ON URR.provider_id = Pr.id ORDER BY URR.id DESC LIMIT ? , ?`;
  db.query(query,[offset, limit], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result ,totalUsers);
  });
  });
};
const getproviderReview = ( offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totalUsers FROM user_request_ratings";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totalUsers = countResult[0].totalUsers;
  const query = `select URR.id ,URR.request_id,URR.provider_id,URR.provider_rating,URR.provider_comment ,URR.created_at , CONCAT(Pr.first_name, ' ', Pr.last_name) AS provider_name,CONCAT(Us.first_name, ' ', Us.last_name) AS user_name from user_request_ratings as URR
 LEFT JOIN providers AS Pr ON URR.provider_id = Pr.id
 LEFT JOIN users AS Us ON URR.user_id = US.id ORDER BY URR.id DESC LIMIT ? , ?`;
  db.query(query,[offset, limit], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result , totalUsers);
  });
  });
};
module.exports = {
  getuserReview,
  getproviderReview,
};
