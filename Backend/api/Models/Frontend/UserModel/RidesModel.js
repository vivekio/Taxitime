const db = require("../../../config/dbconnection");


const getRides = ( userid , callback) =>{
    const query = `SELECT ur.*, 
      rp.total AS fixed ,
      rp.price_without_commision AS price_without_commision,
      rp.commision AS commision,
      rp.tax AS tax,
      rp.discount AS discount,
      pr.first_name AS first_name , 
      pr.last_name AS last_name ,
      pr.avatar AS avatar ,
      pr.mobile AS mobile ,
      pr.rating AS rating ,
      ps.service_number AS service_number,
      ps.service_model AS service_model
FROM user_requests ur
 LEFT JOIN user_request_payments rp ON ur.id = rp.request_id
  LEFT JOIN providers pr ON ur.provider_id = pr.id
    LEFT JOIN provider_services ps ON ur.provider_id = ps.provider_id
WHERE ur.user_id = ?` 
    db.query(query,userid,(err,results)=>{
        if(err){
            return callback(err)
        }
        // console.log(results);

        
        return callback(null,results)
    })
} 

const cancelrides = (data , id, status, cancelled_by, callback) => {
    const query = `UPDATE user_requests SET status = ? , cancelled_by = ? , cancel_reason = ? , updated_at = NOW() WHERE id = ? ` 
    // const query2 = `INSERT INTO user_requests SET cancel_reason = ? WHERE id = ? `
    db.query(query,[status ,cancelled_by ,data.reason,id],(err,results)=>{
        if(err){
            console.log(err);
            
            return callback(err)
        }
        return callback(null,results)
    })

}
const rating = ( data , callback) =>{
console.log("this is data", data);
const query = `INSERT INTO user_request_ratings (request_id, user_id, provider_id, user_rating , user_comment , created_at) VALUES (?, ?, ?, ?,?,now())`
db.query(query , [data.request_id , data.User_id ,data.provider_id ,data.rating , data.comment ] , (err , result) =>{
    if (err) {
        return callback(err)
    }
    return callback(null,result) })
}

module.exports = {getRides ,cancelrides , rating}