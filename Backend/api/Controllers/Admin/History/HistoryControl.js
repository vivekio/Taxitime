
const historyModule = require("../../../Models/Admin/History/HistoryModel");

const RequestHistory = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  historyModule.getrequestridestatement(offset , limit,(err, rides ,totalrides) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    
    return res.status(200).json({
      message: "Success",
      rides, 
      totalrides,
      currentPage : page,
      totalPages: Math.ceil(totalrides / limit),
    });
  });
};

const ScheduledHistory = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
    historyModule.getscheduleridestatement(offset , limit,(err, rides ,totalrides) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server error",
        });
      }

      return res.status(200).json({
        message: "Success",
        rides, 
        totalrides,
        currentPage : page,
        totalPages: Math.ceil(totalrides / limit),
      });
    });
  };
module.exports = {  RequestHistory , ScheduledHistory };

