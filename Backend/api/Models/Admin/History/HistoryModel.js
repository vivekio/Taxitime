const db = require("../../../config/dbconnection");
const getrequestridestatement = ( offset, limit, callback) => {
    const countQuery = "SELECT COUNT(*) AS totalrides FROM user_requests WHERE status = 'COMPLETED' OR status = 'CANCELLED'"
    db.query(countQuery, (err, countResult) => {
     if (err) {
       return callback(err, null, null);
     }
 
     const totalrides = countResult[0].totalrides;
 
 
   const query = `SELECT  UR.id AS request_id , UR.booking_id, UR.status, UR.s_address AS picked_up , UR.d_address AS dropped , UR.created_at AS dated_on , URP.commision AS commision , URP.total AS Earned FROM user_requests AS UR 
 LEFT JOIN user_request_payments AS URP ON UR.id = URP.request_id WHERE UR.status = 'COMPLETED' OR UR.status = 'CANCELLED' ORDER BY UR.id DESC
       LIMIT ?, ?`;
 
   db.query(query, [offset, limit] , (err, result) => {
     if (err) {
       return callback(err, null);
     }
     callback(null, result , totalrides);
   }); 
 });
 };

 const getscheduleridestatement = ( offset, limit, callback) => {
    const countQuery = "SELECT COUNT(*) AS totalrides FROM user_requests WHERE status = 'SCHEDULED'"
    db.query(countQuery, (err, countResult) => {
     if (err) {
       return callback(err, null, null);
     }
 
     const totalrides = countResult[0].totalrides;
 
 
   const query = `SELECT  UR.id AS request_id , UR.booking_id, UR.status, UR.s_address AS picked_up , UR.d_address AS dropped , UR.created_at AS dated_on , URP.commision AS commision , URP.total AS Earned FROM user_requests AS UR 
 LEFT JOIN user_request_payments AS URP ON UR.id = URP.request_id WHERE UR.status = 'SCHEDULED' ORDER BY UR.id DESC
       LIMIT ?, ?`;
 
   db.query(query, [offset, limit] , (err, result) => {
     if (err) {
       return callback(err, null);
     }
     callback(null, result , totalrides);
   }); 
 });
 };

 module.exports = {getrequestridestatement , getscheduleridestatement};