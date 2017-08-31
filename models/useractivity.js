'use strict';
module.exports = function(sequelize, DataTypes) {
  var userActivity = sequelize.define('userActivity', {
    activityId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    howMany: DataTypes.DECIMAL,
    doneOn: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userActivity;
};