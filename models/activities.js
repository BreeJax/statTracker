"use strict"
module.exports = function(sequelize, DataTypes) {
  var Activities = sequelize.define(
    "Activities",
    {
      activityName: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  )
  return Activities
}
