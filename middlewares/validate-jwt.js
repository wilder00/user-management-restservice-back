const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

const validateJWT = async ( req = request, res = response, next) => {
  const token = req.headers['acc-token'];
  console.log("El token ==================> ", token);

  if( !token ){
    return res.status(401).json({
      mensaje: "Se requiere autenticación"
    })
  }

  try {
    // throw error if it's not a valid token
    const { uid } = jwt.verify( token, process.env.SING_JWT_TOKEN_KEY )
    // passing a variable by object req
    req.uid = uid
    
    //  read the uid user
    const user = await User.findByPk(uid);
    req.user = user;

    if( !user ){
      return res.status(401).json({
        message: "token no válido - usuario eliminado"
      })
    }

    //verify whether the uid user has true state
    if( !user.state ){
      return res.status(401).json({
        message: "token no válido - usuario deshabilitado"
      })
    }

    next()
  } catch (error) {
    console.log(error);
    res.status(401).json({
      mensaje: 'Token no válido'
    })

  }
  
}

module.exports = {
  validateJWT
}