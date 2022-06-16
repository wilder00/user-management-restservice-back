require('dotenv').config()

const Server = require('./models/app/server')
const server = new Server()


server.listen();