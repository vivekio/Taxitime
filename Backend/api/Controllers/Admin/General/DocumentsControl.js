const documentsmodel = require('../../../Models/Admin/General/DocumentsModel');

const getDocuments = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
    const offset = (page - 1) * limit;
    documentsmodel.getDocuments(offset , limit, (err, users , totalUsers) => {
        if(err){
            res.send(err);
        }
        res.send({   users,
            totalUsers,
            currentPage : page,
            totalPages: Math.ceil(totalUsers / limit),});
    });
}   
const editgetdocuments = (req, res) => {
const  id = req.params.id;
    documentsmodel.editgetdocument(id, (err, result) => {
        if(err){
            res.send(err);
        }    
        res.send(result);
    });
}

const updatedocument = (req, res) => {
    const id = req.params.id;
    const{document_name , type} = req.body;
    console.log(req.body);
    documentsmodel.editdocument( id ,{document_name , type}, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
}

const addnewdocument = (req, res) => {    
    const{document_name , type} = req.body;
    documentsmodel.addnewdocument({document_name , type}, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
}    

const deletedocument = (req, res) => {
    const id = req.params.id;
    documentsmodel.deletedocument(id, (err, result) => {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
}
module.exports = {
    getDocuments ,
    editgetdocuments ,updatedocument , addnewdocument , deletedocument
}
    