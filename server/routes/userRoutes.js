const { Router } = require('express');
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl')
const { registerUser, activateUser,  getUser } = userCtrl;


router.route('/register').post(registerUser)
router.route('/activate').post(activateUser);
router.route('/login').post(getUser);


module.exports = router;