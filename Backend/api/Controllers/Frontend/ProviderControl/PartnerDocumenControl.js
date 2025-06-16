const PartnerDocumentModel = require("../../../Models/Frontend/Providermodel/PartnerDocumentmodel");

// const PartnerDocument = (req, res) => {
//   const id = req.partnerID;
//   const file = req.file;
//   const document_id = req.body.documentID ;

//   const fileUrl = `${file.filename}`;
//   const unique_id = `${id}-${req.body.documentID}-${file.filename}`;
//   const status = "ASSESSING";
//   const data = {
//     document_id: document_id,
//     provider_id: id,
//     url: fileUrl,
//     unique_id: unique_id,
//     status: status,
//   };

//   PartnerDocumentModel.chekdocument(id, document_id, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: "Error fetching documents" });
//     }
//     res.status(200).json({ message: "Documents fetched successfully", result });
//     if (result[0].provider_id === id && result[0].document_id === document_id) {
//       console.log("this is upoadrte data ");
//     } else {
//       PartnerDocumentModel.PartnerDocument(data, (err, result) => {
//         if (err) {
//           return res.status(500).json({ error: "Error inserting data" });
//         }
//         res.status(200).json({ message: "Data inserted successfully", result });
//       });
//     }
//   });
// };
const PartnerDocument = (req, res) => {
  const id = req.partnerID;
  const file = req.file;
  const document_id = req.body.documentID;

  // Validate required fields
  if (!id || !file || !document_id) {
    return res.status(400).json({ 
      error: "Missing required fields: partnerID, file, or documentID" 
    });
  }

  const fileUrl = `${file.filename}`;
  const unique_id = `${id}-${document_id}-${file.filename}`;
  const status = "ASSESSING";
  
  const data = {
    document_id,
    provider_id: id,
    url: fileUrl,
    unique_id,
    status,
  };


  PartnerDocumentModel.chekdocument(id, document_id, (err, result) => {
    if (err) {
      return res.status(500).json({ 
        error: "Error checking document",
        details: err.message 
      });
    }

    
    if (result && result.length > 0 && result[0].provider_id === id) {
      PartnerDocumentModel.PartnerDocumentupdate(data, (err, insertResult) => {
        if (err) {
          return res.status(500).json({ 
            error: "Error inserting document",
            details: err.message 
          });
        }
        return res.status(201).json({ 
          message: "Document created successfully",
          result: insertResult 
        });
      });
      console.log("Document already exists - consider updating")
    } else {
     
      PartnerDocumentModel.PartnerDocument(data, (err, insertResult) => {
        if (err) {
          return res.status(500).json({ 
            error: "Error inserting document",
            details: err.message 
          });
        }
        return res.status(201).json({ 
          message: "Document created successfully",
          result: insertResult 
        });
      });
    }
  });
};
const getdocument = (req, res) => {
  const id = req.partnerID;
  PartnerDocumentModel.getdocument(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching documents" });
    }
    res.status(200).json({ message: "Documents fetched successfully", result });
  });
};
module.exports = {
  PartnerDocument,
  getdocument,
};
