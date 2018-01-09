'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_plant = sequelize.define('user_plant', {
    userId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_plant;
};