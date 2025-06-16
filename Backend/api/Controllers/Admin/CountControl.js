const db = require ('../../config/dbconnection')



const countuser = (req, res) => {
    db.query("SELECT COUNT(*) FROM users", (err, result) => {
        if (err) {
            console.error("Error counting users in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "User count", count: result[0]['COUNT(*)'] });
    });
};
const countDispatchers = (req, res) => {
    db.query("SELECT COUNT(*) FROM dispatchers", (err, result) => {
        if (err) {
            console.error("Error counting users in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: " dispatchers count", count: result[0]['COUNT(*)'] });
    });
};
const countFleets = (req, res) => {
    db.query("SELECT COUNT(*) FROM fleets", (err, result) => {
        if (err) {
            console.error("Error counting fleets in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "fleets count", count: result[0]['COUNT(*)'] });
    });
};
const countproviders = (req, res) => {
    db.query("SELECT COUNT(*) FROM providers", (err, result) => {
        if (err) {
            console.error("Error counting providers in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "providers count", count: result[0]['COUNT(*)'] });
    });
};
const getNewUsers = (req, res) => {
    db.query(`SELECT ur.user_id, u.first_name, u.last_name, COUNT(*) AS total_request
FROM user_requests ur
JOIN users u ON ur.user_id = u.id
WHERE ur.status = 'completed'
GROUP BY ur.user_id, u.first_name, u.last_name
ORDER BY total_request DESC
LIMIT 5`, (err, result) => {
        if (err) {
            console.error("Error counting new users in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "New users count", count: result });
    });
}
const getNewprovider = (req, res) => {
    db.query(`SELECT ur.provider_id, p.first_name, p.last_name, COUNT(*) AS total_request
FROM  user_requests ur
JOIN  providers p ON ur.provider_id = p.id
WHERE ur.status = 'completed'
GROUP BY ur.provider_id, p.first_name, p.last_name
ORDER BY total_request DESC
LIMIT 5`, (err, result) => {
        if (err) {
            console.error("Error counting new users in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "New users count", count: result });
    });
}
const getNewrevenue = (req, res) => {
    db.query(`SELECT 
    (SELECT SUM(total) FROM user_request_payments) AS total_sum, 
    (SELECT SUM(commision) FROM user_request_payments) AS commission_sum, 
      (SELECT SUM(tax) FROM user_request_payments) AS tax_sum, 
        (SELECT SUM(provider_commission) FROM user_request_payments) AS provider_commission_sum`, (err, result) => {
        if (err) {
            console.error("Error counting new users in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "New users count", count: result });
    });
}
const getmonthrides  = (req, res) => {
    db.query(`SELECT 
    DATE_FORMAT(created_at, '%Y-%m') AS month,
    SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_rides,
    SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) AS cancelled_rides
FROM 
    user_requests
WHERE 
    created_at IS NOT NULL
GROUP BY 
    DATE_FORMAT(created_at, '%Y-%m')
ORDER BY 
    month ASC;`, (err, result) => {
        if (err) {
            console.error("Error counting new users in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "New users count", count: result });
    });
}

const onlineprovider = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
    const offset = (page - 1) * limit;

    db.query(` SELECT p.*
FROM providers p
INNER JOIN provider_services ps ON p.id = ps.provider_id
WHERE ps.status = 'active' 
ORDER BY p.id DESC
      LIMIT ?, ?`, [offset, limit], (err, result) => {
        if (err) {
            console.error("Error counting online providers in database:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Online providers count", count: result });
    });
}
module.exports = {countuser , countDispatchers , countFleets , countproviders ,getNewUsers ,getNewprovider ,getNewrevenue , getmonthrides , onlineprovider};