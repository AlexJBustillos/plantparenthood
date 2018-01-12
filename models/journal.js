'use strict';
module.exports = (sequelize, DataTypes) => {
  var journal = sequelize.define('journal', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  });

  journal.associate = function (models) {
    models.journal.belongsTo(models.user);
  };

  return journal;
};