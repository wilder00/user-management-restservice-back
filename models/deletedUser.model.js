const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

const DeletedUser = sequelize.define('DeletedUser', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  //to known the role (at that moment) of the person who has deleted 
  asRole: {
    type: DataTypes.STRING,
    allowNull: false,
  }

}, {
  // Other model options go here

});


// To modify the way that an instance show data (filtering what we want to show)
// it's needed a function() instead of arrow function
DeletedUser.prototype.toJSON = function(){
  //console.log("To object: ", this.dataValues);
  const { updatedAt, createdAt,  ...deletedUser} = this.dataValues;
  return deletedUser;
}


module.exports = DeletedUser