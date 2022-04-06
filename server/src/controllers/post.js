const { Post, User, Like } = require('../lib/sequelize');

const postControllers = {
  postUpload: async (req, res) => {
    try {
      const { image_url, caption, location } = req.body;

      // const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      // const filePath = 'post_image';
      // const { filename } = req.file;

      const newPost = await Post.create({
        image_url,
        // `${uploadFileDomain}/${filePath}/${filename}`,
        caption,
        location,
        // UserId: req.token.id,
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
};

module.exports = postControllers;
