const { DataTypes } = require('sequelize');

const Comment = (sequlize) => {
  return sequlize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      // primaryKey: true,
      allowNull: true,
      unique: false,
    },
  });
};

module.exports = Comment;
