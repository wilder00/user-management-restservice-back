const { Sequelize } = require('sequelize');

const DB_URL_CONNECTION = process.env.DB_URL_CONNECTION
// Option 1: Passing a connection URI
const sequelize = new Sequelize(DB_URL_CONNECTION) // Example for postgres

module.exports = sequelize