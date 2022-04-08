const router = require('express').Router();
const { profileControllers } = require('../controllers');
const fileUploader = require('../lib/uploader');
const { loginAuthorizedToken } = require('../middlewares/authMiddleware');

// router.post(
//   '/',
//   loginAuthorizedToken,
//   fileUploader(!isPostContent, {
//     destinationFolder: 'profile_picture',
//     prefix: 'Profile',
//     fileType: 'image',
//   }).single('profile_image_file'),
//   profileControllers.profilePictUpload
// );

router.post(
  '/',
  loginAuthorizedToken,
  fileUploader(!isPostContent, {
    destinationFolder: 'profile_picture',
    fileType: 'image',
    prefix: 'Profile',
  }).single('profile_image_file'),
  profileControllers.profilePictUpload
);

module.exports = router;
