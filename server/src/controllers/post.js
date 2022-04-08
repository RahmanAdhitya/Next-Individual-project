const { Post, User, Like, Comment } = require('../lib/sequelize');

const postControllers = {
  postUpload: async (req, res) => {
    try {
      const { caption, location } = req.body;

      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = 'post_images';
      const { filename } = req.file;

      const newPost = await Post.create({
        image_url: `${uploadFileDomain}/${filePath}/${filename}`,
        caption,
        location,
        UserId: req.token.id,
      });

      return res.status(201).json({
        message: 'create new post success',
        result: newPost,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;

      const deletePost = await Post.destroy({
        where: {
          id,
          UserId: req.token.id,
        },
      });

      return res.status(201).json({
        message: 'Delete Post succsess',
        result: deletePost,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Server error',
      });
    }
  },
  getAllpost: async (req, res) => {
    try {
      const allpost = await Post.findAll({ include: User, Like, Comment });

      return res.status(200).json({
        message: 'get all post succsess',
        result: allpost,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Server error',
      });
    }
  },
};

module.exports = postControllers;
