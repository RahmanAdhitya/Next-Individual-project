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
User.hasMany(Like);
User.hasMany(Comment);
Like.belongsTo(User);
Comment.belongsTo(User);
Post.hasMany(Like);
Post.hasMany(Comment);
Like.belongsTo(Post);
Comment.belongsTo(Post);

module.exports = {
  sequelize,
  User,
  Post,
  Comment,
  Like,
};
