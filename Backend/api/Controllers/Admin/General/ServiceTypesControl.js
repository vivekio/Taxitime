const servicetypesmodel = require("../../../Models/Admin/General/ServiceTypesModel");

const getServiceTypes = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
  const offset = (page - 1) * limit;
  servicetypesmodel.listServiceTypes(offset , limit, (err, users , totalUsers) => {
    if (err) {
      res.status(500).send("Error retrieving service types");
    } else {
      res.status(200).send({   users,
        totalUsers,
        currentPage : page,
        totalPages: Math.ceil(totalUsers / limit),});
    }
  });
};

const Updategetservicetypes = (req, res) => {
  const id = req.params.id;

  servicetypesmodel.getservice(id, (err, result) => {
    if (err) {
      console.error("error updategetuser ", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

const updateservice = (req, res) => {
  const id = req.params.id;
  const {
    name,
    provider_name,
    capacity,
    fixed,
    distance,
    price,
    minute,
    calculator,
    type,
  } = req.body;

  const image = req.file ? `${req.file.filename}` : null;

  servicetypesmodel.updateservicetypes(
    id,
    {
      name,
      provider_name,
      capacity,
      fixed,
      distance,
      price,
      minute,
      calculator,
      image,
      type,
    },
    (err, result) => {
      if (err) {
        console.error("Error updating service:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res.json(result);
    }
  );
};
const addnewservicetype = (req, res) => {
  const {
    name,
    provider_name,
    capacity,
    fixed,
    distance,
    price,
    minute,
    type,
    discrption,
    calculator,
  } = req.body;
  const image = req.file ? `${req.file.filename}` : null;
  servicetypesmodel.addservicetypes(
    {
      name,
      provider_name,
      capacity,
      fixed,
      distance,
      price,
      minute,
      calculator,
      type,
      discrption,
      image,
    },
    (err, result) => {
      if (err) {
        console.error("Error adding service:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res.json(result);
    }
  );
};

const deleteServiceTypes = (req, res) => {
  const id = req.params.id;
  servicetypesmodel.deleteService(id, (err, result) => {
    if (err) {
      console.error("Error deleting service:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(result);
  });
}
module.exports = {
  getServiceTypes,
  Updategetservicetypes,
  updateservice,
  addnewservicetype,
  deleteServiceTypes
};
