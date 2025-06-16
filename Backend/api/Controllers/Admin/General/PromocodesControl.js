const promocodesmodel = require('../../../Models/Admin/General/PromocodesModel')

const getPromocodes = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
    const offset = (page - 1) * limit;
    promocodesmodel.getPromocodes(offset , limit, (err, users , totalUsers) => {
        if(err) {
            res.status(500).send({
                error: 'Internal Server Error'
            });
        } else {
            res.status(200).send({   users,
                totalUsers,
                currentPage : page,
                totalPages: Math.ceil(totalUsers / limit),});
        }
    });
}

const editgetpromocode = (req, res) => {
    const id = req.params.id;
    promocodesmodel.editgetpromocode(id, (err, result) => {
        if(err) {
            res.status(500).send({
                error: 'Internal Server Error'
            });
        } else {
            res.status(200).send(result);
        }
    });
}
const updatePromocode = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    console.log(req.body);
    
    promocodesmodel.updatePromocode( id ,data, (err, result) => {
        if(err) {
           return res.status(500).send({
                error: 'Internal Server Error'
            });
        } else {
            res.status(200).send({
                message: 'Promocode updated successfully',
                data: result
            });
        }
    });
}

const addPromocode = (req, res) => {
    const data = req.body;
    console.log(req.body);
    promocodesmodel.addPromocode(data, (err, result) => {
        if(err) {
           return res.status(500).send({
                error: 'Internal Server Error'
            });
        } else {
            res.status(200).send({
                message: 'Promocode added successfully',
                data: result
            });
        }
    });
}
const deletePromocode = (req, res) => {
    const id = req.params.id;
    promocodesmodel.deletePromocode(id, (err, result) => {
        if(err) {
            res.status(500).send({
                error: 'Internal Server Error'
            });
        } else {
            res.status(200).send({
                message: 'Promocode deleted successfully',
                data: result
            });
        }
    });
}
module.exports = {
    getPromocodes,
    editgetpromocode,
    updatePromocode ,
    deletePromocode ,
    addPromocode
}

