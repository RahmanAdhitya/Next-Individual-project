const { DataTypes } = require('sequelize');

const Profile = (sequelize) => {
  return sequelize.define('Profile', {
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

module.exports = Profile;
