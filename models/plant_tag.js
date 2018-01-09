'use strict';
module.exports = (sequelize, DataTypes) => {
  var plant_tag = sequelize.define('plant_tag', {
    tagId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return plant_tag;
};