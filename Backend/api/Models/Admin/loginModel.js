const db = require ("../../config/dbconnection")


const adminlogin = (email,callback) =>{
    const query = "SELECT * FROM admins WHERE email = ?"
    db.query(query, email,(err , result) =>{
        if (err) {
        return callback(null,err)
        }
        return callback(null , result)
    })
}

const updatepassword = (email , hashedPassword , callback) => {   
    const query = "UPDATE admins SET password = ?  WHERE email = ?";
    db.query(query,[hashedPassword , email] , (err, result) => {
        if (err) return  callback(err, null);
        callback(null, result);
    });
};

const getadmindetail = ( id , callback) => {
    const query = "SELECT * FROM admins WHERE id = ?";
    db.query(query, id, (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    }); 
}
module.exports ={adminlogin , updatepassword , getadmindetail}