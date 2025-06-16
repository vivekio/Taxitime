const db = require ("../../../config/dbconnection")

const getallridesdetilas = ( id , callback) => {
    const query = `  SELECT ur.*, 
      usr.first_name AS first_name,
      usr.last_name AS last_name , 
      usr.mobile As mobile ,
      usr.picture AS picture,
      urp.total AS totalprice
FROM user_requests ur
 LEFT JOIN users usr ON ur.user_id = usr.id
  LEFT JOIN user_request_payments urp ON ur.id = urp.request_id
WHERE ur.id = ? ` 

db.query(query, id, (err, result) => {
  if (err) {
    return callback(err, null);
  }
  callback(null, result);
});
}

const updateAcceptStatus = (id ,provider_id , status, callback) => {
    const query = `UPDATE user_requests SET status = ?, provider_id = ? ,  assigned_at = NOW() , updated_at = NOW() WHERE id= ?` ;
    db.query(query, [ status,provider_id , id] , (err, result) => {
      if (err) {
        return callback(err, null);
      }
      db.query("SELECT user_id FROM user_requests WHERE id = ?", [id] , (err, results) => {
        if (err) {
          return callback(err, null);
        }
       callback(null, results);
      })
      
      // callback(null, result);
    });
} 
const updatestartStatus = (id ,provider_id , status, callback) => {
  const query = `UPDATE user_requests SET status = ?, provider_id = ? ,  started_at = NOW() , updated_at = NOW() WHERE id= ?` ;
  db.query(query, [ status,provider_id , id] , (err, result) => {
    if (err) {
      return callback(err, null);
    }
    db.query("SELECT user_id FROM user_requests WHERE id = ?", [id] , (err, results) => {
      if (err) {
        return callback(err, null);
      }
     callback(null, results);
    })
    
    // callback(null, result);
  });
} 
const updatedropStatus = (id ,provider_id , status, callback) => {
  const query = `UPDATE user_requests SET status = ?, provider_id = ? , updated_at = NOW() WHERE id= ?` ;
  db.query(query, [ status,provider_id , id] , (err, result) => {
    if (err) {
      return callback(err, null);
    }
    db.query("SELECT user_id FROM user_requests WHERE id = ?", [id] , (err, results) => {
      if (err) {
        return callback(err, null);
      }
     callback(null, results);
    })
    
    // callback(null, result);
  });
} 
const updatefinishStatus = (id ,provider_id , status, callback) => {
  const query = `UPDATE user_requests SET status = ?, provider_id = ? , finished_at = NOW() , updated_at = NOW() WHERE id= ?` ;
  db.query(query, [ status,provider_id , id] , (err, result) => {
    if (err) {
      return callback(err, null);
    }
    db.query("SELECT user_id FROM user_requests WHERE id = ?", [id] , (err, results) => {
      if (err) {
        return callback(err, null);
      }
     callback(null, results);
    })
    
    // callback(null, result);
  });
} 



const updateotp = (id , otp , callback) => {
    const query = `UPDATE user_requests SET otp = ? , updated_at = NOW() WHERE id= ?` ;
    db.query(query, [otp , id] , (err, result) => {
      if (err) {
        callback(err, null);
      }
      
      callback(null, result);
    });
}
const getotp = (id , callback) => {
    const query = `SELECT otp , user_id FROM user_requests WHERE id = ?` ;
    db.query(query, [id] , (err, result) => {
      if (err) {
        return callback(err, null);
      }
      
      callback(null, result);
    });
}
const updatestauspickup = (id , status, callback) => {
  const query = `UPDATE user_requests SET status = ? , updated_at = NOW() WHERE id= ?` ;
  db.query(query, [ status , id] , (err, result) => {
    if (err) {
      return callback(err, null);
    }
    // console.log(result);
    
    callback(null, result);
  });
} 

module.exports={getallridesdetilas , updateAcceptStatus , updateotp , getotp , updatestauspickup ,updatestartStatus , updatedropStatus ,updatefinishStatus}