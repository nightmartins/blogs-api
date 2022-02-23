module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user', onDelete: 'cascade' });
  };

  return BlogPost;
};

/*
Referências
Uso do associate: https://pt.stackoverflow.com/questions/432406/associa%C3%A7%C3%B5es-com-node-js-sequelize

Corrigir erro 'Cannot delete or update a parent row': https://stackoverflow.com/questions/23128816/sequelize-js-ondelete-cascade-is-not-deleting-records-sequelize
*/
