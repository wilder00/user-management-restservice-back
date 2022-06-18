
const { request, response } = require('express')
const User = require('../../models/user.model')
const DeletedUser = require('../../models/deletedUser.model')

const getDeletedUsers = async ( req = request, res = response) =>{
  const { q, limit = 20, page = 1 } = req.query;
  let offset = limit * (page < 1? 0 : (page - 1));
  let where = {  }

  if(q){
    where = {
      ...where,
      [Op.or]:[
        { name:     { [ Op.like ] : `%${ q }%` } },
        { lastName: { [ Op.like ] : `%${ q }%` } },
        { email:    { [ Op.like ] : `%${ q }%` } },
      ]
    }
  }

  try {
    const dbResp = await Promise.all([
      DeletedUser.findAll({ 
        where , limit, offset, 
        include: [
          { model: User, required: true, source: 'id', foreignKey: 'userId', as: "deletedUser", attributes:['id', 'name','lastName']},
          { model: User, required: true, source: 'id', foreignKey: 'byUserId', as: "deletingUser"},
        ],
        attributes: ['id','asRole']
      }),
      DeletedUser.count({ where })
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


module.exports = {
  getDeletedUsers
}