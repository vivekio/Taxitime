const db = require("../../../config/dbconnection");

const getoverallridestatement = (callback) => {
  const query = `SELECT 
    (SELECT SUM(total) FROM user_request_payments) AS total_sum, 
    (SELECT SUM(commision) FROM user_request_payments) AS commission_sum, 
    (SELECT COUNT(*) FROM user_requests) AS total_requests, 
    (SELECT COUNT(*) FROM user_requests WHERE status = 'CANCELLED') AS cancelled_requests;`;

  db.query(query, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
const getallridestatement = ( offset, limit, callback) => {
   const countQuery = "SELECT COUNT(*) AS totalrides FROM user_requests"
   db.query(countQuery, (err, countResult) => {
    if (err) {
      return callback(err, null, null);
    }

    const totalrides = countResult[0].totalrides;


  const query = `SELECT  UR.id AS request_id , UR.booking_id, UR.status, UR.s_address AS picked_up , UR.d_address AS dropped , UR.created_at AS dated_on , URP.commision AS commision , URP.total AS Earned FROM user_requests AS UR 
LEFT JOIN user_request_payments AS URP ON UR.id = URP.request_id  ORDER BY UR.id DESC
      LIMIT ?, ?`;

  db.query(query, [offset, limit] , (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result , totalrides);
  }); 
});
};

const getridestatement = (id, callback) => {
  const query = `SELECT  
  UR.id AS request_id, 
  user.first_name AS user_name, 
  UR.distance AS total_distance, 
  pr.first_name AS provider_name, 
  UR.status, 
  UR.s_address AS picked_up, 
  UR.d_address AS dropped, 
  UR.started_at AS start_time,  
  UR.finished_at AS end_time, 
  URP.price_without_commision AS Base_price,
    URP.commision AS company_Commision_price,
  URP.tax AS tex_price, 
  URP.total AS total_amount 
FROM user_requests AS UR 
LEFT JOIN user_request_payments AS URP ON UR.id = URP.request_id
LEFT JOIN users AS user ON UR.user_id = user.id 
LEFT JOIN providers AS pr ON UR.provider_id = pr.id
WHERE UR.id = ? `;

  db.query(query, id, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};


const getproviderstatement = ( offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totalrides FROM providers"
  db.query(countQuery, (err, countResult) => {
   if (err) {
     return callback(err, null, null);
   }

   const totalrides = countResult[0].totalrides;

  const query = `SELECT 
    p.id AS provider_id,
    CONCAT(p.first_name, ' ', p.last_name) AS provider_name,
    p.mobile,
    p.status,
    p.created_at,
    COUNT(ur.id) AS total_rides,
    SUM(urp.provider_commission) AS total_Commission,
    SUM(urp.provider_pay) AS Total_earnings
FROM providers p
LEFT JOIN user_requests ur ON p.id = ur.provider_id
LEFT JOIN user_request_payments urp ON ur.id = urp.request_id
GROUP BY p.id  ORDER BY p.id DESC
      LIMIT ?, ?`;

  db.query(query, [offset, limit] , (err, result) => {
    if (err) {
      return callback(err, null);
    }
   return callback(null, result , totalrides);
  });
});
}; 

const getproviderridestatement = (id, offset, limit, callback) => {
  const countQuery = "SELECT COUNT(*) AS totalrides FROM user_requests WHERE provider_id = ?"
  db.query(countQuery,id, (err, countResult) => {
   if (err) {
     return callback(err, null, null);
   }

   const totalrides = countResult[0].totalrides;

  const query = `SELECT  
    UR.id AS request_id, 
    UR.booking_id, 
    UR.status, 
    UR.s_address AS picked_up, 
    UR.d_address AS dropped, 
    UR.created_at AS dated_on, 
    URP.commision AS commision, 
    URP.total AS Earned 
FROM user_requests AS UR  
LEFT JOIN user_request_payments AS URP ON UR.id = URP.request_id  
WHERE UR.provider_id = ? ORDER BY UR.id DESC
      LIMIT ?, ?`;

  db.query(query, [id, offset, limit], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result ,totalrides);
  });
});
};

const getdaystatement = (callback) => {
  const query = `SELECT 
    (SELECT SUM(total) FROM user_request_payments WHERE DATE(created_at) = CURDATE()) AS total_sum, 
    (SELECT SUM(commision) FROM user_request_payments WHERE DATE(created_at) = CURDATE()) AS commission_sum, 
    (SELECT COUNT(*) FROM user_requests WHERE DATE(created_at) = CURDATE()) AS total_requests, 
    (SELECT COUNT(*) FROM user_requests WHERE status = 'CANCELLED' AND DATE(created_at) = CURDATE()) AS cancelled_requests;`
    db.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
}  

