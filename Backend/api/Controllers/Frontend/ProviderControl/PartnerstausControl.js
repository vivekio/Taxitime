const partnerstatusmodel = require("../../../Models/Frontend/Providermodel/PartnerstatusModel");

const getstatus = (req, res) => {
    const id = req.partnerID;
    partnerstatusmodel.getstatus(id, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
};
const updatestatus = (req, res) => {
    const id = req.partnerID;
    const newstatus = req.body.status;
    partnerstatusmodel.updatestatus(id, newstatus, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
};

module.exports = { updatestatus ,getstatus };