const ReviewModel = require('../../../Models/Admin/Review/Review');

const userReview = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
    const offset = (page - 1) * limit;
    ReviewModel.getuserReview(offset , limit, (err, users , totalUsers) => {
        if (err) {
            return res.status(500).json({ error: err.message || 'Database error' }); 
        }
        return res.status(200).json({ message: 'Success', users,
            totalUsers,
            currentPage : page,
            totalPages: Math.ceil(totalUsers / limit), }); 
    }); 
};  

const ProviderReview = (req, res) => {      
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 users per page
    const offset = (page - 1) * limit;  
    ReviewModel.getproviderReview(offset , limit, (err, users , totalUsers) => {
        if (err) {
            return res.status(500).json({ error: err.message || 'Database error' }); 
        }
        return res.status(200).json({ message: 'Success', users,
            totalUsers,
            currentPage : page,
            totalPages: Math.ceil(totalUsers / limit), }); 
    }); 
};

module.exports = { userReview, ProviderReview };