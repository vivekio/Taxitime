const db = require("../../../config/dbconnection");

const listServiceTypes = (offset, limit,callback) => {
  const countQuery = "SELECT COUNT(*) AS totalUsers FROM service_types";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totalUsers = countResult[0].totalUsers;

  const query = "SELECT * FROM service_types ORDER BY id DESC LIMIT ?, ?";
  db.query(query, [offset, limit], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result , totalUsers);
    }
  });
  });
};
const getservice = (id, callback) => {
  let query = "SELECT * FROM service_types WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("error updategetuser", err);
    }
    callback(null, result);
  });
};

const updateservicetypes = (id, data, callback) => {
  const {
    name,
    provider_name,
    capacity,
    fixed,
    distance,
    price,
    minute,
    calculator,
    image,
    type
  } = data;
  const query = `UPDATE service_types SET 
    name = COALESCE(?, name), 
    type = COALESCE(?, type),
    provider_name = COALESCE(?, provider_name), 
    capacity = COALESCE(?, capacity), 
    fixed = COALESCE(?, fixed), 
    distance = COALESCE(?, distance), 
    price = COALESCE(?, price), 
    minute = COALESCE(?, minute), 
    calculator = COALESCE(?, calculator),
    image = COALESCE(?, image)
WHERE id = ?`;
  db.query(
    query,
    [
      name,
      type,
      provider_name,
      capacity,
      fixed,
      distance,
      price,
      minute,
      calculator,
      image,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("error edit user", err);
      }
      callback(null, result);
    }
  );
};

const addservicetypes = (data, callback) => {
  const { name, provider_name, capacity, fixed, distance, price, minute, calculator, image ,
    Description , type } = data;
  const query = "INSERT INTO service_types (name, provider_name, capacity, fixed, distance, price, minute, calculator, image , Description ,  type  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
  db.query(
    query,
    [name, provider_name, capacity, fixed, distance, price, minute, calculator, image , Description , type ], 
    (err, result) => {
      if (err) {
        console.error("error edit user", err);
      }
      callback(null, result);
    }
  );
};

const deleteService = (id, callback) => {
  const query = "DELETE FROM service_types WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("error delete user", err);
    }
    callback(null, result);
  });
}; 

module.exports = {
  listServiceTypes,
  getservice,
  updateservicetypes,
  addservicetypes,
  deleteService
};
