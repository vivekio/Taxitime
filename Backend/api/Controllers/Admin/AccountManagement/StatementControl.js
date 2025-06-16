const statementModule = require("../../../Models/Admin/AccuntManagement/StatementModul");

const overallridessatementcount = (req, res) => {
  statementModule.getoverallridestatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};

const allridessatementcount = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  statementModule.getallridestatement(offset , limit,(err, rides ,totalrides) => {
    if (err) {
      console.log(err);
      
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

const ridessatement = (req, res) => {
  const { id } = req.params;
  statementModule.getridestatement(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};

const providersatement = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  statementModule.getproviderstatement(offset , limit,(err, rides ,totalrides) => {
    if (err) {
      console.log(err);
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

const providerridessatement = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  const { id } = req.params;
  statementModule.getproviderridestatement(id, offset , limit,(err, rides ,totalrides) => {
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

const daysatementcount = (req, res) => {
  statementModule.getdaystatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};
const alldayridessatementcount = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  statementModule.getdayridestatement(offset , limit,(err, rides ,totalrides) => {
    if (err) {
      console.log(err);
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
const monthlysatementcount = (req, res) => {
  statementModule.getmonthlystatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};
const allmonthlyridessatementcount = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  statementModule.getmonthlyridestatement(offset , limit,(err, rides ,totalrides) => {
    if (err) {
      console.log(err);
      
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
const yearsatementcount = (req, res) => {
  statementModule.getyearstatement((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server error",
      });
    }
    return res.status(200).json({
      message: "Success",
      result,
    });
  });
};
const allyearsridessatementcount = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  statementModule.getyearridestatement(offset , limit,(err, rides ,totalrides) => {
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
module.exports = {
  overallridessatementcount,
  allridessatementcount,
  ridessatement,
  providersatement,
  providerridessatement,
  daysatementcount,
  alldayridessatementcount,
  monthlysatementcount,
  allmonthlyridessatementcount,
  yearsatementcount,
  allyearsridessatementcount
};
