const router = require('express').Router();
const { postControllers } = require('../controllers');
const fileUploader = require('../lib/uploader');
const { loginAuthorizedToken } = require('../middlewares/authMiddleware');

router.post(
  '/',
  // loginAuthorizedToken,
  fileUploader({
    destinationFolder: 'posts',
    fileType: 'image',
    prefix: 'POST',
  }).single('post_image_file'),
  postControllers.postUpload
);
module.exports = router;
