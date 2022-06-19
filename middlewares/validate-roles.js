
const { request, response } = require('express')

const isAdminRole = ( req = request, res = response, next)=>{
  if(!req.user){
    return res.status(500).json({
      message: 'Se quiere verificar el rol sin validar el token primero'
    })
  }
  const { role , name } = req.user;
  const roles = ['SUPER_ADMIN_ROLE', 'ADMIN_ROLE']
  //if(role !== 'ADMIN_ROLE'){
  if(!roles.includes( role )){
    return res.status(401).json({
      message: `${name} no es administrador`
    })
  }
  next();
}

const isRootRole = ( req = request, res = response, next)=>{
  if(!req.user){
    return res.status(500).json({
      message: 'Se quiere verificar el rol sin validar el token primero'
    })
  }
  const { role , name } = req.user;
  const roles = ['SUPER_ADMIN_ROLE']
  if(!roles.includes( role )){
    return res.status(401).json({
      message: `${name} no es root`
    })
  }
  next();
}


const hasRole = ( ...roles ) =>{
  return (req = request, res = response, next)=>{
    if(!req.user){
      return res.status(500).json({
        message: 'Se quiere verificar el rol sin validar el token primero'
      })
    }

    if( !roles.includes( req.user.role) ){
      return res.status(401).json({
        message: `El servicio requiere uno de estos roles: ${ roles }`
      })
    }

    next()
  }
}




module.exports = {
  isRootRole,
  isAdminRole,
  hasRole,
}