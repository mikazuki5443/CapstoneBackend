const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try{
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err)
    {
        res.status(500).json({error: 'Failed to fetch users'});
    }
};

module.exports = {
    getAllUsers
};