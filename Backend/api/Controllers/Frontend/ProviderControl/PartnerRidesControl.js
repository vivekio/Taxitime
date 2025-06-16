const PartnerRides = require("../../../Models/Frontend/Providermodel/PartnerRidesModel");

// const getrides = (req, res) => {
//   const id = req.params.id;
//   PartnerRides.getrides((err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message || "Database error" });
//     }
//     console.log(results);
    

//     PartnerRides.getprovider(id, (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: err.message || "Database error" });
//       }
//       console.log("result", result);
      
//       const service_type_id = result[0].service_type_id;
//       const filteredRides = results.filter(
//         (ride) => ride.service_type_id === service_type_id
//       );
//       res.status(200).json(filteredRides);
//     });
//   });
// };
const getrides = (req, res) => {
    const id = req.partnerID;
  
    if (!id) {
      return res.status(400).json({ error: "Provider ID is required" });
    }
  
    PartnerRides.getrides((err, results) => {
      if (err) {
        console.error("Error fetching rides:", err);
        return res.status(500).json({ error: err.message || "Database error while fetching rides" });
      }
  
      if (!results || results.length === 0) {
        return res.status(404).json({ message: "No rides found" });
      }
  
      PartnerRides.getprovider(id, (err, result) => {
        if (err) {
          console.error("Error fetching provider:", err);
          return res.status(500).json({ error: err.message || "Database error while fetching provider" });
        }
  
        if (!result || result.length === 0) {
          return res.status(404).json({ error: "Provider not found" });
        }
  
        const service_type_id = result[0]?.service_type_id;
  
        if (!service_type_id) {
          return res.status(400).json({ error: "Invalid provider data: service_type_id is missing" });
        }
  
        const filteredRides = results.filter(ride => ride.service_type_id === service_type_id);
        res.status(200).json(filteredRides);
      });
    });
  };

module.exports = { getrides };
