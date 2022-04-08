const router = require('express').Router();
const { postControllers } = require('../controllers');
const fileUploader = require('../lib/uploader');
const { loginAuthorizedToken } = require('../middlewares/authMiddleware');

router.post(
  '/',
  loginAuthorizedToken,
  fileUploader((isPostContent = true), {
    destinationFolder: 'posts',
    fileType: 'image',
    prefix: 'POST',
  }).single('post_image_file'),
  postControllers.postUpload
);

router.get('/', postControllers.getAllpost);
router.get('/:id', loginAuthorizedToken);
router.delete('/:id', loginAuthorizedToken, postControllers.deletePost);

module.exports = router;
