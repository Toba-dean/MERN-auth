const { Router } = require('express');
const router = Router();


const userCtrl = require('../controllers/UserCtrl');
const authMiddleware = require('../middleware/authMiddleware');
const authAdmin = require('../middleware/authAdminMiddleware');
const { getAllUsers, getSingleUser } = userCtrl;


router.route('/all').get(authMiddleware, authAdmin, getAllUsers);
router.route('/:id').get(authMiddleware, getSingleUser);



module.exports = router; 