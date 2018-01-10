'use strict';
module.exports = (sequelize, DataTypes) => {
  var tag = sequelize.define('tag', {
    content: DataTypes.STRING
  // }
  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       models.tag.belongsToMany(models.plant, { through: models.plant_tag });
  //     }
  //   }
  });

tag.associate = function (models) {
  models.tag.belongsToMany(models.plant, { through: models.plant_tag });;
};

  return tag;
};