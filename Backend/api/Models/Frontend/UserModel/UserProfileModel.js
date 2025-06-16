const db = require ("../../../config/dbconnection")

const getuser = (id , callback) =>{
const query = "SELECT * FROM users WHERE id = ?"
db.query(query, [id], (err, result) => {
  if (err) {
    console.error("Error fetching user", err);
    return callback(err);
  }
  callback(null, result);
});
} 

const updateprofile = ( id , data ,callback) =>{
  console.log(data);
  console.log(id);
  
  const query = `UPDATE users SET 
    first_name = COALESCE(?, first_name), 
    last_name = COALESCE(?, last_name), 
    email = COALESCE(?, email), 
    mobile = COALESCE(?, mobile), 
    picture = COALESCE(?, picture) , updated_at = NOW()
WHERE id = ?`
  db.query(query, [ data.first_name,data.last_name,data.email, data.mobile , data.picture , id ], (err, result) => {
    if (err) {
      console.error("Error fetching user", err);
      return callback(err);
    }
    callback(null, result);
  });
}

const updatepassword = (id,data, callback ) =>{
  const query = `UPDATE users SET password = ? , updated_at = NOW() WHERE id = ?`
  db.query(query, [data , id], (err, result) => {
    if (err) {
      console.error("Error fetching user", err);
      return callback(err);
    }
    callback(null, result);
  });
}
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
module.exports = {getuser , updateprofile ,updatepassword ,cheackemailexistupdate}
