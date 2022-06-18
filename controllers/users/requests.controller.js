
const { request, response } = require('express')
const User = require('../../models/user.model')

const getUserRequests = async ( req = request, res = response) =>{
  const where = { acceptedRequest: false }
  
  try {
    const users = await User.findAll({ where });
    res.json({
      users
    })  
  } catch (error) {
    res.status(400).json({
      message: "no se pudo obtener la lista de usuarios"
    })
  }
}


module.exports = {
  getUserRequests
}