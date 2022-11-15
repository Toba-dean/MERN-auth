const { Router } = require('express');
const router = Router();


const userCtrl = require('../controllers/UserCtrl');
const authMiddleware = require('../middleware/authMiddleware');
const authAdmin = require('../middleware/authAdminMiddleware');
const { getAllUsers, getSingleUser, updateUser, updateRole, deleteUser } = userCtrl;


router.route('/all').get(authMiddleware, authAdmin, getAllUsers);
router.route('/').get(authMiddleware, getSingleUser);
router.route('/update').patch(authMiddleware, updateUser);
router.route('/update-role/:id').patch(authMiddleware, authAdmin, updateRole);
router.route('/delete/:id').delete(authMiddleware, authAdmin, deleteUser);



module.exports = router; 