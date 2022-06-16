const express = require('express');
const cors = require('cors');
const db = require('../../database/connection');

class Server{
  constructor(){
    this.app = express()
    this.port = process.env.PORT || 3001

    this.dbConnection();
    this.dbSynchronize();
    this.middlewares();
    this.routes();
  }


  middlewares(){
    this.app.use( cors() )
    this.app.use( express.json() )
    this.app.use( express.static('public') )
  }

  routes(){
    this.app.use( '/api/users', require('../../routes/users.route'));
    this.app.use( '/api/roles', require('../../routes/roles.route'));
    this.app.use( '/api/auth', require('../../routes/auth.route'));
  }


  async dbConnection(){
    try {
      await db.authenticate();
      console.log('database online');
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async dbSynchronize(){
    try {
      await db.sync({ alter: true });
      console.log('database synchronized');
    } catch (error) {
      throw new Error(error);
    }
  }

  async closeDbConnection(){
    try {
      await db.close()
      console.log('database offline');
    } catch (error) {
      throw new Error(error);
    }
  }


  listen(){
    this.app.listen(this.port,()=>{
      console.log("App is listen on port: ", this.port);
    });
  }
}

module.exports = Server;