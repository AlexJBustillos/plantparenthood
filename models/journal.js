'use strict';
module.exports = (sequelize, DataTypes) => {
  var journal = sequelize.define('journal', {
    content: DataTypes.STRING,
    plantId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.journal.belongsTo(models.plant);
      }
    }
  });
  return journal;
};