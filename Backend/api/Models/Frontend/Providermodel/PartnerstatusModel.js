const db = require ("../../../config/dbconnection")

const getstatus = (id, callback) => {
    const query = `SELECT status FROM provider_services WHERE provider_id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};



const updatestatus = (id, newstatus, callback) => {
    const query = `UPDATE provider_services SET status = ? , updated_at = NOW()  WHERE provider_id= ?`;
    db.query(query, [newstatus, id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports={updatestatus ,getstatus}