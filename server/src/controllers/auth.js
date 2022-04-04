const { Op } = require('sequelize');
const { User } = require('../lib/sequelize');
const bcrypt = require('bcrypt');

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

      await User.Create({
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
};

module.exports = authControllers;
