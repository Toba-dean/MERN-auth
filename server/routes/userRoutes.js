const { Router } = require('express');
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl')
const { registerUser, activateUser,  getUser, getAccessToken } = userCtrl;


router.route('/register').post(registerUser);
router.route('/activate').post(activateUser);
router.route('/login').post(getUser);
router.route('/access').post(getAccessToken);


module.exports = router;