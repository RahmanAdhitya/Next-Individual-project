const { DataTypes } = require('sequelize');

const Comment = (sequlize) => {
  return sequlize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = Comment;
