const db = require ("../../../config/dbconnection")

const getpartnerrides = (id , callback) =>{
const query = ` SELECT  
    UR.*,
    URP.commision AS commision,
    URP.total AS earned,
    users.first_name,
    users.last_name
FROM 
    user_requests AS UR
LEFT JOIN 
    user_request_payments AS URP ON UR.id = URP.request_id
LEFT JOIN 
    users ON UR.user_id = users.id
WHERE 
    UR.provider_id = 98
ORDER BY 
    UR.id DESC;`;
db.query(query, [id], (err, result) => {
    if (err) {
        console.error("Error fetching user", err);
        return callback(err);
    }
    callback(null, result);
});         
}
module.exports = {
    getpartnerrides,
}