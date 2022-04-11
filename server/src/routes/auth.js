const router = require('express').Router();
const { authControllers } = require('../controllers');
const fileUploader = require('../lib/uploader');
const { loginAuthorizedToken } = require('../middlewares/authMiddleware');

router.post('/register', authControllers.registerUser);
router.post('/login', authControllers.loginUser);
router.get('/', loginAuthorizedToken, authControllers.getUserData);

router.patch(
  '/profile',
  loginAuthorizedToken,
  fileUploader({
    destinationFolder: 'profile_picture',
    fileType: 'image',
    prefix: 'Profile',
  }).single('profile_image_file'),
  authControllers.profileCreateAndEditProfile
);

module.exports = router;
