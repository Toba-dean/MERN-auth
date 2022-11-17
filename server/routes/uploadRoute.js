const { Router } = require('express');
const router = Router();


const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadImgMiddleware');
const { uploadAvatar } = require('../controllers/UploadCtrl')


router.route('/').post(uploadMiddleware, authMiddleware, uploadAvatar);


module.exports = router;  