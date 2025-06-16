const partnerRidesHistory = require("../../../Models/Frontend/Providermodel/PartnerRidesHistory");


const getPartnerRidesHistory = (req, res) => {
    const id = req.partnerID;    
    partnerRidesHistory.getpartnerrides(id, (err, result) => {
        if (err) {
            console.error("Error fetching user", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(result);       
    })
}

module.exports = { getPartnerRidesHistory };