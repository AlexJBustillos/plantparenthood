'use strict';
module.exports = (sequelize, DataTypes) => {
  var plant = sequelize.define('plant', {
    name: DataTypes.STRING,
    botanicalName: DataTypes.STRING,
    light: DataTypes.STRING,
    temperature: DataTypes.STRING,
    humidity: DataTypes.STRING,
    water: DataTypes.STRING,
    soil: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }
  // ,{
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //       models.plant.belongsToMany(models.tag, { through: models.plant_tag });
  //       models.plant.belongsToMany(models.user, { through: models.user_plant });
  //     }
  //   }  
  // }
  );

plant.associate = function (models) {
  models.plant.belongsToMany(models.tag, { through: models.plant_tag });
  models.plant.belongsToMany(models.user, { through: models.user_plant });
};

  return plant;
};
