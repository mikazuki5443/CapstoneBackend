// src/controllers/userController.js

const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try{
        const {user_id, user_pwd, user_name, user_phone, user_email} = req.body;
        const existingUser = await userModel.getUserById();

        if(existingUser)
        {
            return res.status(400).json({error : 'User already exists'});
        }

        const user_no = await userModel.createUser({user_id, user_pwd, user_name, user_phone, user_email});
        const user = {user_no, user_id};
        const token = userModel.generateAuthToken(user_no);

        res.status(201).json({token});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Failed to register user'});
    }
};

const LoginUser = async (req, res) => {
    try{
        const {user_id, uwer_pwd } = req.body;
        const user = await userModel.getUserById(user_id);

        if(!user || !(await bcrypt.compare(user_pwd, user.user_pwd))) {
            return res.status(400).json({error: 'Invalid user ID or password'});
        }

        const token = userModel.generateAuthToken(user);
        res.status(200).json({token});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Failed to login'});
    }
};

module.exports = {
    registerUser,
    LoginUser
};
