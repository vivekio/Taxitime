const  ProviderService  = require("../../../Models/Admin/Role/adminProviderServiceModel");
const Joi = require("joi");

const Schema = Joi.object({
    serviceName : Joi.string().required().messages({
        "string.empty": "Service name is required",
    }),
    serviceNumber : Joi.string().required().messages({
        "string.empty": "Service number is required",
        // "string.pattern.base": "Service number must be in the format GJ-10-AB-1234",    
    }),
    serviceModel : Joi.string().required().messages({
        "string.empty": "Service model is required",
    })
})

const getproviderService = (req, res) => {
    const providerId = req.params.id;

    if (!providerId) {
        return res.status(400).json({ message: "Provider ID is required" });
    }

    ProviderService.getProviderService(providerId, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.status(200).json(results);
    });
};



const updateProviderService = (req, res) => {
    const { error } = Schema.validate(req.body || {}, { abortEarly: false });
    if (error) {
        return res
          .status(400)
          .json({ error: error.details.map((err) => err.message) });
      }
    const providerId = req.params.id;
    const { serviceName, serviceNumber, serviceModel } = req.body;

    // if (!providerId || !serviceName || !serviceNumber || !serviceModel) {
    //     return res.status(400).json({ message: "All fields are required" });
    // }

    console.log("Inside update API, provider ID:", providerId);
    console.log("Update Data:", serviceName, serviceNumber, serviceModel);
    ProviderService.cheackservicenumberexist(serviceNumber, providerId, (err, result) => {
        if (err) {
            return res
              .status(err.status || 500)
              .json({ error: err.message || "Database error" });
          } 
     ProviderService.updateProviderService(providerId, serviceName, serviceNumber, serviceModel, (err, results) => {
        if (err) {
            console.error("Error executing update query:", err);
            return res.status(500).json({ error: "Database update failed" });
        }

        if (results.affectedRows === 0) {
            console.log("No records updated, attempting to insert...");

            ProviderService.insertProviderService(providerId, serviceName, serviceNumber, serviceModel, (insertErr, insertResults) => {
                if (insertErr) {
                    console.error("Error executing insert query:", insertErr);
                    return res.status(500).json({ error: "Database insert failed" });
                }
                return res.status(201).json({ message: "Provider service inserted successfully" });
            });
        } else {
            res.json({ message: "Provider service updated successfully" });
        }
    });
})
};

const deleteProviderService = (req, res) => {
    const providerId = req.params.id;  // Extract provider_id from request

    console.log("Provider ID:", providerId);

    ProviderService.getProviderserviceid(providerId, (err, serviceTypeId) => {
        if (err) {
            console.error("Error fetching service type:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (!serviceTypeId) {
            return res.status(404).json({ error: "Service type not found" });
        }

        console.log("Service Type ID:", serviceTypeId);

        ProviderService.deleteProviderService(providerId, serviceTypeId, (err, result) => {
            if (err) {
                console.error("Error deleting provider service:", err);
                return res.status(500).json({ error: "Database error" });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Provider service not found" });
            }
            res.status(200).json({ message: "Provider service deleted successfully" });
        });
    });
};
module.exports = { getproviderService ,updateProviderService ,deleteProviderService };
