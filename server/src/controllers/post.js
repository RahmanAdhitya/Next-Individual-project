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
  editPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { caption } = req.body;
      console.log(caption);
      console.log(id);

      const editPost = await Post.update(
        { caption },
        {
          where: {
            id,
            UserId: req.token.id,
          },
        }
      );

      if (!editPost) {
        return res.status(200).json({
          message: 'post not found',
        });
      }

      return res.status(201).json({
        message: 'edit caption success',
        result: caption,
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
      const { _limit = 10, _page = 1, _sortBy = '', _sortDir = '' } = req.query;

      delete req.query._limit;
      delete req.query._page;
      delete req.query._sortBy;
      delete req.query._sortDir;

      const allpost = await Post.findAndCountAll({
        where: {
          ...req.query,
        },
        limit: _limit ? parseInt(_limit) : undefined,
        offset: (_page - 1) * _limit,
        include: [
          {
            model: Comment,
            include: [{ model: User, attributes: ['id', 'username'], order: [['createdAt', 'DESC']] }],
          },
          { model: User, attributes: ['username', 'full_name', 'image_url'] },
          {
            model: Like,
            include: [{ model: User, attributes: ['id', 'username'], order: [['createdAt', 'DESC']] }],
          },
        ],
        distinct: true,
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

      const allpost = await Post.findByPk(id, {
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
        result: allpost,
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
      const { PostId } = req.params;

      const findLikeStatus = await Like.findOne({
        where: {
          PostId,
          UserId: req.token.id,
        },
        defaults: {
          ...req.body,
        },
      });

      if (!findLikeStatus) {
        const likingPost = await Post.findByPk(PostId);
        await Like.create({
          PostId,
          UserId: req.token.id,
        });

        await likingPost.increment('like_count', { by: 1 });

        return res.status(200).json({
          message: 'Liked post',
        });
      }

      if (findLikeStatus) {
        await Like.destroy({
          where: {
            PostId,
            UserId: req.token.id,
          },
          defaults: {
            ...req.body,
          },
        });

        const likedPost = await Post.findByPk(PostId);

        await likedPost.decrement('like_count', { by: 1 });

        return res.status(200).json({
          message: 'disLiked post',
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Server error',
      });
    }
  },
  likeSatus: async (req, res) => {
    const { PostId } = req.params;

    const findLikeStatus = await Like.findOne({
      where: {
        PostId,
        UserId: req.token.id,
      },
    });

    if (findLikeStatus) {
      return res.status(200).json({
        message: 'post already like',
        result: true,
      });
    }
    if (!findLikeStatus) {
      return res.status(200).json({
        message: 'post not liked yet',
        result: false,
      });
    }
  },
  getAllpostByUserId: async (req, res) => {
    const { id } = req.params;
    try {
      const allpost = await Post.findAndCountAll({
        where: {
          UserId: id,
        },
        include: [
          {
            model: Comment,
            include: [{ model: User, attributes: ['id', 'username'] }],
            // order: [['createdAt', 'DESC']],
          },
          { model: User, attributes: ['username', 'full_name', 'image_url', 'id', 'bio'] },
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
};
module.exports = postControllers;
