const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');
const DeletedUser = require('./deletedUser.model');

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // if user is active ( if the user is deleted or disabled)
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  // for new users false, after Admin accept the request, true
  acceptedRequest: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  google: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  // Other model options go here

});

User.hasOne(DeletedUser,{
  foreignKey:{
    name: 'userId',
    allowNull: false,
    sourceKey: 'id',
  }
})

DeletedUser.belongsTo(User,{
  foreignKey:{
    name: 'userId',
    allowNull: false,
    targetId: 'id'
  }
})

// to identify by whom he/she was deleted

User.hasOne(DeletedUser,{
  foreignKey:{
    name: 'byUserId',
    allowNull: false,
    sourceKey: 'id',
  }
})

DeletedUser.belongsTo(User,{
  foreignKey:{
    name: 'byUserId',
    allowNull: false,
    targetId: 'id'
  }
})


// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

// To modify the way that an instance show data (filtering what we want to show)
// it's needed a function() instead of arrow function
User.prototype.toJSON = function(){
  //console.log("To object: ", this.dataValues);
  const { password, updatedAt, createdAt,  ...user} = this.dataValues;
  return user;
}


module.exports = User