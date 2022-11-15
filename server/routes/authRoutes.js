const { Router } = require('express');
const router = Router();


const authCtrl = require('../controllers/AuthCtrl');
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, activateUser, login, getAccessToken, forgotPassword, resetPassword, logOut } = authCtrl;


router.route('/register').post(registerUser);
router.route('/activate').post(activateUser);
router.route('/login').post(login);
router.route('/access').post(getAccessToken);
router.route('/forget').post(forgotPassword);
router.route('/reset').post(authMiddleware, resetPassword);
router.route('/logout').get(logOut);


module.exports = router;