const { Router } = require('express');
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl')
const { getUser } = userCtrl;


router.route('/').get(getUser)


module.exports = router;