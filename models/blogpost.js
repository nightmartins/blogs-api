const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  BlogPost.associate = (models) => {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
/* Referência do uso do associate: 
https://pt.stackoverflow.com/questions/432406/associa%C3%A7%C3%B5es-com-node-js-sequelize */

  return blogPost;
};

module.exports = BlogPost;