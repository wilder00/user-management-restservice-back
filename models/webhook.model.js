const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

const Webhook = sequelize.define('Webhook', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  feedback: {
    type: DataTypes.JSON,
    allowNull: true
  },
  
}, {
  // Other model options go here

});



module.exports = Webhook