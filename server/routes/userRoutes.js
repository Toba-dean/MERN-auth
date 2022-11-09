const { Router } = require('express');
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, activateUser, getUser, getAccessToken, forgotPassword, resetPassword, logOut } = userCtrl;


router.route('/register').post(registerUser);
router.route('/activate').post(activateUser);
router.route('/login').post(getUser);
router.route('/access').post(getAccessToken);
router.route('/forget').post(forgotPassword);
router.route('/reset').post(authMiddleware, resetPassword);
router.route('/logout').get(logOut);


module.exports = router;