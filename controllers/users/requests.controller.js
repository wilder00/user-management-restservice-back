
const { request, response } = require('express')
const { Op } = require('sequelize')

const User = require('../../models/user.model')

const getUserRequests = async ( req = request, res = response) =>{

  const { q, limit = 20, page = 1 } = req.query;
  let offset = limit * (page < 1? 0 : (page - 1));
  let where = { acceptedRequest: false }
  if(q){
    where = {
      ...where,
      [Op.or]:[
        { name:     { [ Op.iLike ] : `%${ q }%` } },
        { lastName: { [ Op.iLike ] : `%${ q }%` } },
        { email:    { [ Op.iLike ] : `%${ q }%` } },
      ]
    }
  }

  try {
    const dbResp = await Promise.all([
      User.findAll({ where , limit, offset}),
      User.count({ where })
    ])
    const [users , usersQuantity] = dbResp;
    res.json({
      currentPage: parseInt(page),
      pages: Math.ceil( usersQuantity / limit ),
      usersQuantity,
      users
    })  
  } catch (error) {
    res.status(400).json({
      message: "no se pudo obtener la lista de usuarios"
    })
  }
}

const postUserRequest = async ( req = request, res = response) => {
  const { userId } = req.params;
  try {

    const user = await User.update({acceptedRequest: true, isActive: true}, { where:{id: userId} })

    res.json({
      message: `Aceptaste al usuario correctamente.`,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `No se pudo aceptar al usuario.`,
    })
  }
}


module.exports = {
  getUserRequests,
  postUserRequest
}