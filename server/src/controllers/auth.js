const { Op } = require('sequelize');
const { User } = require('../lib/sequelize');
const bcrypt = require('bcrypt');
const { generateToken } = require('../lib/jwt');

const authControllers = {
  registerUser: async (req, res) => {
    try {
      const { username, email, full_name, password } = req.body;

      const isUsernameEmailRegisterd = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (isUsernameEmailRegisterd) {
        return res.status(400).json({
          message: 'username is not available or email has been registered',
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 5);

      await User.create({
        username,
        email,
        full_name,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: 'register succsess',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'server error',
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const findUser = await User.findOne({
        where: {
          username,
        },
      });

      if (!findUser) {
        res.status(400).json({
          message: 'wrong username, email or password',
        });
      }

      const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: 'wrong username, email or password',
        });
      }

      delete findUser.dataValues.password;

      const token = generateToken({
        id: findUser.id,
        role: findUser.role,
      });

      return res.status(200).json({
        message: 'Login success',
        result: {
          user: findUser,
          token,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'server error',
      });
    }
  },
  profileCreate: async (req, res) => {
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
      // const profileDAO = new DAO(Profile);

      // const newPicture = await profileDAO.pictureUpload('profile_picture', req.body);
      // return res.status(201).json({
      //   message: 'upload success',
      //   result: newPicture,
      // });
    } catch (err) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  },
};

module.exports = authControllers;
