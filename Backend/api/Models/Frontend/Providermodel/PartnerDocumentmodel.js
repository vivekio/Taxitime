const db = require("../../../config/dbconnection");

const PartnerDocument = (data, callback) => {
    console.log("this is data", data);
  const sql = `INSERT INTO provider_documents 
    (provider_id, document_id, url, unique_id, status , created_at ) 
    VALUES (?, ?, ?, ?,?, now())`;
  db.query(
    sql,
    [data.provider_id, data.document_id, data.url, data.unique_id , data.status],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into provider_documents:", err);
        return callback(err, null);
      }
      callback(null, result);
    }
  );
};
const PartnerDocumentupdate = (data, callback) => {
  console.log("this is data", data);
const sql = `UPDATE provider_documents
SET 
    url = ?,
   updated_at = NOW()
WHERE 
    provider_id = ? AND 
    document_id = ?;`;
db.query(
  sql,
  [data.url , data.provider_id, data.document_id],
  (err, result) => {
    if (err) {
      console.error("Error inserting data into provider_documents:", err);
      return callback(err, null);
    }
    callback(null, result);
  }
);
};
const chekdocument = (id , document_id, callback) => {

    console.log(id, document_id);
  const sql = `SELECT * FROM provider_documents WHERE provider_id = ? && document_id = ?`;
  db.query(sql, [id ,document_id], (err, result) => {
    if (err) {
      console.error("Error fetching documents:", err);
      return callback(err, null);
    }
    console.log(result);
    callback(null, result);
  });
};

const getdocument  =  (id , callback) => {
  const sql = `SELECT * FROM provider_documents WHERE provider_id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching documents:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
}



module.exports = {PartnerDocument ,getdocument ,chekdocument , PartnerDocumentupdate};
