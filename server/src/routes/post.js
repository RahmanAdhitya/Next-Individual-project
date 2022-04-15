const router = require('express').Router();
const { postControllers } = require('../controllers');
const fileUploader = require('../lib/uploader');
const { loginAuthorizedToken } = require('../middlewares/authMiddleware');

router.post(
  '/',
  loginAuthorizedToken,
  fileUploader({
    destinationFolder: 'posts',
    fileType: 'image',
    prefix: 'POST',
  }).single('post_image_file'),
  postControllers.postUpload
);

router.get('/', loginAuthorizedToken, postControllers.getAllpost);
router.get('/:id', loginAuthorizedToken, postControllers.getPostById);
router.delete('/:id', loginAuthorizedToken, postControllers.deletePost);

router.post('/:id-comment', loginAuthorizedToken, postControllers.commentAPost);

// add alike in a post
router.post('/:id/like', loginAuthorizedToken, postControllers.likeApost);

module.exports = router;
