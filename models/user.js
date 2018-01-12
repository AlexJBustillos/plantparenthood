'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 32],  //cant be less than 6 char, more than 32
          msg: 'Password must be between 6 and 32 characters long'
        }
      }
    },
    zipcode: DataTypes.INTEGER,
    userImg: DataTypes.STRING,
    lastWatered: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options){
        if(pendingUser && pendingUser.password){ //if pendinguser not null & pw not empty
          var hash = bcrypt.hashSync(pendingUser.password, 10); //10 = salt rounds
          pendingUser.password = hash;
        }
      }
    }
  });

user.associate = function (models) {
  models.user.belongsToMany(models.plant, { through: models.user_plant });
  models.user.hasMany(models.journal);
};

// For loggin in, comparing pw typed with the pw stored in user row in table
user.prototype.isValidPassword = function(passwordTyped){
  return bcrypt.compareSync(passwordTyped, this.password);
}

// If we want to return a stringified object to our front end
// But, we don't include PW! Delete PW from user object before it gets passed anywhere
user.prototype.toJSON = function(){
  var user = this.get();
  delete user.password;
  return user;
}

return user;

};