const getdayridestatement = ( offset, limit,callback) => {
  const countQuery = "SELECT COUNT(*) AS totalrides FROM user_requests WHERE DATE(created_at) = CURDATE()"
  db.query(countQuery, (err, countResult) => {
   if (err) {
     return callback(err, null, null);
   }

   const totalrides = countResult[0].totalrides;
  const query = `SELECT  UR.id AS request_id , UR.booking_id, UR.status, UR.s_address AS picked_up , UR.d_address AS dropped , UR.created_at AS dated_on , URP.commision AS commision , URP.total AS Earned FROM user_requests AS UR 
LEFT JOIN user_request_payments AS URP ON UR.id = URP.request_id WHERE DATE(UR.created_at) = CURDATE() ORDER BY UR.id DESC
      LIMIT ?, ? `;

  db.query(query,[offset, limit], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result , totalrides);
  });
});
}; 

const getmonthlystatement = (callback) => {
  const query = ` SELECT 
    (SELECT SUM(total) FROM user_request_payments WHERE YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())) AS total_sum, 
    (SELECT SUM(commision) FROM user_request_payments WHERE YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())) AS commission_sum, 
    (SELECT COUNT(*) FROM user_requests WHERE YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())) AS total_requests, 
    (SELECT COUNT(*) FROM user_requests WHERE status = 'CANCELLED' AND YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())) AS cancelled_requests;`
    db.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
} 
const getmonthlyridestatement = (offset, limit,callback) => {
  const countQuery = "SELECT COUNT(*) AS totalrides FROM user_requests WHERE YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())"
  db.query(countQuery, (err, countResult) => {
   if (err) {
     return callback(err, null, null);
   }

   const totalrides = countResult[0].totalrides;

  const query = `SELECT  UR.id AS request_id , UR.booking_id, UR.status, UR.s_address AS picked_up , UR.d_address AS dropped , UR.created_at AS dated_on , URP.commision AS commision , URP.total AS Earned FROM user_requests AS UR 
LEFT JOIN user_request_payments AS URP ON UR.id = URP.request_id WHERE YEAR(UR.created_at) = YEAR(CURDATE()) AND MONTH(UR.created_at) = MONTH(CURDATE()) ORDER BY UR.id DESC
      LIMIT ?, ?`;

  db.query(query,[ offset, limit], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result, totalrides);
  });
});
}; 
const getyearstatement = (callback) => {
  const query = `SELECT 
    (SELECT SUM(total) FROM user_request_payments WHERE YEAR(created_at) = YEAR(CURDATE())) AS total_sum, 
    (SELECT SUM(commision) FROM user_request_payments WHERE YEAR(created_at) = YEAR(CURDATE())) AS commission_sum, 
    (SELECT COUNT(*) FROM user_requests WHERE YEAR(created_at) = YEAR(CURDATE())) AS total_requests, 
    (SELECT COUNT(*) FROM user_requests WHERE status = 'CANCELLED' AND YEAR(created_at) = YEAR(CURDATE())) AS cancelled_requests;
`
    db.query(query, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
} 
const getyearridestatement = (offset, limit,callback) => {
  const countQuery = "SELECT COUNT(*) AS totalrides FROM user_requests WHERE YEAR(created_at) = YEAR(CURDATE())"
  db.query(countQuery, (err, countResult) => {
   if (err) {
     return callback(err, null, null);
   }

   const totalrides = countResult[0].totalrides;
  const query = `SELECT  UR.id AS request_id , UR.booking_id, UR.status, UR.s_address AS picked_up , UR.d_address AS dropped , UR.created_at AS dated_on , URP.commision AS commision , URP.total AS Earned FROM user_requests AS UR 
LEFT JOIN user_request_payments AS URP ON UR.id = URP.request_id WHERE YEAR(UR.created_at) = YEAR(CURDATE())ORDER BY UR.id DESC
      LIMIT ?, ?`;

  db.query(query,[ offset, limit] ,(err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result , totalrides);
  });
});
}; 

module.exports = {
  getoverallridestatement,
  getallridestatement,
  getridestatement,
  getproviderstatement,
  getproviderridestatement,
  getdaystatement,
  getdayridestatement,
  getmonthlystatement,
  getmonthlyridestatement,
  getyearstatement,
  getyearridestatement
};
