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

        // Reverse water ranking scale so 1=low light, 4=high light, and fix ranges
        if(pendingPlant && pendingPlant.light){ 
          var newValue;
          if(pendingPlant.light === "1" || pendingPlant.light === "1-2"){
            newValue = 4;
          } 
          else if(pendingPlant.light === "2" || pendingPlant.light === "1-3" || pendingPlant.light === "3-2" || pendingPlant.light === "2-3" || pendingPlant.light === "2-4"){
            newValue = 3;
          } 
          else if(pendingPlant.light === "3" || pendingPlant.light === "3-4"){
            newValue = 2;
          } 
          else if(pendingPlant.light === "4" ){
            newValue = 1;
          }  
          pendingPlant.light = newValue; 
        }

        // Fix ranges in temperature
        if(pendingPlant && pendingPlant.temperature){ 
          var newValue;
          if(pendingPlant.temperature === "1-2" || pendingPlant.temperature === "1-3"){
            newValue = 2;
          } 
          else if(pendingPlant.temperature === "2-3" || pendingPlant.temperature === "2-4"){
            newValue = 3;
          } 
          else if(pendingPlant.temperature === "3-4"){
            newValue = 4;
          }
          else {
            newValue = pendingPlant.temperature;
          }
          pendingPlant.temperature = newValue; 
        }

        // Reverse scale for humidity so 1=low, 3=high, and fix ranges
        if(pendingPlant && pendingPlant.humidity){ 
          var newValue;
          if(pendingPlant.humidity === "1" || pendingPlant.humidity === "1-2"){
            newValue = 3;
          } 
          else if(pendingPlant.humidity === "2" || pendingPlant.humidity === "2-3" || pendingPlant.temperature === "1-3"){
            newValue = 2;
          } 
          else if(pendingPlant.humidity === "3"){
            newValue = 1;
          } 
          pendingPlant.humidity = newValue; 
        }

        // Reverse scale for water so 1=low, 3=high, and fix ranges
        if(pendingPlant && pendingPlant.water){ 
          var newValue;
          if(pendingPlant.water === "1" || pendingPlant.water === "1-2"){
            newValue = 3;
          } 
          else if(pendingPlant.water === "2" || pendingPlant.water === "2-3" || pendingPlant.water === "1-3"){
            newValue = 2;
          } 
          else if(pendingPlant.water == "3"){
            newValue = 1;
          } 
          pendingPlant.water = newValue; 
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
