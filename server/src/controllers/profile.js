const { Profile } = require('../lib/sequelize');

const profileConttollers = {
  profilePictUpload: async (req, res) => {
    try {
      const { bio } = req.body;

      const upLoadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filepath = 'profile_picture';
      const { filename } = req.file;

      const newProfile = await Profile.create({
        image_url: `${upLoadFileDomain}/${filepath}/${filename}`,
        bio,
        UserId: req.token.id,
      });

      if (!newProfile) {
        res.status(400).json({
          message: 'data failed',
        });
      }

      return res.status(201).json({
        message: 'profile create succses',
        result: newProfile,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  },
};

module.exports = profileConttollers;
