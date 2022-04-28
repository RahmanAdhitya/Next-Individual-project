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
      return res.status(500).json({
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
        return res.status(400).json({
          message: 'Wrong username or password',
        });
      }

      const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);

      if (!isPasswordCorrect) {
        console.log(isPasswordCorrect);
        return res.status(400).json({
          message: 'Wrong username or password',
        });
      }

      delete findUser.dataValues.password;

      const token = generateToken({
        id: findUser.id,
      });

      // await mailer({
      //   to: findUser.email,
      //   subject: "Logged in account",
      //   text: "An account using your email has logged in"
      // })

      return res.status(200).json({
        message: 'Logged in user',
        result: {
          user: findUser,
          token,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Server error',
      });
    }
  },
  editProfile: async (req, res) => {
    try {
      const { id, bio, username, email, full_name, image_url, is_verified } = req.body;

      // const isUsernameEmailRegisterd = await User.findOne({
      //   where: { username },
      // });

      // if (isUsernameEmailRegisterd) {
      //   return res.status(400).json({
      //     message: 'username is not available',
      //   });
      // }
      const updateData = { id, username, bio, email, full_name, image_url, is_verified };
      console.log(updateData);
      const newProfile = await User.update(updateData, { where: { id: req.token.id } });

      if (!newProfile) {
        return res.status(400).json({
          message: 'data failed',
        });
      }

      return res.status(201).json({
        message: 'profile create or edit succses',
        result: { ...updateData },
      });
    } catch (err) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  },
  uploadProfilPic: async (req, res) => {
    try {
      const upLoadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filepath = 'profile_picture';
      const { filename } = req.file;

      const updateData = { image_url: `${upLoadFileDomain}/${filepath}/${filename}` };
      console.log(updateData);
      const newProfile = await User.update(updateData, { where: { id: req.token.id } });

      if (!newProfile) {
        return res.status(400).json({
          message: 'data failed',
        });
      }

      return res.status(201).json({
        message: 'profile create or edit succses',
        result: updateData,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  },
  getUserData: async (req, res) => {
    try {
      const findUser = await User.findOne({
        where: {
          id: req.token.id,
        },
      });

      delete findUser.dataValues.password;
      return res.status(200).json({
        message: 'Logged in user',
        result: {
          user: findUser,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  },
  getUserDataById: async (req, res) => {
    try {
      const { id } = req.params;

      const findUser = await User.findOne({
        where: {
          id,
        },
      });

      delete findUser.dataValues.password;
      return res.status(200).json({
        message: 'user data gate success',
        result: findUser,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  },
};

module.exports = authControllers;
