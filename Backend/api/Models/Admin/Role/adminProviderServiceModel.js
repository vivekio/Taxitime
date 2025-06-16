const db = require("../../../config/dbconnection");

const getProviderService = (providerId, callback) => {
  const query = `
        SELECT 
            st.name AS Service_Name, 
            ps.service_number AS Service_Number, 
            ps.service_model AS Service_Model
        FROM 
            provider_services ps
        JOIN 
            service_types st 
        ON 
            ps.service_type_id = st.id
        WHERE 
            ps.provider_id = ?;
    `;

  db.query(query, [providerId], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

const updateProviderService = (
  providerId,
  serviceName,
  serviceNumber,
  serviceModel,
  callback
) => {
  const updateQuery = `
        UPDATE provider_services
        SET
            service_type_id = (SELECT id FROM service_types WHERE name = ? LIMIT 1),
            service_number = ?,
            service_model = ?
        WHERE
            provider_id = ?;
    `;

  db.query(
    updateQuery,
    [serviceName, serviceNumber, serviceModel, providerId],
    (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    }
  );
};

const insertProviderService = (
  providerId,
  serviceName,
  serviceNumber,
  serviceModel,
  callback
) => {
  const insertQuery = `
        INSERT INTO provider_services (provider_id, service_type_id, service_number, service_model)
        VALUES (?, (SELECT id FROM service_types WHERE name = ? LIMIT 1), ?, ?);
    `;

  db.query(
    insertQuery,
    [providerId, serviceName, serviceNumber, serviceModel],
    (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    }
  );
};

const getProviderserviceid = (providerId, callback) => {
  db.query(
    `SELECT service_type_id FROM provider_services WHERE provider_id = ? LIMIT 1`,
    [providerId],
    (err, rows) => {
      if (err) return callback(err, null);
      if (rows.length === 0) return callback(null, null);
      callback(null, rows[0].service_type_id);
    }
  );
};

const deleteProviderService = (providerId, serviceTypeId, callback) => {
  db.query(
    `DELETE FROM provider_services WHERE provider_id = ? AND service_type_id = ?`,
    [providerId, serviceTypeId],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

const cheackservicenumberexist = (service_number, providerId, callback) => {
  const query =
    "SELECT service_number FROM provider_services WHERE service_number = ? AND provider_id != ?";
  db.query(query, [service_number, providerId], (err, result) => {
    if (err) {
      return console.error("error cheackemailexist ", err);
    }
    // console.log(email);

    // const cuurrentemail = result[0].email
    // console.log(cuurrentemail);

    if (result.length > 0) {
      console.log(result);

      return callback({ status: 400, message: ["service number already exists"] });
    }
    callback(null, false);
  });
};

module.exports = {
  getProviderService,
  updateProviderService,
  insertProviderService,
  getProviderserviceid,
  deleteProviderService,
  cheackservicenumberexist
};
