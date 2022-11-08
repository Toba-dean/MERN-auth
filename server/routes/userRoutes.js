const { Router } = require('express');
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl')
const { registerUser, activateUser,  getUser } = userCtrl;


router.route('/user').post(registerUser)
router.route('/activate').post(activateUser);


module.exports = router;