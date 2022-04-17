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

      if (!deletePost) {
        return res.status(200).json({
          message: 'post not found',
          result: deletePost,
        });
      }

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
      const allpost = await Post.findAll({
        include: [
          {
            model: Comment,
            include: [{ model: User, attributes: ['id', 'username'] }],
            // order: [['createdAt', 'DESC']],
          },
          { model: User, attributes: ['username', 'full_name', 'image_url'] },
        ],
        order: [['createdAt', 'DESC']],
      });

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
  getPostById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Post.findByPk(id, {
        include: [
          {
            model: Comment,
            include: [{ model: User, attributes: ['id', 'username'] }],
          },
          { model: User, attributes: ['username', 'full_name', 'image_url'] },
        ],
      });

      return res.status(200).json({
        message: 'get post succsess',
        result: data,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Server error',
      });
    }
  },
  commentAPost: async (req, res) => {
    try {
      const { comment } = req.body;
      const { id } = req.params;

      const newcomment = await Comment.create({
        comment,
        UserId: req.token.id,
        PostId: id,
      });

      res.status(201).json({
        message: 'create comment to a post succsess',
        result: newcomment,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Server error',
      });
    }
  },
  likeApost: async (req, res) => {
    try {
      const { id } = req.params;

      const findPost = await Post.findByPk(id);

      const newcomment = await Comment.create({
        UserId: req.token.id,
        PostId: findPost.id,
      });

      await Post.increment(
        { like_count: 1 },
        {
          where: {
            id: findPost,
          },
        }
      );

      res.status(201).json({
        message: 'create comment to a post succsess',
        result: newcomment,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Server error',
      });
    }
  },
  getAllpostByUserId: async (req, res) => {
    const { id } = req.params;
    try {
      const allpost = await Post.findAll({
        where: {
          UserId: id,
        },
        include: [
          {
            model: Comment,
            include: [{ model: User, attributes: ['id', 'username'] }],
            // order: [['createdAt', 'DESC']],
          },
          { model: User, attributes: ['username', 'full_name', 'image_url', 'id'] },
        ],
        order: [['createdAt', 'DESC']],
      });

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
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;

      // const findComment = await Comment.findByPk(id);

      const deleteAComment = await Comment.findByPk({
        id,
        // where: {
        //   id,
        // },
      });

      if (!deleteAComment) {
        return res.status(200).json({
          message: 'comment not found',
        });
      }

      return res.status(200).json({
        message: 'Delete Comment succsess',
        result: deleteAComment,
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
