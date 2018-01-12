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
  }, {
    hooks: {
        beforeCreate: function(pendingPlant, options){
        if(pendingPlant && pendingPlant.light){ 
          var newValue;

          if(pendingPlant.light === "1-2"){
            newValue = 2;
          } 
          else if(pendingPlant.light === "2-3"){
            newValue = 3;
          } 
          else if(pendingPlant.light === "3-4"){
            newValue = 4;
          }
          else if(pendingPlant.light === "2-4"){
            newValue = 3;
          } 
          else {
            newValue = pendingPlant.light;
          }
          pendingPlant.light = newValue; 
        }

          if(pendingPlant && pendingPlant.temperature){ 
          var newValue;

          if(pendingPlant.temperature === "1-2"){
            newValue = 2;
          } 
          else if(pendingPlant.temperature === "2-3"){
            newValue = 3;
          } 
          else if(pendingPlant.temperature === "3-4"){
            newValue = 4;
          }
          else if(pendingPlant.temperature === "2-4"){
            newValue = 3;
          } 
          else {
            newValue = pendingPlant.temperature;
          }
          pendingPlant.temperature = newValue; 
        }

          if(pendingPlant && pendingPlant.humidity){ 
          var newValue;

          if(pendingPlant.humidity === "1-2"){
            newValue = 2;
          } 
          else if(pendingPlant.humidity === "2-3"){
            newValue = 3;
          } 
          else if(pendingPlant.humidity === "3-4"){
            newValue = 4;
          }
          else if(pendingPlant.humidity === "2-4"){
            newValue = 3;
          } 
          else {
            newValue = pendingPlant.humidity;
          }
          pendingPlant.humidity = newValue; 
        }

          if(pendingPlant && pendingPlant.water){ 
          var newValue;

          if(pendingPlant.water === "1-2"){
            newValue = 2;
          } 
          else if(pendingPlant.water === "2-3"){
            newValue = 3;
          } 
          else if(pendingPlant.water === "3-4"){
            newValue = 4;
          }
          else if(pendingPlant.water === "2-4"){
            newValue = 3;
          } 
          else {
            newValue = pendingPlant.water;
          }
          pendingPlant.water = newValue; 
        }

        if(pendingPlant && pendingPlant.soil){ 
          var newValue;

          if(pendingPlant.soil === "1-2"){
            newValue = 2;
          } 
          else if(pendingPlant.soil === "2-3"){
            newValue = 3;
          } 
          else if(pendingPlant.soil === "3-4"){
            newValue = 4;
          }
          else if(pendingPlant.soil === "2-4"){
            newValue = 3;
          } 
          else {
            newValue = pendingPlant.soil;
          }
          pendingPlant.soil = newValue; 
        }

      }
    }
  }
  );

plant.associate = function (models) {
  models.plant.belongsToMany(models.tag, { through: models.plant_tag });
  models.plant.belongsToMany(models.user, { through: models.user_plant });
  models.plant.hasMany(models.comment);
};

  return plant;
};
