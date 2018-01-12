'use strict';
module.exports = (sequelize, DataTypes) => {
  var tag = sequelize.define('tag', {
    content: DataTypes.STRING
  });
tag.associate = function (models) {
  models.tag.belongsToMany(models.plant, { through: models.plant_tag });;
};
  return tag;
};