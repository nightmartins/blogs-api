const PostsCategorie = (sequelize, _DataTypes) => {
  const postsCategorie = sequelize.define('PostsCategorie', {},
  { timestamps: false, 
  });

  PostsCategorie.associate = (models) => {
    this.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    this.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostsCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postsCategorie;
};
/*
Referência para uso do belongsToMany:
https://github.com/tryber/sd-014-b-project-blogs-api/pull/16
*/

module.exports = PostsCategorie;