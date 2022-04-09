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

router.get('/', postControllers.getAllpost);
router.get('/:id', loginAuthorizedToken);
router.delete('/:id', loginAuthorizedToken, postControllers.deletePost);

// create a comment but comment in same postId with same userID can't done because sequilize assume as dublicate object
// need to be fix
router.post('/:id/comment', loginAuthorizedToken, postControllers.commentAPost);

// add alike in a post
router.post('/:id/like', loginAuthorizedToken, postControllers.likeApost);

module.exports = router;
