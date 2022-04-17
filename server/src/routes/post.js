const router = require('express').Router();
const { postControllers } = require('../controllers');
const { deleteComment } = require('../controllers/post');
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
router.get('/user/:id', loginAuthorizedToken, postControllers.getAllpostByUserId);

router.delete('/:id', loginAuthorizedToken, postControllers.deletePost);
router.delete('/comment/:id ', postControllers.deleteComment);

router.post('/:id-comment', loginAuthorizedToken, postControllers.commentAPost);
router.post('/:id/like', loginAuthorizedToken, postControllers.likeApost); // add alike in a post

module.exports = router;
