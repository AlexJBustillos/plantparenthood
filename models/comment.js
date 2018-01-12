'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    authorName: DataTypes.STRING,
    plantId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  });

  comment.associate = function (models) {
    models.comment.belongsTo(models.plant);
  };

  return comment;
};