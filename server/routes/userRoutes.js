const { Router } = require('express');
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl')
const { registerUser, getUser } = userCtrl;


router.route('/user').post(registerUser)


module.exports = router;