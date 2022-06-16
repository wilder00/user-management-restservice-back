
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

const Role = sequelize.define('Role',{
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },
 roleName: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
 }
})


// To modify the way that an instance show data (filtering what we want to show)
// it's needed a function() instead of arrow function
Role.prototype.toJSON = function(){
  //console.log("To object: ", this.dataValues);
  const { updatedAt, createdAt,  ...role} = this.dataValues;
  return role;
}

module.exports = Role