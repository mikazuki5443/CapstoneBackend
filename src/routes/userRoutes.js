const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login',userController.LoginUser);

router.get('/profile', authMiddleware, (req, res) => {
    res.json({user: req.user});
});

module.exports = router;