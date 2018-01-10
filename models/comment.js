'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    authorName: DataTypes.STRING,
    plantId: DataTypes.INTEGER
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //     }
    // }
  });

  comment.associate = function (models) {
    models.comment.belongsTo(models.plant);
  };

  return comment;
};