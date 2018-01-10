'use strict';
module.exports = (sequelize, DataTypes) => {
  var journal = sequelize.define('journal', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       // associations can be defined here
  //     }
  //   }
  });

  journal.associate = function (models) {
    models.journal.belongsTo(models.user);
  };

  return journal;
};