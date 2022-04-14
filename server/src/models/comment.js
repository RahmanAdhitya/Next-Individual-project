const { DataTypes } = require('sequelize');

const Comment = (sequelize) => {
  return sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
  });
};

module.exports = Comment;
