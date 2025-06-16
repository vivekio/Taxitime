const db = require("../../../config/dbconnection");


const getSiteSetting = (callback) => {   
    const query = "SELECT * FROM settings";
    db.query(query, (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    });
};

const updateSiteSetting = (id , value , callback) => {
    const query = "UPDATE settings SET value = ? WHERE id = ?";

    db.query(query,[value , id] , (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
}
const getaccountsetting = ( id ,callback) => {   
    const query = "SELECT * FROM admins WHERE id = ?";
    db.query(query,  id ,(err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    });
};
 
const updateaccountsetting = (  id , data , picture, callback) => {   
console.log(id , data , picture);

    const query = "UPDATE admins SET email = COALESCE(?, email) , name = COALESCE(?, name) , picture = COALESCE(?, picture) WHERE id = ?";
    db.query(query,[  data.email , data.name , picture , id] , (err, result) => {
        if (err) return  callback(err, null);
        callback(null, result);
    });
};  

const updatepassword = ( id , password , callback) => {   
    const query = "UPDATE admins SET password = ? WHERE id = ?";
    console.log(id);
    
    db.query(query,[password , id] , (err, result) => {
        if (err) return  callback(err, null);
        callback(null, result);
    });
};  

const getpassword = ( id ,callback) => {   
    const query = "SELECT password FROM admins WHERE id =   ?";
    db.query(query,id, (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    });
};

module.exports = { getSiteSetting  , getaccountsetting , updateaccountsetting , updatepassword , getpassword , updateSiteSetting};