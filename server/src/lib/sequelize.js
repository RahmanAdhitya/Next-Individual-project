const { Sequelize } = require('sequelize');
const mysqlConfig = require('../config/database');

const sequelize = new Sequelize({
  username: mysqlConfig.MYSQL_USERNAME,
  password: mysqlConfig.MYSQL_PASSWORD,
  database: mysqlConfig.MYSQL_DB_NAME,
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

// Modals
const User = require('../models/user')(sequelize);
const Post = require('../models/post')(sequelize);
const Comment = require('../models/comment')(sequelize);
const Like = require('../models/like')(sequelize);

// Associations

// 1:M
Post.belongsTo(User);
User.hasMany(Post);

//M:N
Post.belongsToMany(User, { through: Like });
Post.belongsToMany(User, { through: Comment });
User.belongsToMany(Post, { through: Like });
User.belongsToMany(Post, { through: Comment });
Post.hasMany(Comment);
User.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Post);
User.hasMany(Like);
Like.belongsTo(User);
Post.hasMany(Like);
Like.belongsTo(Post);

module.exports = {
  sequelize,
  User,
  Post,
  Comment,
  Like,
};
